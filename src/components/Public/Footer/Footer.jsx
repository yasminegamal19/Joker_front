import { Link, useNavigate } from "react-router-dom";
import { useAppConfig } from "../../../context/AppConfigContext";
import { useTheme } from "../../../context/ThemeContext";
import logoLight from "../../../assets/logo-light.png";
import logoDark from "../../../assets/logo-dark.png";
import styles from "./Footer.module.css";

const CONTENT_LABELS = {
  about_us: "من نحن",
  terms: "الشروط والأحكام",
  privacy_policy: "سياسة الخصوصية",
  contact_us: "تواصل معنا",
};

const Footer = () => {
  const navigate = useNavigate();
  const { config } = useAppConfig();
  const { isDark } = useTheme();

  const walletEnabled = config.feature_flags.wallet_enabled;
  const contentKeys = config.content_keys;

  const hasContent = (key) => contentKeys.includes(key);

  const scrollToSection = (id) => {
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src={logoSrc} alt="الجوكر" />
            </Link>

            <p>
              كل خدمات الإنترنت والاتصالات اللي تحتاجها، في مكان واحد وبطريقة
              أسهل.
            </p>

            <div className={styles.socials}>
              <a href="#facebook" aria-label="Facebook">
                f
              </a>

              <a href="#instagram" aria-label="Instagram">
                ◎
              </a>

              <a href="#whatsapp" aria-label="WhatsApp">
                ◉
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3>روابط مهمة</h3>

              <button type="button" onClick={() => scrollToSection("home")}>
                الرئيسية
              </button>

              <button type="button" onClick={() => scrollToSection("services")}>
                خدماتنا
              </button>

              <button type="button" onClick={() => scrollToSection("packages")}>
                الباقات والإنترنت
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("why-joker")}
              >
                ليه الجوكر؟
              </button>

              {hasContent("about_us") && (
                <button
                  type="button"
                  onClick={() => navigate("/content/about_us")}
                >
                  {CONTENT_LABELS.about_us}
                </button>
              )}
            </div>

            <div className={styles.linkGroup}>
              <h3>خدمات الجوكر</h3>

              {walletEnabled && (
                <button type="button" onClick={() => navigate("/choose-user")}>
                  شحن المحفظة
                </button>
              )}

              <button type="button" onClick={() => navigate("/choose-user")}>
                تجديد الباقة
              </button>

              <button type="button" onClick={() => navigate("/choose-user")}>
                طلب صيانة
              </button>

              <button type="button" onClick={() => scrollToSection("packages")}>
                باقات الإنترنت
              </button>
            </div>

            <div className={styles.linkGroup}>
              <h3>حسابك</h3>

              <button type="button" onClick={() => navigate("/choose-user")}>
                تسجيل الدخول
              </button>

              <button type="button" onClick={() => navigate("/choose-user")}>
                إنشاء حساب
              </button>

              {hasContent("contact_us") ? (
                <button
                  type="button"
                  onClick={() => navigate("/content/contact_us")}
                >
                  {CONTENT_LABELS.contact_us}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                >
                  تواصل معنا
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 الجوكر — جميع الحقوق محفوظة</span>

          <div className={styles.legal}>
            {hasContent("privacy_policy") && (
              <Link to="/content/privacy_policy">
                {CONTENT_LABELS.privacy_policy}
              </Link>
            )}

            {hasContent("terms") && (
              <Link to="/content/terms">{CONTENT_LABELS.terms}</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
