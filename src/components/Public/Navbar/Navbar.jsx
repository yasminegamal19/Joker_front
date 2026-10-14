import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, UserRound, X } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import logoLight from "../../../assets/logo-light.png";
import logoDark from "../../../assets/logo-dark.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

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

  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/choose-user");
  };
  const handleJoin = () => {
    setMenuOpen(false);
    navigate("/join");
  };

  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => scrollToSection("home")}
          aria-label="الجوكر - الرئيسية"
        >
          <img src={logoSrc} alt="الجوكر" className={styles.logo} />
        </button>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
          <button
            type="button"
            className={styles.navLink}
            onClick={() => scrollToSection("home")}
          >
            الرئيسية
          </button>

          <button
            type="button"
            className={styles.navLink}
            onClick={() => scrollToSection("services")}
          >
            خدماتنا
          </button>

          <button
            type="button"
            className={styles.navLink}
            onClick={() => scrollToSection("packages")}
          >
            الباقات والإنترنت
          </button>

          <button
            type="button"
            className={styles.navLink}
            onClick={() => scrollToSection("why-joker")}
          >
            ليه الجوكر؟
          </button>

          <button
            type="button"
            className={styles.navLink}
            onClick={() => scrollToSection("contact")}
          >
            تواصل معنا
          </button>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
            title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
          >
            {isDark ? (
              <Sun size={19} className={styles.themeIcon} strokeWidth={2} />
            ) : (
              <Moon size={19} className={styles.themeIcon} strokeWidth={2} />
            )}
          </button>

          <button
            type="button"
            className={styles.loginBtn}
            onClick={handleLogin}
          >
            <UserRound size={17} strokeWidth={2} />
            <span>تسجيل الدخول</span>
          </button>

          <button
            type="button"
            className={styles.loginBtn}
            onClick={handleJoin}
          >
            <UserRound size={17} strokeWidth={2} />
            <span> أنضم لعملاء JOKER NET</span>
          </button>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
