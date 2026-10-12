import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Gift,
  Sparkles,
} from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import { getOffers } from "../../../services/offerService";
import styles from "./CustomerOffers.module.css";

const DAY_MS = 24 * 60 * 60 * 1000;

// "349.00" -> "349"
const formatPrice = (price) => {
  const n = Number(price);
  if (Number.isNaN(n)) return String(price);
  return Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2);
};

// عدد الأيام المتبقية: null = مفتوح، سالب = انتهى
const daysLeft = (endsAt) => {
  if (!endsAt) return null;
  const end = new Date(endsAt).getTime();
  if (Number.isNaN(end)) return null;
  return Math.ceil((end - Date.now()) / DAY_MS);
};

const expiresLabel = (days) => {
  if (days === null) return "متاح حاليًا";
  if (days <= 0) return "ينتهي اليوم";
  if (days === 1) return "ينتهي غدًا";
  return `ينتهي خلال ${days} يوم`;
};

// تحويل شكل الـ API إلى شكل الصفحة
const mapOffer = (o) => {
  const days = daysLeft(o.ends_at);
  const pkg = o.package || null;
  const hasQuota = pkg && pkg.quota_gb !== null && pkg.quota_gb !== undefined;

  return {
    id: o.id,
    title: o.title,
    description: o.description || "",
    badge: o.badge || "عرض",
    imageUrl: o.image_url || null,
    packageId: o.package_id ?? pkg?.id ?? null,
    packageName: pkg?.name || "",
    price: pkg ? formatPrice(pkg.price) : null,
    quota: hasQuota ? String(pkg.quota_gb) : null,
    days,
    expires: expiresLabel(days),
    // لو الـ API بعت end date قديم نعتبره منتهي
    expired: days !== null && Date.now() > new Date(o.ends_at).getTime(),
  };
};

const CustomerOffers = () => {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    getOffers(controller.signal)
      .then((data) => {
        const list = Array.isArray(data?.offers) ? data.offers : [];
        setOffers(list.map(mapOffer).filter((o) => !o.expired));
      })
      .catch((err) => {
        if (controller.signal.aborted) return;

        if (err?.response?.status === 401) {
          navigate("/customer/login", { replace: true });
          return;
        }

        setError("تعذر تحميل العروض.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [attempt, navigate]);

  // أول عرض هو العرض المميز، والباقي في الشبكة
  const [featured, ...others] = useMemo(() => offers, [offers]);

  const handleUseOffer = (offer) => {
    // TODO: اربطه بـ endpoint الاشتراك في العرض لما الباك اند يجهزه
    console.log("use offer", offer.id, "package", offer.packageId);
  };

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>العروض والمزايا</span>
              <h1>العروض</h1>
              <p>اكتشف أحدث عروض جوكر واستفد من المزايا المتاحة لحسابك.</p>
            </div>
          </header>

          {loading && <div className={styles.state}>جاري تحميل العروض...</div>}

          {!loading && error && (
            <div className={styles.state}>
              <p>{error}</p>
              <button
                type="button"
                className={styles.retryButton}
                onClick={() => setAttempt((n) => n + 1)}
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading && !error && offers.length === 0 && (
            <div className={styles.state}>لا توجد عروض متاحة حاليًا.</div>
          )}

          {!loading && !error && featured && (
            <section className={styles.featuredSection}>
              <div className={styles.featuredCard}>
                {featured.imageUrl && (
                  <>
                    <img
                      src={featured.imageUrl}
                      alt={featured.title}
                      className={styles.featuredImage}
                    />
                    <div className={styles.featuredImageOverlay} />
                  </>
                )}

                <div className={styles.featuredDecorOne} />
                <div className={styles.featuredDecorTwo} />

                <div className={styles.featuredContent}>
                  <span className={styles.featuredBadge}>
                    <Sparkles size={14} />
                    {featured.badge}
                  </span>

                  <h2>{featured.title}</h2>

                  {featured.description && <p>{featured.description}</p>}

                  <div className={styles.featuredMeta}>
                    {featured.price && (
                      <div>
                        <strong>{featured.price} جنيه</strong>
                        <span>{featured.packageName || "سعر الباقة"}</span>
                      </div>
                    )}

                    {featured.quota && (
                      <div>
                        <strong>{featured.quota} GB</strong>
                        <span>سعة الباقة</span>
                      </div>
                    )}

                    <div>
                      <strong>
                        {featured.days === null
                          ? "مفتوح"
                          : `${Math.max(featured.days, 0)} يوم`}
                      </strong>
                      <span>
                        {featured.days === null ? "بدون موعد انتهاء" : "متبقية"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.featuredButton}
                    onClick={() => handleUseOffer(featured)}
                  >
                    الاستفادة من العرض
                    <ArrowLeft size={16} />
                  </button>
                </div>

                {!featured.imageUrl && (
                  <div className={styles.featuredIcon}>
                    <Gift size={48} strokeWidth={1.5} />
                  </div>
                )}
              </div>
            </section>
          )}

          {!loading && !error && others.length > 0 && (
            <section className={styles.offersSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.sectionEyebrow}>لك خصيصًا</span>
                  <h2>العروض المتاحة</h2>
                </div>

                <span className={styles.count}>{others.length} عروض</span>
              </div>

              <div className={styles.offersGrid}>
                {others.map((offer) => (
                  <article key={offer.id} className={styles.offerCard}>
                    {offer.imageUrl && (
                      <img
                        src={offer.imageUrl}
                        alt={offer.title}
                        className={styles.offerImage}
                      />
                    )}

                    <div className={styles.offerTop}>
                      <span className={styles.offerIcon}>
                        <Gift size={21} />
                      </span>

                      <span className={styles.offerBadge}>{offer.badge}</span>
                    </div>

                    <h3>{offer.title}</h3>

                    {offer.description && <p>{offer.description}</p>}

                    {offer.price && (
                      <div className={styles.offerValue}>
                        <strong>
                          {offer.quota
                            ? `${offer.quota} GB`
                            : `${offer.price} جنيه`}
                        </strong>
                        <span>
                          {offer.packageName}
                          {offer.quota && ` — ${offer.price} جنيه`}
                        </span>
                      </div>
                    )}

                    <div className={styles.offerFooter}>
                      <span>
                        <Clock3 size={14} />
                        {offer.expires}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleUseOffer(offer)}
                      >
                        التفاصيل
                        <ArrowLeft size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Check size={19} />
            </div>

            <div>
              <strong>العروض تتحدث باستمرار</strong>
              <p>
                تابع هذه الصفحة باستمرار لمعرفة أحدث العروض والمزايا المتاحة
                لحسابك.
              </p>
            </div>

            <CalendarDays className={styles.infoCalendar} size={22} />
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerOffers;
