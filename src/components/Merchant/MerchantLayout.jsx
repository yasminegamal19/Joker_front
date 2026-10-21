import { useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  // ShoppingBag,
  UserRound,
  Wallet,
  Wifi,
  X,
  MessageCircle,
} from "lucide-react";

import styles from "./MerchantLayout.module.css";

const navigation = [
  {
    label: "الرئيسية",
    path: "/merchant/home",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "البطاقات",
    path: "/merchant/cards",
    icon: CreditCard,
  },
  {
    label: "الباقات",
    path: "/merchant/packages",
    icon: Package,
  },
  {
    label: "المحفظة",
    path: "/merchant/wallet",
    icon: Wallet,
  },
  // {
  //   label: "العمليات",
  //   path: "/merchant/transactions",
  //   icon: ShoppingBag,
  // },
  {
    label: "الإشعارات",
    path: "/merchant/notifications",
    icon: Bell,
  },
  {
    label: "الشات والدعم",
    path: "/merchant/chat",
    icon: MessageCircle,
  },
  {
    label: "حسابي",
    path: "/merchant/profile",
    icon: UserRound,
  },
];

const pageTitles = {
  "/merchant/home": "الرئيسية",
  "/merchant/cards": "إدارة البطاقات",
  "/merchant/packages": "الباقات",
  "/merchant/wallet": "المحفظة",
  "/merchant/transactions": "العمليات",
  "/merchant/profile": "حسابي",
};

export default function MerchantLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const pageTitle =
    pageTitles[location.pathname] || "بوابة التاجر";

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    navigate("/merchant/login");
  };

  return (
    <div className={styles.layout} dir="rtl">
      {menuOpen && (
        <button
          type="button"
          className={styles.overlay}
          onClick={closeMenu}
          aria-label="إغلاق القائمة الجانبية"
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          menuOpen ? styles.sidebarOpen : ""
        }`}
        aria-label="القائمة الرئيسية للتاجر"
      >
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Wifi size={24} strokeWidth={2.3} />
          </div>

          <div className={styles.brandText}>
            <strong>الجوكر</strong>
            <span>Merchant Portal</span>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.accountCard}>
          <div className={styles.avatar}>م</div>

          <div className={styles.accountInfo}>
            <strong>محمد محمود</strong>
            <span>
              <i />
              حساب التاجر
            </span>
          </div>

          <ChevronLeft
            size={17}
            className={styles.accountArrow}
          />
        </div>

        <div className={styles.navSection}>
          <span className={styles.navCaption}>
            القائمة الرئيسية
          </span>

          <nav className={styles.navigation}>
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${styles.navItem} ${
                      isActive ? styles.navItemActive : ""
                    }`
                  }
                >
                  <span className={styles.navIcon}>
                    <Icon size={19} strokeWidth={1.9} />
                  </span>

                  <span className={styles.navLabel}>
                    {item.label}
                  </span>

                  <ChevronLeft
                    size={15}
                    className={styles.navArrow}
                  />
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.helpCard}>
            <span className={styles.helpIcon}>
              <CircleHelp size={20} />
            </span>

            <strong>محتاج مساعدة؟</strong>

            <p>
              فريق دعم الجوكر جاهز لمساعدتك.
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.href = "mailto:support@example.com"
              }
              className={styles.helpButton}
            >
              تواصل مع الدعم
            </button>
          </div>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarStart}>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMenuOpen(true)}
              aria-label="فتح القائمة الجانبية"
            >
              <Menu size={22} />
            </button>

            <div className={styles.breadcrumb}>
              <span>بوابة التاجر</span>
              <div>
                <i />
                <h1>{pageTitle}</h1>
              </div>
            </div>
          </div>

          <div className={styles.topbarActions}>
            <button
              type="button"
              className={styles.notificationButton}
              aria-label="الإشعارات"
              title="الإشعارات"
            >
              <Bell size={19} />
              <span />
            </button>

            <div className={styles.profileSummary}>
              <div className={styles.profileAvatar}>م</div>

              <div>
                <strong>محمد محمود</strong>
                <span>حساب التاجر</span>
              </div>
            </div>
          </div>
        </header>

        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
