import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Gift,
  Home,
  LayoutGrid,
  LogOut,
  Moon,
  Package,
  PanelRightClose,
  PanelRightOpen,
  Sun,
  UserRound,
  Wallet,
  Wrench,
  X,
  Gauge,
  Layers,
} from "lucide-react";

import { useFeature } from "../../hooks/useFeature";
import { useTheme } from "../../context/ThemeContext";
import { clearToken } from "../../lib/auth";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";
import styles from "./AppLayout.module.css";

const COLLAPSE_KEY = "joker_sidebar_collapsed";

/* ------------------------------------------------------------------
   خريطة التنقل — مصدر واحد للـ Sidebar والـ Tab bar وقائمة "المزيد".
   flag: اسم الـ feature flag اللي جاي من السيرفر (لو مقفول القسم بيختفي).
   tab:  يظهر في شريط الموبايل السفلي.
------------------------------------------------------------------ */
const NAV_GROUPS = [
  {
    id: "main",
    items: [
      { label: "الرئيسية", path: "/customer/home", icon: Home, tab: true },
    ],
  },
  {
    id: "services",
    title: "خدماتي",
    items: [
      {
        label: "باقتي",
        path: "/customer/package",
        icon: Package,
        end: true,
        tab: true,
      },
      { label: "الباقات", path: "/customer/packages", icon: Layers },
      {
        label: "الباقات الإضافية",
        path: "/customer/additional-packages",
        icon: Gauge,
      },
    
      {
        label: "المحفظة",
        path: "/customer/wallet",
        icon: Wallet,
        flag: "wallet_enabled",
        tab: true,
      },
      { label: "العروض", path: "/customer/offers", icon: Gift },
      {
        label: "الصيانة",
        path: "/customer/maintenance",
        icon: Wrench,
        tab: true,
      },
    ],
  },
  {
    id: "account",
    title: "حسابي",
    items: [
      {
        label: "الإشعارات",
        path: "/customer/notifications",
        icon: Bell,
        dot: true,
      },
      { label: "الملف الشخصي", path: "/customer/profile", icon: UserRound },
    ],
  },
];

