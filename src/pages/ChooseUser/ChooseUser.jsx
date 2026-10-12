import { useNavigate } from "react-router-dom";
import { Store, UserRound, ArrowLeft, Sparkles, Moon, Sun, Home } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

import styles from "./ChooseUser.module.css";

const ChooseUser = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();

  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <main className={styles.page}>
      {/* Top Bar for Navigation & Theme Toggle */}
      <div className={styles.topActions}>
        <button
          type="button"
          onClick={() => navigate("/")}
          className={styles.topActionBtn}
          title="العودة للرئيسية"
          aria-label="العودة للرئيسية"
        >
          <Home size={18} />
          <span>الرئيسية</span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className={styles.topActionBtn}
          title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
          aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* عناصر الخلفية البصرية */}
      <div className={styles.bgGlow1}></div>
      <div className={styles.bgGlow2}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>منصة الجوكر الرقمية</span>
          </div>

          <div className={styles.logoWrapper}>
            <img
              src={logoSrc}
              alt="الجوكر"
              className={styles.logo}
            />
          </div>

          <h1>أهلاً بك في الجوكر</h1>
          <p>اختر نوع الحساب للمتابعة والوصول إلى خدماتك</p>
        </div>

        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={() => navigate("/customer/login")}
          >
            <div className={styles.iconWrapper}>
              <UserRound size={26} strokeWidth={2} />
            </div>

            <div className={styles.optionContent}>
              <div className={styles.optionHeader}>
                <strong>حساب عميل</strong>
                <span className={styles.tag}>أفراد</span>
              </div>
              <small>
                لإدارة اشتراكك، شحن المحفظة ومتابعة استهلاك الإنترنت
              </small>
            </div>

            <div className={styles.arrowIcon}>
              <ArrowLeft size={20} />
            </div>
          </button>

          <button
            className={styles.option}
            onClick={() => navigate("/merchant/login")}
          >
            <div className={styles.iconWrapper}>
              <Store size={26} strokeWidth={2} />
            </div>

            <div className={styles.optionContent}>
              <div className={styles.optionHeader}>
                <strong>حساب تاجر</strong>
                <span className={styles.tagMerchant}>أعمال</span>
              </div>
              <small>إدارة كروت الإنترنت، المبيعات والشحن للجملة</small>
            </div>

            <div className={styles.arrowIcon}>
              <ArrowLeft size={20} />
            </div>
          </button>
        </div>

        <div className={styles.footerInfo}>
          <span>جميع الحقوق محفوظة © شبكة الجوكر</span>
        </div>
      </div>
    </main>
  );
};

export default ChooseUser;
