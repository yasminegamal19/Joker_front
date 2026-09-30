import {
  Headphones,
  MapPinned,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import styles from "./WhyJoker.module.css";

const WhyJoker = () => {
  const features = [
    {
      icon: Zap,
      title: "سرعة واعتمادية",
      description:
        "اتصال مستقر يساعدك على الاستمتاع بالإنترنت بدون تعقيد.",
    },
    {
      icon: ShieldCheck,
      title: "خدمة آمنة",
      description:
        "بيانات حسابك ومعاملاتك تظل محمية أثناء استخدام خدماتنا.",
    },
    {
      icon: Headphones,
      title: "دعم متواصل",
      description:
        "فريق الدعم جاهز لمساعدتك ومتابعة طلبات الصيانة والخدمات.",
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
        "تابع رصيدك وباقتك وطلباتك من حساب واحد وبطريقة بسيطة.",
    },
  ];

  return (
    <section className={styles.why} id="why-joker">
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>ليه الجوكر؟</span>

          <h2>
            خدمة معمولة
            <span> علشانك</span>
          </h2>

          <p>
            بنوفر لك تجربة بسيطة ومتكاملة لإدارة الإنترنت والخدمات اليومية،
            من الشحن والتجديد لحد الصيانة والدعم.
          </p>

          <div className={styles.highlight}>
            <div className={styles.highlightIcon}>
              <Zap size={20} />
            </div>

            <div>
              <strong>كل حاجة في مكان واحد</strong>
              <span>
                حساب واحد تقدر من خلاله تتابع خدماتك وطلباتك بسهولة.
              </span>
            </div>
          </div>
        </div>

        <div className={styles.features}>
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className={styles.feature} key={feature.title}>
                <div className={styles.icon}>
                  <Icon size={20} />
                </div>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJoker;
