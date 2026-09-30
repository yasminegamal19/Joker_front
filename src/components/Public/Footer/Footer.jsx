import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src="/src/assets/logo.png" alt="الجوكر" />
            </Link>

            <p>
              خدمات الإنترنت والباقات والشحن والصيانة في مكان واحد.
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
            <div>
              <h3>روابط سريعة</h3>

              <button type="button" onClick={() => scrollToSection("#home")}>
                الرئيسية
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#services")}
              >
                خدماتنا
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#packages")}
              >
                الباقات
              </button>
            </div>

            <div>
              <h3>خدماتنا</h3>

              <button
                type="button"
                onClick={() => scrollToSection("#services")}
              >
                شحن المحفظة
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#services")}
              >
                تجديد الباقة
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("#services")}
              >
                طلب صيانة
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 الجوكر. جميع الحقوق محفوظة.</span>

          <div>
            <a href="#privacy">الخصوصية</a>
            <a href="#terms">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
