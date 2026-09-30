import { ArrowLeft, CheckCircle2, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero} id="home">
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <span className={styles.badge}>
            <Wifi size={16} />
            إنترنت أسرع.. حياة أسهل
          </span>

          <h1>
            كل خدمات الإنترنت
            <span> في مكان واحد</span>
          </h1>

          <p>
            مع الجوكر، استمتع بباقات الإنترنت، شحن الرصيد، الكروت والعروض
            وخدمات الصيانة بسهولة وسرعة.
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate("/choose-user")}
            >
              ابدأ الآن
              <ArrowLeft size={18} />
            </button>

            <a href="#packages" className={styles.secondaryButton}>
              استعرض الباقات
            </a>
          </div>

          <div className={styles.features}>
            <div>
              <CheckCircle2 size={18} />
              <span>خدمة موثوقة</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>دعم سريع</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>أسعار مناسبة</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualCard}>
            <div className={styles.visualHeader}>
              <span>حسابك مع الجوكر</span>
              <Wifi size={20} />
            </div>

            <div className={styles.balance}>
              <small>رصيد المحفظة</small>
              <strong>250.00 <span>جنيه</span></strong>
            </div>

            <div className={styles.package}>
              <div>
                <span>الباقة الحالية</span>
                <strong>Super 250</strong>
              </div>

              <div className={styles.packageSpeed}>
                <strong>30</strong>
                <span>Mbps</span>
              </div>
            </div>

            <div className={styles.progress}>
              <div className={styles.progressTop}>
                <span>استهلاك الباقة</span>
                <span>67%</span>
              </div>

              <div className={styles.progressBar}>
                <span />
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/choose-user")}
              className={styles.cardButton}
            >
              إدارة حسابك
              <ArrowLeft size={16} />
            </button>
          </div>

          <div className={styles.floatingCard}>
            <CheckCircle2 size={20} />
            <div>
              <strong>الخدمة تعمل</strong>
              <span>اتصال مستقر</span>
            </div>
          </div>

          <div className={styles.circle} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
