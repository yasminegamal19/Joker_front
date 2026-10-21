import { useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  CircleAlert,
  CreditCard,
  Package,
  Settings2,
  ShieldCheck,
  Trash2,
  Wallet,
  X,
  MessageCircle,
  CheckCircle2,
  Info,
} from "lucide-react";

import styles from "./Notifications.module.css";

const initialNotifications = [
  {
    id: 1,
    type: "payment",
    title: "تم تأكيد عملية الدفع",
    description:
      "تمت عملية دفع بقيمة 250 جنيه بنجاح، وتقدر تراجع تفاصيلها من سجل المعاملات.",
    time: "منذ 10 دقائق",
    date: "اليوم",
    read: false,
  },
  {
    id: 2,
    type: "package",
    title: "تحديث في الباقات المتاحة",
    description:
      "في باقات جديدة اتضافت لحسابك. تصفح الباقات المتاحة واختار الأنسب ليك.",
    time: "منذ ساعة",
    date: "اليوم",
    read: false,
  },
  {
    id: 3,
    type: "wallet",
    title: "تحديث رصيد المحفظة",
    description:
      "رصيد محفظتك الحالي 4,850 جنيه. تقدر تراجع تفاصيل الرصيد من صفحة المحفظة.",
    time: "منذ 3 ساعات",
    date: "اليوم",
    read: true,
  },
  {
    id: 4,
    type: "security",
    title: "تذكير بمراجعة بيانات الحساب",
    description:
      "تأكد إن بيانات التواصل الخاصة بمتجرك محدثة علشان تقدر تستقبل إشعارات الحساب.",
    time: "أمس، 04:30 م",
    date: "أمس",
    read: true,
  },
  {
    id: 5,
    type: "support",
    title: "تم تحديث طلب الدعم",
    description:
      "فريق الدعم أضاف تحديثًا على طلبك. افتح المحادثات لمتابعة التفاصيل.",
    time: "أمس، 12:15 م",
    date: "أمس",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "أهلًا بيك في Joker",
    description:
      "نتمنى لك تجربة مميزة! تقدر تتابع معاملاتك وتدير حساب متجرك من لوحة التحكم.",
    time: "19 أكتوبر 2026",
    date: "أقدم",
    read: true,
  },
];

const filters = [
  { id: "all", label: "الكل" },
  { id: "unread", label: "غير المقروءة" },
  { id: "read", label: "المقروءة" },
];

