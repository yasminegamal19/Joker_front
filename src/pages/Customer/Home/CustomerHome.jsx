import {
  ArrowLeft,
  CalendarDays,
  Gauge,
  Headphones,
  MapPin,
  RefreshCw,
  Router,
  Signal,
  Sparkles,
  Wallet,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../../components/AppLayout/AppLayout";
import styles from "./CustomerHome.module.css";

const CustomerHome = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <section className={styles.welcome}>
            <div>
              <span className={styles.eyebrow}>لوحة العميل</span>
              <h1>أهلاً بك، ياسمين 👋</h1>
              <p>
                تابع خدمات الإنترنت الخاصة بك وتحكم في باقتك ومحفظتك بسهولة.
              </p>
            </div>

            <div className={styles.serviceStatus}>
              <span className={styles.statusDot} />
              <span>الخدمة تعمل بشكل طبيعي</span>
            </div>
          </section>

          <section className={styles.overviewGrid}>
            <div className={`${styles.card} ${styles.walletCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.iconBox}>
                    <Wallet size={19} />
                  </span>

                  <div>
                    <span>رصيد المحفظة</span>
                    <small>الرصيد المتاح</small>
                  </div>
                </div>

                <button type="button" className={styles.cardAction}>
                  إدارة المحفظة
                  <ArrowLeft size={15} />
                </button>
              </div>

              <div className={styles.balance}>
                <strong>250.00</strong>
                <span>جنيه</span>
              </div>

              <div className={styles.walletFooter}>
                <span>آخر عملية شحن منذ يومين</span>

                <button type="button" className={styles.rechargeButton}>
                  شحن المحفظة
                </button>
              </div>
            </div>

            <div className={`${styles.card} ${styles.packageCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.iconBox}>
                    <Wifi size={19} />
                  </span>

                  <div>
                    <span>الباقة الحالية</span>
                    <small>باقة الإنترنت المنزلي</small>
                  </div>
                </div>

                <span className={styles.packageActive}>نشطة</span>
              </div>

              <div className={styles.packageInfo}>
                <div>
                  <strong>Super 250</strong>
                  <span>250 جيجابايت</span>
                </div>

                <div className={styles.packageSpeed}>
                  <Signal size={17} />
                  <span>30 Mbps</span>
                </div>
              </div>

              <div className={styles.progressWrapper}>
                <div className={styles.progressInfo}>
                  <span>المستخدم</span>
                  <strong>168 / 250 GB</strong>
                </div>

                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "67%" }}
                  />
                </div>
              </div>

              <div className={styles.packageFooter}>
                <span>
                  <CalendarDays size={15} />
                  التجديد في 15 أكتوبر
                </span>

                <button type="button" className={styles.renewButton}>
                  تجديد الباقة
                </button>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>الخدمات</span>
                <h2>ماذا تريد أن تفعل؟</h2>
              </div>
            </div>

            <div className={styles.actionsGrid}>
              <button type="button" className={styles.actionCard}>
                <span className={styles.actionIcon}>
                  <Wallet size={21} />
                </span>

                <span className={styles.actionContent}>
                  <strong>شحن المحفظة</strong>
                  <small>أضف رصيدًا لمحفظتك</small>
                </span>

                <ArrowLeft size={17} className={styles.actionArrow} />
              </button>

              <button type="button" className={styles.actionCard}>
                <span className={styles.actionIcon}>
                  <RefreshCw size={21} />
                </span>

                <span className={styles.actionContent}>
                  <strong>تجديد الباقة</strong>
                  <small>جدد باقتك الحالية</small>
                </span>

                <ArrowLeft size={17} className={styles.actionArrow} />
              </button>

              <button type="button" className={styles.actionCard}>
                <span className={styles.actionIcon}>
                  <Gauge size={21} />
                </span>

                <span className={styles.actionContent}>
                  <strong>اختبار السرعة</strong>
                  <small>اختبر سرعة الإنترنت</small>
                </span>

                <ArrowLeft size={17} className={styles.actionArrow} />
              </button>

              <button
                type="button"
                className={styles.actionCard}
                onClick={() => navigate("/customer/maintenance")}
              >
                <span className={styles.actionIcon}>
                  <Headphones size={21} />
                </span>

                <span className={styles.actionContent}>
                  <strong>طلب صيانة</strong>
                  <small>أرسل طلب دعم فني</small>
                </span>

                <ArrowLeft size={17} className={styles.actionArrow} />
              </button>
            </div>
          </section>

          <section className={styles.lowerGrid}>
            <div className={`${styles.card} ${styles.trackingCard}`}>
              <div className={styles.sectionCardHeader}>
                <div>
                  <span className={styles.sectionEyebrow}>الدعم الفني</span>
                  <h2>متابعة طلب الصيانة</h2>
                </div>

                <span className={styles.trackingStatus}>جاري المتابعة</span>
              </div>

              <div className={styles.trackingBody}>
                <div className={styles.mapPlaceholder}>
                  <div className={styles.mapPattern} />

                  <div className={styles.mapPin}>
                    <MapPin size={22} />
                  </div>

                  <div className={styles.repLocation}>
                    <span className={styles.repPulse} />
                    <span>الفني في الطريق إليك</span>
                  </div>
                </div>

                <div className={styles.trackingInfo}>
                  <div className={styles.repAvatar}>
                    <Router size={21} />
                  </div>

                  <div className={styles.repDetails}>
                    <span>فني الصيانة</span>
                    <strong>أحمد محمد</strong>
                    <small>متوقع الوصول خلال 25 دقيقة</small>
                  </div>

                  <button
                    type="button"
                    className={styles.chatButton}
                    onClick={() => navigate("/customer/maintenance/tracking")}
                  >
                    <Headphones size={17} />
                    تواصل
                  </button>
                </div>
              </div>
            </div>

            <div className={`${styles.card} ${styles.offerCard}`}>
              <div className={styles.offerGlow} />

              <div className={styles.offerContent}>
                <span className={styles.offerBadge}>
                  <Sparkles size={14} />
                  عرض خاص
                </span>

                <h2>اشحن محفظتك واحصل على مزايا إضافية</h2>

                <p>
                  استفد من عروض جوكر الحصرية واحصل على قيمة إضافية عند الشحن.
                </p>

                <button type="button" className={styles.offerButton}>
                  اكتشف العروض
                  <ArrowLeft size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerHome;
