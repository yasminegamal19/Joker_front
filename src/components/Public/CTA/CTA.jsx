import { ArrowLeft, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./CTA.module.css";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.cta}>
      <div className={`container ${styles.container}`}>
        <div className={styles.icon}>
          <Wifi size={24} />
        </div>

        <div className={styles.content}>
          <h2>جاهز تبدأ مع الجوكر؟</h2>
          <p>
            سجل حسابك واستمتع بإدارة باقتك وخدماتك بسهولة من مكان واحد.
          </p>
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={() => navigate("/choose-user")}
        >
          ابدأ الآن
          <ArrowLeft size={18} />
        </button>
      </div>
    </section>
  );
};

export default CTA;
