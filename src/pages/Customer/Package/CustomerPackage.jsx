import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../../components/AppLayout/AppLayout";
import { customerMock } from "../../../data/customerMock";
import { useCanChangePackage } from "../../../hooks/useCanChangePackage";
import styles from "./CustomerPackage.module.css";

const { package: pkg } = customerMock;

const CustomerPackage = () => {
  const navigate = useNavigate();
  const { enabled: canChangePackage } = useCanChangePackage();

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
                  <h2>{pkg.name}</h2>
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
                <div
                  className={styles.progressCircle}
                  style={{ "--pct": pkg.usedPercent }}
                >
                  <div className={styles.circleCenter}>
                    <strong>{pkg.usedGb}</strong>
                    <span>GB مستخدمة</span>
                    <small>من {pkg.totalGb} GB</small>
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
                  <strong>{pkg.speedMbps}</strong>
                  <small>Mbps</small>
                </div>

                <div className={styles.statCard}>
                  <span>المستخدم</span>
                  <strong>{pkg.usedGb}</strong>
                  <small>GB</small>
                </div>

                <div className={styles.statCard}>
                  <span>المتبقي</span>
                  <strong className={styles.remaining}>
                    {pkg.remainingGb}
                  </strong>
                  <small>GB</small>
                </div>

                <div className={styles.statCard}>
                  <span>الاستخدام</span>
                  <strong>{pkg.usedPercent}%</strong>
                  <small>من الباقة</small>
                </div>
              </div>
            </div>

            {/* Linear Progress */}
            <div className={styles.linearUsage}>
              <div className={styles.linearHeader}>
                <span>استهلاك الباقة</span>
                <strong>
                  {pkg.usedGb} / {pkg.totalGb} GB
                </strong>
              </div>

              <div className={styles.track}>
                <div
                  className={styles.bar}
                  style={{ width: `${pkg.usedPercent}%` }}
                />
              </div>

              <div className={styles.linearFooter}>
                <span>المستخدم {pkg.usedPercent}%</span>
                <span>المتبقي {pkg.remainingGb} GB</span>
              </div>
            </div>
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
                  <strong>{pkg.startDate}</strong>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Clock3 size={18} />
                </div>

                <div>
                  <span>انتهاء الباقة</span>
                  <strong>{pkg.endDate}</strong>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <RefreshCw size={18} />
                </div>

                <div>
                  <span>التجديد</span>
                  <strong>{pkg.autoRenew ? "تلقائي" : "يدوي"}</strong>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <Wifi size={18} />
                </div>

                <div>
                  <span>نوع الخدمة</span>
                  <strong>{pkg.serviceType}</strong>
                </div>
              </div>
            </div>
          </section>
          {/* Actions */}
          <section
            className={styles.actions}
            style={
              canChangePackage ? undefined : { gridTemplateColumns: "1fr" }
            }
          >
            {canChangePackage && (
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => navigate("/customer/packages")}
              >
                <RefreshCw size={16} />
                تغيير الباقة
              </button>
            )}

            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate("/customer/package/renew")}
            >
              تجديد الباقة
              <ArrowLeft size={16} />
            </button>
          </section>

          <button
            type="button"
            className={styles.extraButton}
            onClick={() => navigate("/customer/additional-packages")}
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
