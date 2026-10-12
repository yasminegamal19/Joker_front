import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./CTA.module.css";

const CTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.ctaBox}>
          <div className={styles.textGroup}>
            <span className={styles.eyebrow}>ابدأ مع الجوكر</span>

            <h2>جاهز لتجربة إنترنت أسرع وأفضل؟</h2>

            <p>
              انضم الآن لشبكة الجوكر واستمتع بأقوى الباقات والخدمات الرقمية.
            </p>
          </div>

          <Link to="/choose-user" className={styles.ctaBtn}>
            <span>إنشاء حساب جديد</span>
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
