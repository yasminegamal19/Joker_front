import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Gift,
  Sparkles,
  Wifi,
} from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import styles from "./CustomerOffers.module.css";

const offers = [
  {
    id: 1,
    title: "عرض الشحن الإضافي",
    description: "اشحن محفظتك الآن واحصل على رصيد إضافي عند إتمام عملية الشحن.",
    badge: "عرض مميز",
    value: "+ 50 جنيه",
    condition: "عند شحن 300 جنيه أو أكثر",
    expires: "ينتهي خلال 5 أيام",
    icon: Gift,
    featured: true,
  },
  {
    id: 2,
    title: "باقة الإنترنت الشهرية",
    description: "استمتع بباقة إنترنت مناسبة لاستخدامك الشهري مع سرعة مستقرة.",
    badge: "باقة إنترنت",
    value: "250 GB",
    condition: "سرعة تصل إلى 30 Mbps",
    expires: "متاحة حاليًا",
    icon: Wifi,
  },
  {
    id: 3,
    title: "هدية التجديد",
    description: "جدد باقتك الحالية قبل موعد الانتهاء واحصل على ميزة إضافية.",
    badge: "لفترة محدودة",
    value: "مزايا إضافية",
    condition: "عند التجديد قبل الموعد",
    expires: "ينتهي خلال 8 أيام",
    icon: Sparkles,
  },
];

const CustomerOffers = () => {
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

          <section className={styles.featuredSection}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredDecorOne} />
              <div className={styles.featuredDecorTwo} />

              <div className={styles.featuredContent}>
                <span className={styles.featuredBadge}>
                  <Sparkles size={14} />
                  عرض حصري
                </span>

                <h2>اشحن محفظتك واحصل على رصيد إضافي</h2>

                <p>
                  استفد من العرض الحالي واحصل على رصيد إضافي عند شحن محفظتك
                  بالقيمة المطلوبة.
                </p>

                <div className={styles.featuredMeta}>
                  <div>
                    <strong>+50 جنيه</strong>
                    <span>رصيد إضافي</span>
                  </div>

                  <div>
                    <strong>300 جنيه</strong>
                    <span>الحد الأدنى للشحن</span>
                  </div>

                  <div>
                    <strong>5 أيام</strong>
                    <span>متبقية</span>
                  </div>
                </div>

                <button type="button" className={styles.featuredButton}>
                  الاستفادة من العرض
                  <ArrowLeft size={16} />
                </button>
              </div>

              <div className={styles.featuredIcon}>
                <Gift size={48} strokeWidth={1.5} />
              </div>
            </div>
          </section>

          <section className={styles.offersSection}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>لك خصيصًا</span>
                <h2>العروض المتاحة</h2>
              </div>

              <span className={styles.count}>{offers.length} عروض</span>
            </div>

            <div className={styles.offersGrid}>
              {offers.map((offer) => {
                const Icon = offer.icon;

                return (
                  <article
                    key={offer.id}
                    className={`${styles.offerCard} ${
                      offer.featured ? styles.offerFeatured : ""
                    }`}
                  >
                    <div className={styles.offerTop}>
                      <span className={styles.offerIcon}>
                        <Icon size={21} />
                      </span>

                      <span className={styles.offerBadge}>{offer.badge}</span>
                    </div>

                    <h3>{offer.title}</h3>

                    <p>{offer.description}</p>

                    <div className={styles.offerValue}>
                      <strong>{offer.value}</strong>
                      <span>{offer.condition}</span>
                    </div>

                    <div className={styles.offerFooter}>
                      <span>
                        <Clock3 size={14} />
                        {offer.expires}
                      </span>

                      <button type="button">
                        التفاصيل
                        <ArrowLeft size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

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