const notificationMeta = {
  payment: {
    icon: CreditCard,
    label: "المدفوعات",
    className: "payment",
  },
  package: {
    icon: Package,
    label: "الباقات",
    className: "package",
  },
  wallet: {
    icon: Wallet,
    label: "المحفظة",
    className: "wallet",
  },
  security: {
    icon: ShieldCheck,
    label: "الحساب",
    className: "security",
  },
  support: {
    icon: MessageCircle,
    label: "الدعم الفني",
    className: "support",
  },
  system: {
    icon: Info,
    label: "النظام",
    className: "system",
  },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    payments: true,
    packages: true,
    wallet: true,
    security: true,
    support: true,
    system: true,
  });
  const [notice, setNotice] = useState("");

  const unreadCount = notifications.filter((item) => !item.read).length;
  const readCount = notifications.length - unreadCount;

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "unread") {
      return notifications.filter((item) => !item.read);
    }

    if (activeFilter === "read") {
      return notifications.filter((item) => item.read);
    }

    return notifications;
  }, [notifications, activeFilter]);

  const groupedNotifications = useMemo(() => {
    const groups = [];

    for (const item of filteredNotifications) {
      let group = groups.find((entry) => entry.date === item.date);

      if (!group) {
        group = { date: item.date, items: [] };
        groups.push(group);
      }

      group.items.push(item);
    }

    return groups;
  }, [filteredNotifications]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
    setNotice("");
  };

  const markAllAsRead = () => {
    if (unreadCount === 0) return;

    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true })),
    );
    setNotice("تم تحديد كل الإشعارات كمقروءة.");
  };

  const deleteNotification = (id) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
    setNotice("تم حذف الإشعار من القائمة.");
  };

  const clearReadNotifications = () => {
    if (readCount === 0) return;

    setNotifications((current) => current.filter((item) => !item.read));
    setNotice("تم حذف الإشعارات المقروءة.");
  };

  const togglePreference = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const preferenceItems = [
    {
      key: "payments",
      label: "المدفوعات",
      description: "تأكيدات وعمليات الدفع",
    },
    {
      key: "packages",
      label: "الباقات",
      description: "تحديثات الباقات والعروض",
    },
    { key: "wallet", label: "المحفظة", description: "الرصيد وحركات المحفظة" },
    {
      key: "security",
      label: "أمان الحساب",
      description: "تنبيهات الحساب والأمان",
    },
    {
      key: "support",
      label: "الدعم الفني",
      description: "تحديثات طلبات الدعم",
    },
    { key: "system", label: "إشعارات النظام", description: "التحديثات العامة" },
  ];

  return (
    <div className={styles.page} dir="rtl">
      <header className={styles.pageHeader}>
        <div className={styles.heading}>
          <div className={styles.headingIcon}>
            <Bell size={23} />
            {unreadCount > 0 && <span className={styles.headingDot} />}
          </div>

          <div>
            <h1>الإشعارات</h1>
            <p>تابع آخر التحديثات والعمليات الخاصة بحساب متجرك.</p>
          </div>
        </div>

        <button
          type="button"
          className={styles.settingsButton}
          onClick={() => {
            setShowSettings((current) => !current);
            setNotice("");
          }}
          aria-expanded={showSettings}
        >
          <Settings2 size={18} />
          <span>إعدادات الإشعارات</span>
        </button>
      </header>

      <section className={styles.statsGrid}>
        <article className={styles.statCard}>
          <span className={`${styles.statIcon} ${styles.blueIcon}`}>
            <Bell size={20} />
          </span>
          <div className={styles.statInfo}>
            <span>إجمالي الإشعارات</span>
            <strong>{notifications.length}</strong>
          </div>
        </article>

        <article className={styles.statCard}>
          <span className={`${styles.statIcon} ${styles.orangeIcon}`}>
            <CircleAlert size={20} />
          </span>
          <div className={styles.statInfo}>
            <span>غير المقروءة</span>
            <strong>{unreadCount}</strong>
          </div>
          {unreadCount > 0 && <span className={styles.statBadge}>جديد</span>}
        </article>

        <article className={styles.statCard}>
          <span className={`${styles.statIcon} ${styles.greenIcon}`}>
            <CheckCheck size={20} />
          </span>
          <div className={styles.statInfo}>
            <span>المقروءة</span>
            <strong>{readCount}</strong>
          </div>
        </article>
      </section>

      {showSettings && (
        <section className={styles.settingsPanel}>
          <div className={styles.settingsHeader}>
            <div>
              <h2>تفضيلات الإشعارات</h2>
              <p>اختار أنواع الإشعارات اللي تحب تتابعها.</p>
            </div>

            <button
              type="button"
              className={styles.closeSettings}
              onClick={() => setShowSettings(false)}
              aria-label="إغلاق الإعدادات"
            >
              <X size={19} />
            </button>
          </div>

          <div className={styles.preferenceGrid}>
            {preferenceItems.map((item) => (
              <label key={item.key} className={styles.preferenceItem}>
                <span className={styles.preferenceText}>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>

                <input
                  type="checkbox"
                  checked={preferences[item.key]}
                  onChange={() => togglePreference(item.key)}
                />
                <span className={styles.toggle} />
              </label>
            ))}
          </div>

          <p className={styles.settingsNote}>
            الإعدادات دي تجريبية حاليًا، ومش بتتحكم في إشعارات حقيقية.
          </p>
        </section>
      )}

      <section className={styles.notificationsCard}>
        <div className={styles.listHeader}>
          <div>
            <h2>كل الإشعارات</h2>
            <p>
              عندك {unreadCount} إشعار غير مقروء
              {unreadCount === 1 ? "" : ""}
            </p>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.textAction}
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck size={16} />
              <span>تحديد الكل كمقروء</span>
            </button>

            <button
              type="button"
              className={styles.clearButton}
              onClick={clearReadNotifications}
              disabled={readCount === 0}
              title="حذف الإشعارات المقروءة"
              aria-label="حذف الإشعارات المقروءة"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.id}
              className={`${styles.filterButton} ${
                activeFilter === filter.id ? styles.activeFilter : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}

              {filter.id === "unread" && unreadCount > 0 && (
                <span className={styles.filterCount}>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {notice && (
          <div className={styles.notice} role="status">
            <CheckCircle2 size={17} />
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="إغلاق الرسالة"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {groupedNotifications.length > 0 ? (
          <div className={styles.notificationGroups}>
            {groupedNotifications.map((group) => (
              <div className={styles.notificationGroup} key={group.date}>
                <h3 className={styles.groupTitle}>
                  <span>{group.date}</span>
                  <span className={styles.groupLine} />
                </h3>

                <div className={styles.notificationList}>
                  {group.items.map((item) => {
                    const meta =
                      notificationMeta[item.type] || notificationMeta.system;
                    const Icon = meta.icon;

                    return (
                      <article
                        key={item.id}
                        className={`${styles.notificationItem} ${
                          !item.read ? styles.unreadItem : ""
                        }`}
                      >
                        <div
                          className={`${styles.notificationIcon} ${
                            styles[meta.className]
                          }`}
                        >
                          <Icon size={21} />
                        </div>

                        <div className={styles.notificationContent}>
                          <div className={styles.notificationTitleRow}>
                            <h4>{item.title}</h4>
                            {!item.read && (
                              <span className={styles.newBadge}>جديد</span>
                            )}
                          </div>

                          <p>{item.description}</p>

                          <div className={styles.notificationMeta}>
                            <span>{item.time}</span>
                            <span className={styles.metaDot}>•</span>
                            <span>{meta.label}</span>
                          </div>
                        </div>

                        <div className={styles.itemActions}>
                          {!item.read && (
                            <button
                              type="button"
                              className={styles.readButton}
                              onClick={() => markAsRead(item.id)}
                              title="تحديد كمقروء"
                              aria-label={`تحديد ${item.title} كمقروء`}
                            >
                              <Check size={17} />
                            </button>
                          )}

                          <button
                            type="button"
                            className={styles.deleteButton}
                            onClick={() => deleteNotification(item.id)}
                            title="حذف الإشعار"
                            aria-label={`حذف ${item.title}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>
              <Bell size={27} />
            </span>
            <h3>
              {activeFilter === "unread"
                ? "مفيش إشعارات غير مقروءة"
                : activeFilter === "read"
                  ? "مفيش إشعارات مقروءة"
                  : "مفيش إشعارات حاليًا"}
            </h3>
            <p>لما يكون فيه تحديثات جديدة، هتظهر هنا.</p>

            {activeFilter !== "all" && (
              <button
                type="button"
                className={styles.showAllButton}
                onClick={() => setActiveFilter("all")}
              >
                عرض كل الإشعارات
              </button>
            )}
          </div>
        )}
      </section>

      <div className={styles.demoNotice}>
        <Info size={17} />
        <p>
          دي بيانات تجريبية للتصميم. قراءة الإشعارات وحذفها بيتم داخل الصفحة
          فقط، ومش بيتحفظوا بعد تحديثها.
        </p>
      </div>
    </div>
  );
}
