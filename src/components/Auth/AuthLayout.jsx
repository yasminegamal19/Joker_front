import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthLayout.module.css";

const AuthLayout = ({
  children,
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  backTo = "/choose-user",
}) => {
  const navigate = useNavigate();

  return (
    <main className={styles.authPage}>
      <section className={styles.brandSide}>
        <div className={styles.brandContent}>
          <div className={styles.brandLogo}>
            <img src="/src/assets/logo.png" alt="جوكر" />
          </div>

          {badge && (
            <span className={styles.brandBadge}>
              {BadgeIcon && <BadgeIcon size={16} />}
              {badge}
            </span>
          )}

          <h1>{title}</h1>

          <p>{description}</p>
        </div>

        <div className={styles.circleOne} />
        <div className={styles.circleTwo} />
      </section>

      <section className={styles.formSide}>
        <div className={styles.mobileLogo}>
          <img src="/src/assets/logo.png" alt="جوكر" />
        </div>

        <div className={styles.content}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(backTo)}
          >
            <ArrowRight size={18} />
            العودة
          </button>

          {children}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
