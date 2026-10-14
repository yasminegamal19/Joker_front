import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Wifi,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../../components/AppLayout/AppLayout";
import apiClient from "../../../lib/apiClient";
import { useCanChangePackage } from "../../../hooks/useCanChangePackage";
import styles from "./CustomerPackage.module.css";

const formatDate = (date) => {
  if (!date) return "غير متاح";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

const formatGB = (mb) => {
  if (mb == null || !Number.isFinite(Number(mb))) return null;
  return (Number(mb) / 1024).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
};

const formatSpeed = (kbps) => {
  if (kbps == null || !Number.isFinite(Number(kbps))) return null;
  return (Number(kbps) / 1024).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
};

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  "تعذر تحميل بيانات الباقة. برجاء المحاولة مرة أخرى.";

const CustomerPackage = () => {
  const navigate = useNavigate();
  const { enabled: canChangePackage } = useCanChangePackage();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchSubscription = async () => {
      setLoading(true);
      setError("");
      setEmptyMessage("");

      try {
        const response = await apiClient.get("/subscription");
        const data = response.data;

        if (!isMounted) return;

        if (data?.subscription) {
          setSubscription(data.subscription);
        } else {
          setSubscription(null);
          setEmptyMessage(data?.message || "لا يوجد اشتراك فعال حاليًا.");
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSubscription();

    return () => {
      isMounted = false;
    };
  }, []);

  const retryFetch = () => {
    setLoading(true);
    setError("");
    setEmptyMessage("");

    apiClient
      .get("/subscription")
      .then(({ data }) => {
        if (data?.subscription) {
          setSubscription(data.subscription);
        } else {
          setSubscription(null);
          setEmptyMessage(data?.message || "لا يوجد اشتراك فعال حاليًا.");
        }
      })
      .catch((err) => {
        setError(getErrorMessage(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isActive = subscription?.status === "active";
  const usedGB = formatGB(subscription?.quota_used_mb);
  const downloadSpeed = formatSpeed(subscription?.download_speed_kbps);
  const browsingSpeed = formatSpeed(subscription?.browsing_speed_kbps);

  const statusLabel =
    {
      active: "نشطة",
      expired: "منتهية",
      suspended: "موقوفة",
      pending: "قيد التفعيل",
    }[subscription?.status] || "غير محددة";

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>الإنترنت المنزلي</span>
              <h1>باقتي</h1>
              <p>تابع استهلاكك وتفاصيل اشتراكك بسهولة.</p>
            </div>

            {!loading && subscription && (
              <div
                className={styles.status}
                style={
                  !isActive
                    ? {
                        color: "var(--text-secondary)",
                        background: "var(--background)",
                        borderColor: "var(--border)",
                      }
                    : undefined
                }
              >
                <span
                  style={
                    !isActive
                      ? { background: "var(--text-secondary)" }
                      : undefined
                  }
                />
                {statusLabel}
              </div>
            )}
          </header>

          {loading ? (
            <div className={styles.additionalState} role="status">
              <LoaderCircle size={24} className="spin" aria-hidden="true" />
              <p>جاري تحميل بيانات الباقة...</p>
            </div>
          ) : error ? (
            <div className={styles.additionalState} role="alert">
              <AlertCircle size={28} />
              <p>{error}</p>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={retryFetch}
                style={{ marginTop: 14, paddingInline: 20 }}
              >
                إعادة المحاولة
                <RefreshCw size={15} />
              </button>
            </div>
          ) : !subscription ? (
            <div className={styles.additionalState}>
              <Wifi size={30} />
              <h2 style={{ marginTop: 12, color: "var(--text-primary)" }}>
                لا توجد باقة حالية
              </h2>
              <p style={{ marginTop: 8 }}>{emptyMessage}</p>
            </div>
          ) : (
            <>
              <section className={styles.mainCard}>
                <div className={styles.cardTop}>
                  <div className={styles.packageName}>
                    <div className={styles.packageIcon}>
                      <Wifi size={20} />
                    </div>

                    <div>
                      <span>الباقة الحالية</span>
                      <h2>{subscription.package_name || "باقة الإنترنت"}</h2>
                    </div>
                  </div>

                  {isActive && (
                    <div className={styles.active}>
                      <CheckCircle2 size={14} />
                      نشطة
                    </div>
                  )}
                </div>

                <div className={styles.usageArea}>
                  <div className={styles.usageVisual}>
                    <div
                      className={styles.progressCircle}
                      style={{ "--pct": 0 }}
                      aria-label="إجمالي سعة الباقة غير متاح"
                    >
                      <div className={styles.circleCenter}>
                        <strong>{usedGB ?? "—"}</strong>
                        <span>GB مستخدمة</span>
                        <small>إجمالي السعة غير متاح</small>
                      </div>
                    </div>

                    <div className={styles.usageCaption}>
                      <span className={styles.captionDot} />
                      الاستهلاك المسجل
                    </div>
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.statCard}>
                      <span>سرعة التحميل</span>
                      <strong>{downloadSpeed ?? "—"}</strong>
                      <small>Mbps</small>
                    </div>

                    <div className={styles.statCard}>
                      <span>سرعة التصفح</span>
                      <strong>{browsingSpeed ?? "—"}</strong>
                      <small>Mbps</small>
                    </div>

                    <div className={styles.statCard}>
                      <span>الاستهلاك</span>
                      <strong>{usedGB ?? "—"}</strong>
                      <small>GB مستخدمة</small>
                    </div>

                    <div className={styles.statCard}>
                      <span>الأيام المتبقية</span>
                      <strong
                        className={
                          subscription.days_remaining <= 3
                            ? styles.remaining
                            : ""
                        }
                      >
                        {subscription.days_remaining ?? "—"}
                      </strong>
                      <small>يوم</small>
                    </div>
                  </div>
                </div>

                <div className={styles.linearUsage}>
                  <div className={styles.linearHeader}>
                    <span>استهلاك الإنترنت</span>
                    <strong>
                      {usedGB != null ? `${usedGB} GB مستخدمة` : "غير متاح"}
                    </strong>
                  </div>

                  <p
                    style={{
                      marginTop: 12,
                      color: "var(--text-secondary)",
                      fontSize: 12,
                      lineHeight: 1.8,
                    }}
                  >
                    إجمالي سعة الباقة غير متوفر في بيانات الاشتراك الحالية؛ لذلك
                    لا يمكن تحديد نسبة الاستخدام أو المتبقي بدقة.
                  </p>
                </div>
              </section>

              {subscription.is_expiring_soon && (
                <div
                  role="status"
                  style={{
                    marginTop: 14,
                    padding: "13px 16px",
                    borderRadius: 12,
                    background: "var(--primary-light)",
                    color: "var(--text-primary)",
                    fontSize: 13,
                    lineHeight: 1.8,
                  }}
                >
                  <Clock3
                    size={17}
                    style={{
                      display: "inline",
                      verticalAlign: "middle",
                      marginLeft: 7,
                    }}
                  />
                  اشتراكك قرب ينتهي. يمكنك تجديد الباقة لتجنب انقطاع الخدمة.
                </div>
              )}

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
                      <strong>{formatDate(subscription.start_date)}</strong>
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <Clock3 size={18} />
                    </div>
                    <div>
                      <span>انتهاء الباقة</span>
                      <strong>{formatDate(subscription.end_date)}</strong>
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <RefreshCw size={18} />
                    </div>
                    <div>
                      <span>حالة الاشتراك</span>
                      <strong>{statusLabel}</strong>
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <Wifi size={18} />
                    </div>
                    <div>
                      <span>سرعة التحميل</span>
                      <strong>
                        {downloadSpeed != null
                          ? `${downloadSpeed} Mbps`
                          : "غير متاح"}
                      </strong>
                    </div>
                  </div>
                </div>
              </section>

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
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerPackage;
