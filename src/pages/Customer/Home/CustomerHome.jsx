import {
  ArrowLeft,
  CalendarClock,
  Database,
  Gauge,
  Headphones,
  RefreshCw,
  Wallet,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/AppLayout/AppLayout";
import { customerMock } from "../../../data/customerMock";
import { useFeature } from "../../../hooks/useFeature";
import styles from "./CustomerHome.module.css";

const { firstName, walletBalance, package: pkg } = customerMock;

const CustomerHome = () => {
  const navigate = useNavigate();
  const isEnabled = useFeature();

  const kpis = [
    isEnabled("wallet_enabled") && {
      icon: Wallet,
      label: "رصيد المحفظة",
      value: `${walletBalance.toFixed(2)}`,
      unit: "جنيه",
      onClick: () => navigate("/customer/wallet"),
    },
    {
      icon: Database,
      label: "المتبقي من الباقة",
      value: pkg.remainingGb,
      unit: "GB",
      onClick: () => navigate("/customer/package"),
    },
    {
      icon: CalendarClock,
      label: "التجديد بعد",
      value: pkg.daysLeft,
      unit: "يوم",
      onClick: () => navigate("/customer/package"),
    },
  ].filter(Boolean);

  const services = [
    isEnabled("wallet_enabled") && {
      icon: Wallet,
      title: "شحن رصيد",
      text: "اشحن محفظتك بسهولة",
      onClick: () => navigate("/customer/wallet"),
    },
    {
      icon: Wifi,
      title: "كروت Wi-Fi",
      text: "شراء كارت إنترنت",
      soon: true,
    },
    {
      icon: Gauge,
      title: "اختبار السرعة",
      text: "اختبر سرعة الإنترنت",
      href: "https://fast.com",
    },
    {
      icon: Headphones,
      title: "طلب صيانة",
      text: "اطلب الدعم الفني",
      onClick: () => navigate("/customer/maintenance"),
    },
  ].filter(Boolean);

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
                أهلاً بك، {firstName} <span>👋</span>
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
                  <strong>{pkg.name}</strong>
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
                    {pkg.usedGb}
                    <small> / {pkg.totalGb} GB</small>
                  </strong>
                </div>

                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={pkg.usedPercent}
                  aria-label="نسبة استهلاك الباقة"
                >
                  <div
                    className={styles.progressBar}
                    style={{ width: `${pkg.usedPercent}%` }}
                  />
                </div>

                <div className={styles.usageFooter}>
                  <span>متبقي {pkg.remainingGb} جيجابايت</span>
                  <span>{pkg.usedPercent}% مستخدم</span>
                </div>
              </div>

              <div className={styles.speed}>
                <span>سرعة الباقة</span>

                <strong>
                  {pkg.speedMbps}
                  <small> Mbps</small>
                </strong>
              </div>
            </div>

            <div className={styles.packageBottom}>
              <span>
                التجديد القادم:
                <strong> {pkg.endDate}</strong>
              </span>

              <div className={styles.packageActions}>
                <button
                  type="button"
                  onClick={() => navigate("/customer/offers")}
                  className={styles.ghostButton}
                >
                  <RefreshCw size={15} />
                  تجديد الباقة
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/customer/package")}
                  className={styles.packageButton}
                >
                  تفاصيل الباقة
                  <ArrowLeft size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* =========================
              KPIs
          ========================= */}
          <section className={styles.kpis} aria-label="ملخص سريع">
            {kpis.map(({ icon: Icon, label, value, unit, onClick }) => (
              <button
                key={label}
                type="button"
                className={styles.kpi}
                onClick={onClick}
              >
                <span className={styles.kpiIcon}>
                  <Icon size={20} />
                </span>

                <span className={styles.kpiText}>
                  <small>{label}</small>
                  <strong>
                    {value} <em>{unit}</em>
                  </strong>
                </span>
              </button>
            ))}
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
            </div>

            <div className={styles.servicesGrid}>
              {services.map(
                ({ icon: Icon, title, text, onClick, href, soon }) => {
                  const content = (
                    <>
                      <span className={styles.serviceIcon}>
                        <Icon size={21} />
                      </span>

                      <span className={styles.serviceText}>
                        <strong>{title}</strong>
                        <small>{text}</small>
                      </span>

                      {soon ? (
                        <span className={styles.soonBadge}>قريباً</span>
                      ) : (
                        <ArrowLeft size={16} className={styles.serviceArrow} />
                      )}
                    </>
                  );

                  if (href) {
                    return (
                      <a
                        key={title}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.serviceCard}
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={title}
                      type="button"
                      className={styles.serviceCard}
                      onClick={onClick}
                      disabled={soon}
                    >
                      {content}
                    </button>
                  );
                },
              )}
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
