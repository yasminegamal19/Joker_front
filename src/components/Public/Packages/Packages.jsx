import { Check, Gauge, Router, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Packages.module.css";

const Packages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Basic 100",
      speed: "20",
      quota: "100",
      price: "120",
      description: "مناسبة للاستخدام اليومي والتصفح.",
      features: [
        "سرعة تصل إلى 20 Mbps",
        "100 جيجابايت شهريًا",
        "دعم فني",
      ],
    },
    {
      name: "Super 250",
      speed: "30",
      quota: "250",
      price: "200",
      popular: true,
      description: "اختيار مناسب للعائلات والاستخدام المتعدد.",
      features: [
        "سرعة تصل إلى 30 Mbps",
        "250 جيجابايت شهريًا",
        "دعم فني سريع",
        "متابعة استهلاك الباقة",
      ],
    },
    {
      name: "Ultra 400",
      speed: "50",
      quota: "400",
      price: "300",
      description: "للاستخدام المكثف والبث والألعاب.",
      features: [
        "سرعة تصل إلى 50 Mbps",
        "400 جيجابايت شهريًا",
        "دعم فني سريع",
        "متابعة استهلاك الباقة",
      ],
    },
  ];

  return (
    <section className={styles.packages} id="packages">
      <div className={`container ${styles.container}`}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>باقات الإنترنت</span>

          <h2>
            اختار الباقة
            <span> المناسبة ليك</span>
          </h2>

          <p>
            باقات متنوعة بسرعات مختلفة لتناسب استخدامك اليومي واحتياجاتك.
          </p>
        </div>

        <div className={styles.grid}>
          {packages.map((item) => (
            <article
              key={item.name}
              className={`${styles.card} ${
                item.popular ? styles.popular : ""
              }`}
            >
              {item.popular && (
                <div className={styles.popularBadge}>الأكثر اختيارًا</div>
              )}

              <div className={styles.cardTop}>
                <div className={styles.packageIcon}>
                  <Wifi size={21} />
                </div>

                <h3>{item.name}</h3>

                <p>{item.description}</p>
              </div>

              <div className={styles.stats}>
                <div>
                  <span>السرعة</span>
                  <strong>
                    {item.speed} <small>Mbps</small>
                  </strong>
                </div>

                <div>
                  <span>السعة</span>
                  <strong>
                    {item.quota} <small>GB</small>
                  </strong>
                </div>
              </div>

              <div className={styles.price}>
                <strong>{item.price}</strong>
                <span>جنيه / شهر</span>
              </div>

              <div className={styles.features}>
                {item.features.map((feature) => (
                  <div key={feature}>
                    <Check size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={
                  item.popular
                    ? styles.primaryButton
                    : styles.outlineButton
                }
                onClick={() => navigate("/choose-user")}
              >
                اشترك الآن
                <span>←</span>
              </button>
            </article>
          ))}
        </div>

        <div className={styles.bottomNote}>
          <div className={styles.noteIcon}>
            <Gauge size={19} />
          </div>

          <div>
            <strong>مش متأكد تختار أنهي باقة؟</strong>
            <p>
              تقدر تبدأ بالباقة المناسبة لاستخدامك وتتابع استهلاكك من حسابك.
            </p>
          </div>

          <Router size={20} className={styles.routerIcon} />
        </div>
      </div>
    </section>
  );
};

export default Packages;

