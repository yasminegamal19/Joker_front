import {
  Headphones,
  MapPinned,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import styles from "./WhyJoker.module.css";

const features = [
  {
    icon: Zap,
    title: "سرعة واعتمادية",
    description:
      "اتصال مستقر وسرعات مناسبة تساعدك تستمتع بالإنترنت بدون تقطيع.",
  },
  {
    icon: ShieldCheck,
    title: "خدمة آمنة",
    description:
      "حسابك ومعاملاتك محمية، مع تجربة استخدام بسيطة وواضحة.",
  },
  {
    icon: Headphones,
    title: "دعم متواصل",
    description:
      "فريق الدعم جاهز لمساعدتك ومتابعة طلباتك ومشاكل الصيانة.",
  },
  {
    icon: MapPinned,
    title: "خدمة قريبة منك",
    description:
      "متاجر ومندوبي خدمة داخل نطاق التغطية لتسهيل وصول الخدمة إليك.",
  },
  {
    icon: Smartphone,
    title: "إدارة أسهل",
    description:
      "تابع رصيدك، باقتك، معاملاتك وطلباتك من حساب واحد.",
  },
];

const WhyJoker = () => {
  return (
    <section className={styles.why} id="why-joker">
      <div className={`container ${styles.container}`}>
        <div className={styles.visual}>
          <div className={styles.visualGlow} />

          <div className={styles.visualContent}>
            <span className={styles.visualEyebrow}>
              تجربة الجوكر
            </span>

            <h2>
              الإنترنت اللي
              <span> يمشي معاك.</span>
            </h2>

            <p>
              مش بس بنوصلك بالإنترنت، إحنا بنخلي إدارة خدمتك
              أسهل وأسرع من أول الاشتراك لحد الدعم والصيانة.
            </p>

            <div className={styles.visualStats}>
              <div>
                <strong>24/7</strong>
                <span>دعم ومتابعة</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>تجربة أسهل</span>
              </div>

              <div>
                <strong>1</strong>
                <span>حساب لكل خدماتك</span>
              </div>
            </div>
          </div>

          <div className={styles.signalCard}>
            <div className={styles.signalIcon}>
              <WifiIcon />
            </div>

            <div>
              <span>حالة الاتصال</span>

              <strong>
                <i />
                متصل ومستقر
              </strong>
            </div>
          </div>

          <div className={`${styles.decor} ${styles.decorOne}`} />
          <div className={`${styles.decor} ${styles.decorTwo}`} />
        </div>

        <div className={styles.content}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>ليه الجوكر؟</span>

            <h2>
              أكتر من مجرد
              <span> خدمة إنترنت</span>
            </h2>

            <p>
              صممنا تجربة الجوكر عشان تجمع كل احتياجاتك في مكان
              واحد، بداية من الباقة والشحن لحد الدعم والصيانة.
            </p>
          </div>

          <div className={styles.features}>
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  className={`${styles.feature} ${
                    index === features.length - 1
                      ? styles.featureWide
                      : ""
                  }`}
                  key={feature.title}
                >
                  <div className={styles.icon}>
                    <Icon size={20} strokeWidth={1.9} />
                  </div>

                  <div className={styles.featureContent}>
                    <div className={styles.featureTop}>
                      <h3>{feature.title}</h3>

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p>{feature.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const WifiIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 8.5C8.5 4 15.5 4 21 8.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M6.5 12C10.2 9.2 13.8 9.2 17.5 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M10 15.5C11.3 14.5 12.7 14.5 14 15.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <circle
      cx="12"
      cy="19"
      r="1.4"
      fill="currentColor"
    />
  </svg>
);

export default WhyJoker;

