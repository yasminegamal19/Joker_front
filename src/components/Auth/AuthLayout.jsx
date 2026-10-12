import { ArrowRight, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";
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
  const { theme, toggleTheme, isDark } = useTheme();

  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <main className={styles.authPage}>
      <section className={styles.brandSide}>
        <div className={styles.brandContent}>
          <div className={styles.brandLogo}>
            <img src={logoSrc} alt="الجوكر" />
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
          <img src={logoSrc} alt="الجوكر" />
        </div>

        <div className={styles.content}>
          <div className={styles.topBar}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate(backTo)}
              aria-label="العودة"
            >
              <ArrowRight size={18} />
              <span>العودة</span>
            </button>

            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
              title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {children}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