const readCollapsed = () => {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === "1";
  } catch {
    return false;
  }
};

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme, isDark } = useTheme();
  const isEnabled = useFeature();

  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [moreOpen, setMoreOpen] = useState(false);

  const groups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => isEnabled(item.flag)),
  })).filter((group) => group.items.length > 0);

  const allItems = groups.flatMap((group) => group.items);
  const tabItems = allItems.filter((item) => item.tab);
  const moreItems = allItems.filter((item) => !item.tab);

  // تقفل قائمة "المزيد" مع أي تنقل، وتقفل بزر Esc
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!moreOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMoreOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const handleLogout = () => {
    clearToken();
    navigate("/customer/login", { replace: true });
  };

  const moreActive = moreItems.some((item) =>
    location.pathname.startsWith(item.path),
  );

  const themeLabel = isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن";

  return (
    <div
      className={`${styles.shell} ${collapsed ? styles.collapsed : ""}`}
    >
      {/* =====================  Sidebar (desktop)  ===================== */}
      <aside className={styles.sidebar} aria-label="القائمة الرئيسية">
        <div className={styles.brand}>
          <button
            type="button"
            className={styles.brandLogo}
            onClick={() => navigate("/customer/home")}
            aria-label="الرئيسية"
          >
            <img src={logoDark} alt="" />
          </button>

          <div className={styles.brandText}>
            <strong>الجوكر</strong>
            <span>بوابة العميل</span>
          </div>
        </div>

        <nav className={styles.sideNav}>
          {groups.map((group) => (
            <div className={styles.group} key={group.id}>
              {group.title && (
                <span className={styles.groupTitle}>{group.title}</span>
              )}

              {group.items.map(({ label, path, icon: Icon, end, dot }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  title={collapsed ? label : undefined}
                  className={({ isActive }) =>
                    `${styles.sideLink} ${isActive ? styles.sideActive : ""}`
                  }
                >
                  <span className={styles.sideIcon}>
                    <Icon size={19} />
                    {dot && <span className={styles.dot} />}
                  </span>
                  <span className={styles.sideLabel}>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.sideFooter}>
          <button
            type="button"
            className={styles.sideAction}
            onClick={handleLogout}
            title={collapsed ? "تسجيل الخروج" : undefined}
          >
            <span className={styles.sideIcon}>
              <LogOut size={19} />
            </span>
            <span className={styles.sideLabel}>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* =====================  Body  ===================== */}
      <div className={styles.body}>
        <header className={styles.topbar}>
          <div className={styles.topStart}>
            <button
              type="button"
              className={styles.collapseButton}
              onClick={toggleCollapsed}
              aria-label={collapsed ? "توسيع القائمة" : "تصغير القائمة"}
              aria-pressed={collapsed}
            >
              {collapsed ? (
                <PanelRightOpen size={20} />
              ) : (
                <PanelRightClose size={20} />
              )}
            </button>

            <button
              type="button"
              className={styles.mobileLogo}
              onClick={() => navigate("/customer/home")}
              aria-label="الرئيسية"
            >
              <img src={isDark ? logoDark : logoLight} alt="" />
              <span>الجوكر</span>
            </button>
          </div>

          <div className={styles.topActions}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
            >
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              type="button"
              className={styles.iconButton}
              onClick={() => navigate("/customer/notifications")}
              aria-label="الإشعارات"
            >
              <Bell size={20} />
              <span className={styles.dot} />
            </button>

            <button
              type="button"
              className={styles.profileChip}
              onClick={() => navigate("/customer/profile")}
            >
              <span className={styles.avatar}>
                <UserRound size={18} />
              </span>
              <span className={styles.profileText}>
                <strong>حسابي</strong>
                <small>العميل</small>
              </span>
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>{children}</div>
        </main>
      </div>

      {/* =====================  Tab bar (mobile)  ===================== */}
      <nav className={styles.tabBar} aria-label="التنقل السريع">
        {tabItems.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `${styles.tab} ${isActive ? styles.tabActive : ""}`
            }
          >
            <Icon size={21} />
            <span>{label}</span>
          </NavLink>
        ))}

        <button
          type="button"
          className={`${styles.tab} ${moreActive || moreOpen ? styles.tabActive : ""}`}
          onClick={() => setMoreOpen((prev) => !prev)}
          aria-expanded={moreOpen}
          aria-haspopup="dialog"
        >
          <LayoutGrid size={21} />
          <span>المزيد</span>
        </button>
      </nav>

      {moreOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setMoreOpen(false)}
            aria-hidden="true"
          />

          <div
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="المزيد"
          >
            <div className={styles.sheetHandle} />

            <div className={styles.sheetHeader}>
              <strong>المزيد</strong>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setMoreOpen(false)}
                aria-label="إغلاق"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.sheetGrid}>
              {moreItems.map(({ label, path, icon: Icon, dot }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `${styles.sheetItem} ${isActive ? styles.sheetActive : ""}`
                  }
                >
                  <span className={styles.sheetIcon}>
                    <Icon size={21} />
                    {dot && <span className={styles.dot} />}
                  </span>
                  <span>{label}</span>
                </NavLink>
              ))}

              <button
                type="button"
                className={styles.sheetItem}
                onClick={toggleTheme}
              >
                <span className={styles.sheetIcon}>
                  {isDark ? <Sun size={21} /> : <Moon size={21} />}
                </span>
                <span>{isDark ? "الوضع الفاتح" : "الوضع الداكن"}</span>
              </button>
            </div>

            <button
              type="button"
              className={styles.sheetLogout}
              onClick={handleLogout}
            >
              <LogOut size={18} />
              تسجيل الخروج
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppLayout;
