import {
  Bell,
  Check,
  CheckCheck,
  Clock3,
  CreditCard,
  Gift,
  Package,
  Settings2,
  Wrench,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import apiClient from "../../../lib/apiClient";
import styles from "./CustomerNotifications.module.css";

const notificationTypes = {
  maintenance: {
    icon: Wrench,
    category: "maintenance",
  },
  maintenance_request: {
    icon: Wrench,
    category: "maintenance",
  },
  renewal_success: {
    icon: CheckCheck,
    category: "package",
  },
  expiry_warning: {
    icon: Package,
    category: "package",
  },
  payment: {
    icon: CreditCard,
    category: "payment",
  },
  payment_success: {
    icon: CreditCard,
    category: "payment",
  },
  wallet: {
    icon: CreditCard,
    category: "payment",
  },
  offer: {
    icon: Gift,
    category: "offer",
  },
  service: {
    icon: Settings2,
    category: "service",
  },
};

const getNotificationMeta = (type) => {
  const normalizedType = String(type || "")
    .trim()
    .toLowerCase()
    .replaceAll("-", "_")
    .replaceAll(" ", "_");

  if (notificationTypes[normalizedType]) {
    return notificationTypes[normalizedType];
  }

  if (normalizedType.includes("maintenance")) {
    return notificationTypes.maintenance;
  }

  if (
    normalizedType.includes("payment") ||
    normalizedType.includes("wallet") ||
    normalizedType.includes("charge")
  ) {
    return notificationTypes.payment;
  }

  if (
    normalizedType.includes("offer") ||
    normalizedType.includes("promo")
  ) {
    return notificationTypes.offer;
  }

  if (
    normalizedType.includes("renewal") ||
    normalizedType.includes("expiry") ||
    normalizedType.includes("package") ||
    normalizedType.includes("subscription")
  ) {
    return notificationTypes.expiry_warning;
  }

  return notificationTypes.service;
};

const formatDate = (value) => {
  if (!value) return "تاريخ غير متاح";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "تاريخ غير متاح";

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const getErrorMessage = (error) => {
  const status = error.response?.status;

  if (status === 401 || status === 403) {
    return "تعذر الوصول إلى الإشعارات. تأكدي من تسجيل الدخول وصلاحيات الحساب.";
  }

  return (
    error.response?.data?.message ||
    "حدث خطأ أثناء تحميل الإشعارات. حاولي مرة أخرى."
  );
};

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");
  const [actionError, setActionError] = useState("");

  const [readingIds, setReadingIds] = useState([]);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setLoadingError("");

      const response = await apiClient.get("/notifications");
      const data = response.data;

      if (!Array.isArray(data?.notifications)) {
        throw new Error("INVALID_NOTIFICATIONS_RESPONSE");
      }

      setNotifications(data.notifications);
      setUnreadCount(
        Number.isFinite(Number(data.unread_count))
          ? Number(data.unread_count)
          : data.notifications.filter((item) => !item.read_at).length,
      );
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setLoadingError(
        error.message === "INVALID_NOTIFICATIONS_RESPONSE"
          ? "تعذر قراءة بيانات الإشعارات المستلمة."
          : getErrorMessage(error),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (notification) => {
    if (notification.read_at || readingIds.includes(notification.id)) {
      return;
    }

    try {
      setActionError("");
      setReadingIds((previous) => [...previous, notification.id]);

      await apiClient.post(
        `/notifications/${encodeURIComponent(notification.id)}/read`,
      );

      setNotifications((previous) =>
        previous.map((item) =>
          item.id === notification.id
            ? { ...item, read_at: new Date().toISOString() }
            : item,
        ),
      );

      setUnreadCount((previous) => Math.max(0, previous - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      setActionError(
        error.response?.data?.message ||
          "تعذر تحديد الإشعار كمقروء. حاولي مرة أخرى.",
      );
    } finally {
      setReadingIds((previous) =>
        previous.filter((id) => id !== notification.id),
      );
    }
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0 || markingAll) return;

    try {
      setActionError("");
      setMarkingAll(true);

      await apiClient.post("/notifications/read-all");

      const readAt = new Date().toISOString();

      setNotifications((previous) =>
        previous.map((item) => ({
          ...item,
          read_at: item.read_at || readAt,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      setActionError(
        error.response?.data?.message ||
          "تعذر تحديد كل الإشعارات كمقروءة. حاولي مرة أخرى.",
      );
    } finally {
      setMarkingAll(false);
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const category = getNotificationMeta(notification.type).category;

      switch (activeFilter) {
        case "unread":
          return !notification.read_at;

        case "maintenance":
          return category === "maintenance";

        case "payment":
          return category === "payment";

        case "offer":
          return category === "offer";

        default:
          return true;
      }
    });
  }, [notifications, activeFilter]);

  const filters = [
    { id: "all", label: "الكل" },
    { id: "unread", label: "غير مقروءة" },
    { id: "maintenance", label: "الصيانة" },
    { id: "payment", label: "المدفوعات" },
    { id: "offer", label: "العروض" },
  ];

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>آخر التحديثات</span>

              <div className={styles.titleRow}>
                <h1>الإشعارات</h1>

                {unreadCount > 0 && (
                  <span className={styles.unreadBadge}>
                    {unreadCount} غير مقروءة
                  </span>
                )}
              </div>

              <p>تابعي آخر التحديثات الخاصة بخدمتك وحسابك.</p>
            </div>

            <button
              type="button"
              className={styles.markAllButton}
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0 || markingAll}
            >
              {markingAll ? (
                <LoaderCircle size={17} className={styles.loadingIcon} />
              ) : (
                <CheckCheck size={17} />
              )}
              {markingAll ? "جاري التحديث..." : "تحديد الكل كمقروء"}
            </button>
          </header>

          <section className={styles.summary}>
            <div className={styles.summaryIcon}>
              <Bell size={21} />
            </div>

            <div className={styles.summaryContent}>
              <strong>
                {unreadCount > 0
                  ? `لديك ${unreadCount} إشعارات غير مقروءة`
                  : "لا توجد إشعارات جديدة"}
              </strong>

              <span>
                تظهر هنا تحديثات الصيانة والدفع والعروض والاشتراكات.
              </span>
            </div>

            <div className={styles.summaryStatus}>
              <span />
              متصلة
            </div>
          </section>

          {actionError && (
            <div className={styles.errorNotice} role="alert">
              <AlertCircle size={18} />
              <span>{actionError}</span>
              <button type="button" onClick={() => setActionError("")}>
                إغلاق
              </button>
            </div>
          )}

          <div className={styles.filters}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={
                  activeFilter === filter.id ? styles.filterActive : ""
                }
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
              >
                {filter.label}

                {filter.id === "unread" && unreadCount > 0 && (
                  <span>{unreadCount}</span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className={styles.stateCard}>
              <LoaderCircle
                size={27}
                className={styles.loadingIcon}
              />
              <span>جاري تحميل الإشعارات...</span>
            </div>
          ) : loadingError ? (
            <div className={styles.stateCard} role="alert">
              <AlertCircle size={25} />
              <span>{loadingError}</span>

              <button
                type="button"
                className={styles.retryButton}
                onClick={fetchNotifications}
              >
                <RefreshCw size={15} />
                إعادة المحاولة
              </button>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className={styles.stateCard}>
              <div className={styles.emptyIcon}>
                <Bell size={24} />
              </div>

              <strong>
                {activeFilter === "all"
                  ? "لا توجد إشعارات حتى الآن"
                  : activeFilter === "unread"
                    ? "لا توجد إشعارات غير مقروءة"
                    : "لا توجد إشعارات في هذا القسم"}
              </strong>

              <span>ستظهر هنا أي تحديثات جديدة تخص حسابك.</span>

              {activeFilter !== "all" && (
                <button
                  type="button"
                  className={styles.retryButton}
                  onClick={() => setActiveFilter("all")}
                >
                  عرض كل الإشعارات
                </button>
              )}
            </div>
          ) : (
            <section className={styles.notifications}>
              {filteredNotifications.map((notification) => {
                const { icon: Icon, category } = getNotificationMeta(
                  notification.type,
                );

                const isUnread = !notification.read_at;
                const isReading = readingIds.includes(notification.id);

                return (
                  <article
                    key={notification.id}
                    className={`${styles.notificationCard} ${
                      isUnread ? styles.unread : ""
                    }`}
                  >
                    <div
                      className={`${styles.notificationIcon} ${
                        styles[category] || ""
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className={styles.notificationContent}>
                      <div className={styles.notificationHeader}>
                        <div className={styles.notificationTitle}>
                          <h2>{notification.title}</h2>

                          {isUnread && (
                            <span className={styles.newDot}>جديد</span>
                          )}
                        </div>

                        <span className={styles.date}>
                          <Clock3 size={13} />
                          {formatDate(notification.created_at)}
                        </span>
                      </div>

                      <p>{notification.body}</p>

                      <div className={styles.notificationFooter}>
                        {isUnread ? (
                          <button
                            type="button"
                            onClick={() => handleMarkAsRead(notification)}
                            disabled={isReading || markingAll}
                          >
                            {isReading ? (
                              <LoaderCircle
                                size={15}
                                className={styles.loadingIcon}
                              />
                            ) : (
                              <Check size={15} />
                            )}
                            {isReading
                              ? "جاري التحديث..."
                              : "تحديد كمقروء"}
                          </button>
                        ) : (
                          <span className={styles.readStatus}>
                            <CheckCheck size={14} />
                            تمت القراءة
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}

          {!loading && !loadingError && notifications.length > 0 && (
            <div className={styles.emptyHint}>
              <Bell size={18} />
              <span>
                عرض {filteredNotifications.length} من أصل{" "}
                {notifications.length} إشعار.
              </span>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerNotifications;
