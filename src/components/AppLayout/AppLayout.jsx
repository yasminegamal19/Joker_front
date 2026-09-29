import {
  Bell,
  Home,
  LogOut,
  Menu,
  UserRound,
  Wallet,
  X,
  Tag,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./AppLayout.module.css";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "الرئيسية",
      path: "/customer/home",
      icon: Home,
    },
    {
      label: "محفظتي",
      path: "/customer/wallet",
      icon: Wallet,
    },
    {
      label: "العروض",
      path: "/customer/offers",
      icon: Tag,
    },
    {
      label: "الإشعارات",
      path: "/customer/notifications",
      icon: Bell,
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
            <img src="/src/assets/logo.png" alt="جوكر" />
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

              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="إغلاق القائمة"
              >
                <X size={20} />
              </button>
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
