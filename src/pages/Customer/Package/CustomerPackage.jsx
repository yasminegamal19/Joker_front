import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Gauge,
  RefreshCw,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../../components/AppLayout/AppLayout";
import styles from "./CustomerPackage.module.css";

const CustomerPackage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          {/* Header */}
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>الإنترنت المنزلي</span>
              <h1>باقتي</h1>
              <p>تابع استهلاكك وتفاصيل اشتراكك بسهولة.</p>
            </div>

            <div className={styles.status}>
              <span />
              الاشتراك نشط
            </div>
          </header>

          {/* Main Package */}
          <section className={styles.mainCard}>
            <div className={styles.cardTop}>
              <div className={styles.packageName}>
                <div className={styles.packageIcon}>
                  <Wifi size={20} />
                </div>

                <div>
                  <span>الباقة الحالية</span>
                  <h2>Turbo 200</h2>
                </div>
              </div>

              <div className={styles.active}>
                <CheckCircle2 size={14} />
                نشطة
              </div>
            </div>

            <div className={styles.usageArea}>
              {/* Circle */}
              <div className={styles.usageVisual}>
                <div className={styles.progressCircle}>
                  <div className={styles.circleCenter}>
                    <strong>128</strong>
                    <span>GB مستخدمة</span>
                    <small>من 200 GB</small>
                  </div>
                </div>

                <div className={styles.usageCaption}>
                  <span className={styles.captionDot} />
                  استهلاك الباقة
                </div>
              </div>

              {/* Stats */}
              <div className={styles.stats}>
                <div className={styles.statCard}>
                  <span>السرعة</span>
                  <strong>30</strong>
                  <small>Mbps</small>
                </div>

                <div className={styles.statCard}>
                  <span>المستخدم</span>
                  <strong>128</strong>
                  <small>GB</small>
                </div>

                <div className={styles.statCard}>
                  <span>المتبقي</span>
                  <strong className={styles.remaining}>72</strong>
                  <small>GB</small>
                </div>

                <div className={styles.statCard}>
                  <span>الاستخدام</span>
                  <strong>64%</strong>
                  <small>من الباقة</small>
                </div>
              </div>
            </div>

            {/* Linear Progress */}
            <div className={styles.linearUsage}>
              <div className={styles.linearHeader}>
                <span>استهلاك الباقة</span>
                <strong>128 / 200 GB</strong>
              </div>

              <div className={styles.track}>
                <div className={styles.bar} style={{ width: "64%" }} />
              </div>

              <div className={styles.linearFooter}>
                <span>المستخدم 64%</span>
                <span>المتبقي 72 GB</span>
              </div>
            </div>

            <button type="button" className={styles.detailsButton}>
              <Gauge size={16} />
              عرض تفاصيل الاستهلاك
              <ArrowLeft size={15} />
            </button>
          </section>

          {/* Subscription Info */}
          <section className={styles.infoSection}>
            <div className={styles.sectionTitle}>
              <div>
                <span>تفاصيل الاشتراك</span>
                <h2>معلومات الباقة</h2>
              </div>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <CalendarDays size={18} />
                </div>

                <div>
                  <span>بداية الباقة</span>
                  <strong>28 سبتمبر 2026</strong>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Clock3 size={18} />
                </div>

                <div>
                  <span>انتهاء الباقة</span>
                  <strong>28 أكتوبر 2026</strong>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <RefreshCw size={18} />
                </div>

                <div>
                  <span>التجديد</span>
                  <strong>تلقائي</strong>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Wifi size={18} />
                </div>

                <div>
                  <span>نوع الخدمة</span>
                  <strong>إنترنت منزلي</strong>
                </div>
              </div>
            </div>
          </section>
          {/* Actions */}
          <section className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/customer/offers")}
            >
              <RefreshCw size={16} />
              تغيير الباقة
            </button>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate("/customer/offers")}
            >
              تجديد الباقة
              <ArrowLeft size={16} />
            </button>
          </section>

          <button
            type="button"
            className={styles.extraButton}
            onClick={() => navigate("/customer/package/additional")}
          >
            إضافة باقة إضافية
            <ArrowLeft size={15} />
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerPackage;
