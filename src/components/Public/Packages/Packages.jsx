// src/components/Public/Packages/Packages.jsx
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, Gauge, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPackages } from "../../../services/packageService";
import styles from "./Packages.module.css";

const INITIAL_VISIBLE = 6;


const kbpsToMbps = (kbps) => {
  const mbps = Math.round((Number(kbps) / 1024) * 10) / 10;
  return Number.isInteger(mbps) ? String(mbps) : mbps.toFixed(1);
};

const parsePrice = (price) => {
  const n = Number(price);
  return Number.isNaN(n) ? 0 : n;
};

// "199.00" -> "199" ، "199.50" -> "199.50"
const formatPrice = (n) =>
  Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2);

const durationLabel = (days) => (days === 30 ? "شهريًا" : `/ ${days} يوم`);

// تحويل شكل الـ API إلى شكل الكارت
const mapPackage = (p) => {
  const price = parsePrice(p.price);
  const hasQuota = p.quota_gb !== null && p.quota_gb !== undefined;
  const download = kbpsToMbps(p.download_speed_kbps);
  const browsing = kbpsToMbps(p.browsing_speed_kbps);

  const features = [
    `سرعة تحميل تصل إلى ${download} Mbps`,
    `سرعة تصفح ${browsing} Mbps`,
  ];

  if (hasQuota) {
    features.push(`${p.quota_gb} جيجابايت لمدة ${p.duration_days} يوم`);
  } else {
    features.push(`مدة الاشتراك ${p.duration_days} يوم`);
  }

  return {
    id: p.id,
    name: p.name,
    description: p.description || "",
    downloadSpeed: download,
    quota: hasQuota ? String(p.quota_gb) : null,
    days: p.duration_days,
    priceValue: price,
    price: formatPrice(price),
    // الـ API مفيهوش حقل "الأكثر اختيارًا"؛ لو الباك اند ضافه بالاسم ده هيشتغل
    popular: Boolean(p.is_popular ?? p.popular),
    features,
  };
};


const Packages = () => {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    const load = async () => {
      try {
        const data = await getPackages(controller.signal);
        const list = Array.isArray(data) ? data : data.packages;

        setPackages(Array.isArray(list) ? list.map(mapPackage) : []);
      } catch (err) {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [attempt]);

  // ترتيب من الأرخص للأغلى
  const sorted = useMemo(
    () => [...packages].sort((a, b) => a.priceValue - b.priceValue),
    [packages],
  );

  const visible = showAll ? sorted : sorted.slice(0, INITIAL_VISIBLE);

  const handleSubscribe = (packageId) => {
    navigate("/choose-user", { state: { packageId } });
  };

  return (
    <section className={styles.packages} id="packages">
      <div className={`container ${styles.container}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>باقات الإنترنت</span>

            <h2>
              اختار الباقة
              <span> المناسبة ليك</span>
            </h2>
          </div>

          <div className={styles.headerSide}>
            <p>
              باقات مختلفة بسرعات وسعات متنوعة، عشان تختار اللي يناسب استخدامك
              من غير ما تدفع أكتر من احتياجك.
            </p>

            <div className={styles.headerMeta}>
              <span className={styles.metaDot} />
              <span>باقات شهرية مرنة</span>
            </div>
          </div>
        </div>

        {loading && <div className={styles.state}>جاري تحميل الباقات...</div>}

        {!loading && error && (
          <div className={styles.state}>
            <p>حصل خطأ أثناء تحميل الباقات.</p>
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => setAttempt((n) => n + 1)}
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {!loading && !error && packages.length === 0 && (
          <div className={styles.state}>مفيش باقات متاحة حاليًا.</div>
        )}

        {!loading && !error && packages.length > 0 && (
          <>
            <div className={styles.grid} data-count={visible.length}>
              {visible.map((item) => (
                <article
                  key={item.id}
                  className={`${styles.card} ${
                    item.popular ? styles.popular : ""
                  }`}
                >
                  {item.popular && (
                    <div className={styles.popularBadge}>
                      <span />
                      الأكثر اختيارًا
                    </div>
                  )}

                  <div className={styles.cardHeader}>
                    <div className={styles.iconRow}>
                      <div className={styles.packageIcon}>
                        <Wifi size={21} strokeWidth={2} />
                      </div>

                      <span className={styles.packageLabel}>
                        {item.days} يوم
                      </span>
                    </div>

                    <h3>{item.name}</h3>

                    {item.description && <p>{item.description}</p>}
                  </div>

                  <div className={styles.packageStats}>
                    <div className={styles.stat}>
                      <span>سرعة التحميل</span>

                      <strong>
                        {item.downloadSpeed}
                        <small> Mbps</small>
                      </strong>
                    </div>

                    <div className={styles.stat}>
                      <span>السعة</span>

                      <strong>
                        {item.quota ?? "—"}
                        {item.quota && <small> GB</small>}
                      </strong>
                    </div>
                  </div>

                  <div className={styles.priceRow}>
                    <div className={styles.price}>
                      {item.priceValue === 0 ? (
                        <strong>مجانًا</strong>
                      ) : (
                        <>
                          <strong>{item.price}</strong>
                          <span>جنيه</span>
                        </>
                      )}
                    </div>

                    <span className={styles.pricePeriod}>
                      {durationLabel(item.days)}
                    </span>
                  </div>

                  <div className={styles.divider} />

                  <div className={styles.features}>
                    {item.features.map((feature) => (
                      <div key={feature} className={styles.feature}>
                        <span className={styles.check}>
                          <Check size={13} strokeWidth={2.5} />
                        </span>

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={
                      item.popular ? styles.primaryButton : styles.outlineButton
                    }
                    onClick={() => handleSubscribe(item.id)}
                  >
                    <span>اشترك الآن</span>
                    <ArrowLeft size={17} />
                  </button>
                </article>
              ))}
            </div>

            {sorted.length > INITIAL_VISIBLE && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 22,
                }}
              >
                <button
                  type="button"
                  className={styles.retryButton}
                  onClick={() => setShowAll((v) => !v)}
                >
                  {showAll ? "عرض أقل" : `عرض كل الباقات (${sorted.length})`}
                </button>
              </div>
            )}
          </>
        )}

        <div className={styles.bottomNote}>
          <div className={styles.noteIcon}>
            <Gauge size={19} />
          </div>

          <div className={styles.noteContent}>
            <strong>مش متأكد تختار أنهي باقة؟</strong>
            <p>ابدأ بالباقة الأقرب لاستخدامك وتابع استهلاكك من حسابك بسهولة.</p>
          </div>

          <button
            type="button"
            className={styles.noteAction}
            onClick={() => navigate("/choose-user")}
          >
            ابدأ الآن
            <ArrowLeft size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Packages;
