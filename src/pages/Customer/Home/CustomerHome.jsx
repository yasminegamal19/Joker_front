import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import AppLayout from "../../../components/AppLayout/AppLayout";
import { customerMock } from "../../../data/customerMock";
import { useFeature } from "../../../hooks/useFeature";
import apiClient from "../../../lib/apiClient";
import styles from "./CustomerHome.module.css";

const { firstName, walletBalance } = customerMock;

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

const formatNumber = (value, maximumFractionDigits = 1) => {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return "—";
  }

  return new Intl.NumberFormat("ar-EG", {
    maximumFractionDigits,
  }).format(Number(value));
};

const statusLabels = {
  active: "نشطة",
  expired: "منتهية",
  suspended: "موقوفة",
  pending: "قيد التفعيل",
};

const CustomerHome = () => {
  const navigate = useNavigate();
  const isEnabled = useFeature();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchSubscription = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await apiClient.get("/subscription");

        if (mounted) {
          setSubscription(response.data?.subscription ?? null);
        }
      } catch (requestError) {
        if (mounted) {
          setError(
            requestError.response?.data?.message ||
              "تعذر تحميل بيانات اشتراكك حاليًا.",
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSubscription();

    return () => {
      mounted = false;
    };
  }, [retryKey]);

  const packageInfo = useMemo(() => {
    if (!subscription) return null;

    const usedGb =
      subscription.quota_used_mb != null
        ? Number(subscription.quota_used_mb) / 1024
        : null;

    const downloadSpeed =
      subscription.download_speed_kbps != null
        ? Number(subscription.download_speed_kbps) / 1024
        : null;

    return {
      name: subscription.package_name || "باقة الإنترنت",
      usedGb,
      downloadSpeed,
      daysLeft:
        subscription.days_remaining != null
          ? Number(subscription.days_remaining)
          : null,
      endDate: subscription.end_date,
      status: subscription.status || "active",
      isExpiringSoon: Boolean(subscription.is_expiring_soon),
    };
  }, [subscription]);

  const kpis = [
    isEnabled("wallet_enabled") && {
      icon: Wallet,
      label: "رصيد المحفظة",
      value: formatNumber(walletBalance, 2),
      unit: "جنيه",
      onClick: () => navigate("/customer/wallet"),
    },
    packageInfo?.usedGb != null && {
      icon: Database,
      label: "الاستهلاك الحالي",
      value: formatNumber(packageInfo.usedGb),
      unit: "GB",
      onClick: () => navigate("/customer/package"),
    },
    packageInfo?.daysLeft != null && {
      icon: CalendarClock,
      label: "الأيام المتبقية",
      value: formatNumber(packageInfo.daysLeft, 0),
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
          {/* Welcome */}
          <section className={styles.welcome}>
            <div>
              <span className={styles.eyebrow}>الرئيسية</span>

              <h1>
                أهلاً بك، {firstName} <span>👋</span>
              </h1>

              <p>تابع باقتك واستهلاكك وخدماتك من مكان واحد.</p>
            </div>

            {!loading && packageInfo && (
              <div className={styles.connectionStatus}>
                <span className={styles.statusDot} />
                <span>حالة الاشتراك: {statusLabels[packageInfo.status] || packageInfo.status}</span>
              </div>
            )}
          </section>

          {/* Current Package */}
          <section className={styles.packageCard}>
            <div className={styles.packageGlow} />

            {loading ? (
              <div className={styles.packageTop}>
                <div className={styles.packageTitle}>
                  <div className={styles.packageIcon}>
                    <Wifi size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <span>باقة الإنترنت الحالية</span>
                    <strong>جاري تحميل بيانات الاشتراك...</strong>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className={styles.packageTop}>
                <div className={styles.packageTitle}>
                  <div className={styles.packageIcon}>
                    <Wifi size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <span>باقة الإنترنت الحالية</span>
                    <strong>{error}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.packageButton}
                  onClick={() => setRetryKey((key) => key + 1)}
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : !packageInfo ? (
              <div className={styles.packageTop}>
                <div className={styles.packageTitle}>
                  <div className={styles.packageIcon}>
                    <Wifi size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <span>باقة الإنترنت الحالية</span>
                    <strong>لا يوجد اشتراك فعال حاليًا</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.packageButton}
                  onClick={() => navigate("/customer/packages")}
                >
                  استعراض الباقات
                  <ArrowLeft size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className={styles.packageTop}>
                  <div className={styles.packageTitle}>
                    <div className={styles.packageIcon}>
                      <Wifi size={20} strokeWidth={2} />
                    </div>

                    <div>
                      <span>باقة الإنترنت الحالية</span>
                      <strong>{packageInfo.name}</strong>
                    </div>
                  </div>

                  <span className={styles.activeBadge}>
                    <span />
                    {statusLabels[packageInfo.status] || packageInfo.status}
                  </span>
                </div>

                <div className={styles.packageMain}>
                  <div className={styles.usage}>
                    <div className={styles.usageHeader}>
                      <span>الاستهلاك الحالي</span>

                      <strong>
                        {packageInfo.usedGb != null
                          ? formatNumber(packageInfo.usedGb)
                          : "—"}
                        <small> GB مستخدم</small>
                      </strong>
                    </div>

                    <p>
                      إجمالي سعة الباقة غير متاح حاليًا من بيانات الاشتراك.
                    </p>
                  </div>

                  <div className={styles.speed}>
                    <span>سرعة التحميل</span>

                    <strong>
                      {packageInfo.downloadSpeed != null
                        ? formatNumber(packageInfo.downloadSpeed)
                        : "—"}
                      <small> Mbps</small>
                    </strong>
                  </div>
                </div>

                <div className={styles.packageBottom}>
                  <span>
                    تاريخ الانتهاء:
                    <strong> {formatDate(packageInfo.endDate)}</strong>
                  </span>

                  <div className={styles.packageActions}>
                    <button
                      type="button"
                      onClick={() => navigate("/customer/package/renew")}
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

                {packageInfo.isExpiringSoon && (
                  <p role="status">
                    اشتراكك قرب ينتهي، جدّد الباقة لتجنب انقطاع الخدمة.
                  </p>
                )}
              </>
            )}
          </section>

          {/* KPIs */}
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

          {/* Quick Services */}
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
                        <ArrowLeft
                          size={16}
                          className={styles.serviceArrow}
                        />
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

          {/* Offer Banner */}
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
