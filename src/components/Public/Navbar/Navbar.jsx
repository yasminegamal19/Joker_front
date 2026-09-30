import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleServiceClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <img src="/src/assets/logo.png" alt="الجوكر" />
        </Link>

        <nav className={styles.desktopNav}>
          <a href="#home">الرئيسية</a>
          <a href="#services">خدماتنا</a>
          <a href="#packages">الباقات</a>
          <a href="#why-joker">لماذا الجوكر؟</a>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.loginButton}
            onClick={() => navigate("/choose-user")}
          >
            تسجيل الدخول
          </button>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              الرئيسية
            </a>

            <a href="#services" onClick={() => setMenuOpen(false)}>
              خدماتنا
            </a>

            <a href="#packages" onClick={() => setMenuOpen(false)}>
              الباقات
            </a>

            <a href="#why-joker" onClick={() => setMenuOpen(false)}>
              لماذا الجوكر؟
            </a>
          </nav>

          <button
            type="button"
            className={styles.mobileLogin}
            onClick={() => handleServiceClick("/choose-user")}
          >
            تسجيل الدخول
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
