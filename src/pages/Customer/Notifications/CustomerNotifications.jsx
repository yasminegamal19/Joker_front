import {
  Bell,
  Check,
  CheckCheck,
  ChevronLeft,
  Clock3,
  CreditCard,
  Gift,
  Package,
  Settings2,
  Wrench,
} from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import styles from "./CustomerNotifications.module.css";

const initialNotifications = [
  {
    id: 1,
    type: "maintenance",
    title: "تم تحديد موعد الفني",
    description:
      "تم تحديد موعد زيارة الفني أحمد محمد لمتابعة طلب الصيانة الخاص بك.",
    date: "اليوم، 10:30 ص",
    time: "غدًا، من 10:00 ص إلى 12:00 م",
    unread: true,
    icon: Wrench,
  },
  {
    id: 2,
    type: "payment",
    title: "تمت عملية شحن المحفظة",
    description: "تم إضافة مبلغ 200 جنيه إلى محفظتك بنجاح.",
    date: "اليوم، 09:15 ص",
    unread: true,
    icon: CreditCard,
  },
  {
    id: 3,
    type: "offer",
    title: "عرض جديد متاح لك",
    description:
      "اشحن محفظتك بـ 300 جنيه أو أكثر واحصل على 50 جنيه رصيد إضافي.",
    date: "أمس، 06:20 م",
    unread: true,
    icon: Gift,
  },
  {
    id: 4,
    type: "package",
    title: "تذكير بتجديد الباقة",
    description:
      "باقتك الحالية Super 250 ستنتهي قريبًا. جدد الآن للحفاظ على الخدمة.",
    date: "أمس، 11:40 ص",
    unread: false,
    icon: Package,
  },
  {
    id: 5,
    type: "service",
    title: "الخدمة تعمل بشكل طبيعي",
    description: "تم فحص حالة الخدمة الخاصة بك ولا توجد أي مشكلة حاليًا.",
    date: "25 سبتمبر، 02:30 م",
    unread: false,
    icon: Settings2,
  },
];

const CustomerNotifications = () => {
  const unreadCount = initialNotifications.filter(
    (notification) => notification.unread,
  ).length;

  const getNotificationClass = (type) => {
    return styles[type] || "";
  };

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
                    {unreadCount} جديدة
                  </span>
                )}
              </div>

              <p>تابع آخر التحديثات الخاصة بخدمتك وحسابك.</p>
            </div>

            <button type="button" className={styles.markAllButton}>
              <CheckCheck size={17} />
              تحديد الكل كمقروء
            </button>
          </header>

          <section className={styles.summary}>
            <div className={styles.summaryIcon}>
              <Bell size={21} />
            </div>

            <div className={styles.summaryContent}>
              <strong>لديك {unreadCount} إشعارات جديدة</strong>
              <span>ستظهر لك هنا تحديثات الصيانة والدفع والعروض والباقات.</span>
            </div>

            <div className={styles.summaryStatus}>
              <span />
              محدثة الآن
            </div>
          </section>

          <div className={styles.filters}>
            <button type="button" className={styles.filterActive}>
              الكل
            </button>

            <button type="button">
              غير مقروءة
              <span>{unreadCount}</span>
            </button>

            <button type="button">الصيانة</button>
            <button type="button">المدفوعات</button>
            <button type="button">العروض</button>
          </div>

          <section className={styles.notifications}>
            {initialNotifications.map((notification) => {
              const Icon = notification.icon;

              return (
                <article
                  key={notification.id}
                  className={`${styles.notificationCard} ${
                    notification.unread ? styles.unread : ""
                  }`}
                >
                  <div
                    className={`${styles.notificationIcon} ${getNotificationClass(
                      notification.type,
                    )}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className={styles.notificationContent}>
                    <div className={styles.notificationHeader}>
                      <div className={styles.notificationTitle}>
                        <h2>{notification.title}</h2>

                        {notification.unread && (
                          <span className={styles.newDot}>جديد</span>
                        )}
                      </div>

                      <span className={styles.date}>
                        <Clock3 size={13} />
                        {notification.date}
                      </span>
                    </div>

                    <p>{notification.description}</p>

                    {notification.time && (
                      <div className={styles.appointment}>
                        <div className={styles.appointmentIcon}>
                          <Wrench size={16} />
                        </div>

                        <div>
                          <span>موعد الزيارة</span>
                          <strong>{notification.time}</strong>
                        </div>

                        <ChevronLeft size={17} />
                      </div>
                    )}

                    <div className={styles.notificationFooter}>
                      {notification.unread ? (
                        <button type="button">
                          <Check size={15} />
                          تحديد كمقروء
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

          <div className={styles.emptyHint}>
            <Bell size={18} />
            <span>أنت على اطلاع بآخر تحديثات حسابك.</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerNotifications;
