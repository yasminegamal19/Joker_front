import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  LogOut,
  Menu,
  Moon,
  Package,
  Sun,
  UserRound,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";
import styles from "./AppLayout.module.css";

const AppLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();

  const logoSrc = isDark ? logoDark : logoLight;

  const navItems = [
    {
      label: "الرئيسية",
      path: "/customer/home",
      icon: Home,
    },
    {
      label: "باقتي",
      path: "/customer/package",
      icon: Package,
    },
    {
      label: "المحفظة",
      path: "/customer/wallet",
      icon: Wallet,
    },
    {
      label: "الصيانة",
      path: "/customer/maintenance",
      icon: Wrench,
    },
    {
      label: "البروفايل",
      path: "/customer/profile",
      icon: UserRound,
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <button
            type="button"
            className={styles.logo}
            onClick={() => handleNavigate("/customer/home")}
            aria-label="جوكر"
          >
            <img src={logoSrc} alt="جوكر" />
          </button>

          <nav className={styles.desktopNav}>
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
              title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
            >
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              type="button"
              className={styles.notificationButton}
              onClick={() => handleNavigate("/customer/notifications")}
              aria-label="الإشعارات"
            >
              <Bell size={20} />
              <span className={styles.notificationDot} />
            </button>

            <button
              type="button"
              className={styles.profileButton}
              onClick={() => handleNavigate("/customer/profile")}
            >
              <span className={styles.avatar}>
                <UserRound size={18} />
              </span>

              <span className={styles.profileText}>
                <strong>حسابي</strong>
                <small>العميل</small>
              </span>
            </button>

            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileUser}>
                <span className={styles.mobileAvatar}>
                  <UserRound size={19} />
                </span>

                <div>
                  <strong>مرحباً بك</strong>
                  <span>حساب العميل</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  type="button"
                  className={styles.themeToggle}
                  onClick={toggleTheme}
                  aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
                  title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="إغلاق القائمة"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <nav className={styles.mobileNav}>
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `${styles.mobileNavLink} ${
                        isActive ? styles.mobileActive : ""
                      }`
                    }
                  >
                    <span className={styles.mobileNavIcon}>
                      <Icon size={19} />
                    </span>

                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className={styles.mobileMenuFooter}>
              <button
                type="button"
                className={styles.logoutButton}
                onClick={() => handleNavigate("/customer/login")}
              >
                <LogOut size={18} />
                تسجيل الخروج
              </button>
            </div>
          </aside>
        </>
      )}

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AppLayout;
