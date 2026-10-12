import {
  ArrowLeft,
  Gauge,
  Headphones,
  RefreshCw,
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
          {/* =========================
              Welcome
          ========================= */}
          <section className={styles.welcome}>
            <div>
              <span className={styles.eyebrow}>الرئيسية</span>

              <h1>
                أهلاً بك، ياسمين <span>👋</span>
              </h1>

              <p>تابع باقتك واستهلاكك وخدماتك من مكان واحد.</p>
            </div>

            <div className={styles.connectionStatus}>
              <span className={styles.statusDot} />
              <span>الإنترنت متصل</span>
            </div>
          </section>

          {/* =========================
              Current Package
          ========================= */}
          <section className={styles.packageCard}>
            <div className={styles.packageGlow} />

            <div className={styles.packageTop}>
              <div className={styles.packageTitle}>
                <div className={styles.packageIcon}>
                  <Wifi size={20} strokeWidth={2} />
                </div>

                <div>
                  <span>باقة الإنترنت الحالية</span>
                  <strong>Super 250</strong>
                </div>
              </div>

              <span className={styles.activeBadge}>
                <span />
                نشطة
              </span>
            </div>

            <div className={styles.packageMain}>
              <div className={styles.usage}>
                <div className={styles.usageHeader}>
                  <span>استهلاك الباقة</span>

                  <strong>
                    168
                    <small> / 250 GB</small>
                  </strong>
                </div>

                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "67%" }}
                  />
                </div>

                <div className={styles.usageFooter}>
                  <span>متبقي 82 جيجابايت</span>
                  <span>67% مستخدم</span>
                </div>
              </div>

              <div className={styles.speed}>
                <span>سرعة الباقة</span>

                <strong>
                  30
                  <small> Mbps</small>
                </strong>
              </div>
            </div>

            <div className={styles.packageBottom}>
              <span>
                التجديد القادم:
                <strong> 15 أكتوبر 2026</strong>
              </span>

             <button
  type="button"
  onClick={() => navigate("/customer/package")}
  className={styles.packageButton}
>
  تفاصيل الباقة
  <ArrowLeft size={16} />
</button>
            </div>
          </section>

          {/* =========================
              Usage Summary
          ========================= */}
          <section className={styles.usageCard}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>استهلاك الباقة</span>

                <h2>استهلاكك الأساسي</h2>
              </div>

              <button
                type="button"
                className={styles.detailsButton}
                onClick={() => navigate("/customer/offers")}
              >
                التفاصيل
                <ArrowLeft size={15} />
              </button>
            </div>

            <div className={styles.usageContent}>
              <div className={styles.circleWrapper}>
                <div className={styles.circle}>
                  <div className={styles.circleInner}>
                    <strong>168</strong>
                    <span>جيجابايت</span>
                    <small>من 250 GB</small>
                  </div>
                </div>
              </div>

              <div className={styles.usageStats}>
                <div className={styles.usageStat}>
                  <span className={styles.blueDot} />
                  <div>
                    <small>المستخدم</small>
                    <strong>168 GB</strong>
                  </div>
                </div>

                <div className={styles.usageStat}>
                  <span className={styles.greenDot} />
                  <div>
                    <small>المتبقي</small>
                    <strong>82 GB</strong>
                  </div>
                </div>

                <div className={styles.usageStat}>
                  <span className={styles.grayDot} />
                  <div>
                    <small>نسبة الاستخدام</small>
                    <strong>67%</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.usageActions}>
              <button
                type="button"
                className={styles.secondaryAction}
                onClick={() => navigate("/customer/offers")}
              >
                <RefreshCw size={16} />
                تجديد الباقة
              </button>

              <button
                type="button"
                className={styles.primaryAction}
                onClick={() => navigate("/customer/offers")}
              >
                <Wifi size={16} />
                إضافة باقة
              </button>
            </div>
          </section>

          {/* =========================
              Quick Services
          ========================= */}
          <section className={styles.servicesSection}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>الخدمات</span>

                <h2>الخدمات السريعة</h2>
              </div>

              <span className={styles.sectionCount}>4 خدمات</span>
            </div>

            <div className={styles.servicesGrid}>
              <button
                type="button"
                className={styles.serviceCard}
                onClick={() => navigate("/customer/wallet")}
              >
                <span className={styles.serviceIcon}>
                  <Wallet size={21} />
                </span>

                <span className={styles.serviceText}>
                  <strong>شحن رصيد</strong>
                  <small>اشحن محفظتك بسهولة</small>
                </span>

                <ArrowLeft size={16} className={styles.serviceArrow} />
              </button>

              <button type="button" className={styles.serviceCard}>
                <span className={styles.serviceIcon}>
                  <Wifi size={21} />
                </span>

                <span className={styles.serviceText}>
                  <strong>كروت Wi-Fi</strong>
                  <small>شراء كارت إنترنت</small>
                </span>

                <ArrowLeft size={16} className={styles.serviceArrow} />
              </button>

              <button type="button" className={styles.serviceCard}>
                <span className={styles.serviceIcon}>
                  <Gauge size={21} />
                </span>

                <span className={styles.serviceText}>
                  <strong>اختبار السرعة</strong>
                  <small>اختبر سرعة الإنترنت</small>
                </span>

                <ArrowLeft size={16} className={styles.serviceArrow} />
              </button>

              <button
                type="button"
                className={styles.serviceCard}
                onClick={() => navigate("/customer/maintenance")}
              >
                <span className={styles.serviceIcon}>
                  <Headphones size={21} />
                </span>

                <span className={styles.serviceText}>
                  <strong>طلب صيانة</strong>
                  <small>اطلب الدعم الفني</small>
                </span>

                <ArrowLeft size={16} className={styles.serviceArrow} />
              </button>
            </div>
          </section>

          {/* =========================
              Offer Banner
          ========================= */}
          <section className={styles.offer}>
            <div className={styles.offerPattern} />

            <div className={styles.offerContent}>
              <span className={styles.offerBadge}>عرض مميز</span>

              <h2>
                ضاعف جيجاتك
                <span> واستمتع أكتر</span>
              </h2>

              <p>
                اشحن محفظتك واستفد من عروض الجوكر الحصرية واحصل على قيمة إضافية.
              </p>

              <button
                type="button"
                onClick={() => navigate("/customer/offers")}
                className={styles.offerButton}
              >
                اكتشف العروض
                <ArrowLeft size={16} />
              </button>
            </div>

            <div className={styles.offerVisual}>
              <strong>2X</strong>
              <span>جيجات</span>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerHome;
