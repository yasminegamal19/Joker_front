import {
  ArrowRight,
  Check,
  ChevronLeft,
  Clock3,
  MessageCircle,
  Navigation,
  Phone,
  UserRound,
  Wrench,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import AppLayout from "../../../components/AppLayout/AppLayout";
import apiClient from "../../../lib/apiClient";
import { supportTelHref, supportWhatsAppHref } from "../../../lib/support";
import styles from "./MaintenanceTracking.module.css";

const MOCK_TECHNICIAN_NAME = "أحمد محمد";

const statusConfig = {
  pending: {
    label: "قيد المراجعة",
    activeStep: 0,
  },
  submitted: {
    label: "تم إرسال الطلب",
    activeStep: 0,
  },
  assigned: {
    label: "تم تعيين الفني",
    activeStep: 1,
  },
  accepted: {
    label: "تم تعيين الفني",
    activeStep: 1,
  },
  in_progress: {
    label: "جاري تنفيذ الصيانة",
    activeStep: 2,
  },
  on_the_way: {
    label: "الفني في الطريق",
    activeStep: 2,
  },
  completed: {
    label: "اكتملت الصيانة",
    activeStep: 3,
  },
  resolved: {
    label: "اكتملت الصيانة",
    activeStep: 3,
  },
  cancelled: {
    label: "تم إلغاء الطلب",
    activeStep: -1,
  },
};

const normalizeStatus = (status) =>
  String(status || "pending")
    .trim()
    .toLowerCase()
    .replaceAll("-", "_")
    .replaceAll(" ", "_");

const getErrorMessage = (error) => {
  const status = error.response?.status;

  if (status === 401 || status === 403) {
    return "تعذر الوصول إلى تفاصيل الطلب بسبب مشكلة في تسجيل الدخول أو الصلاحيات.";
  }

  if (status === 404) {
    return "طلب الصيانة غير موجود أو لم يعد متاحًا.";
  }

  return (
    error.response?.data?.message ||
    "تعذر تحميل تفاصيل طلب الصيانة. حاول مرة أخرى."
  );
};

const buildSteps = (status) => {
  const normalizedStatus = normalizeStatus(status);
  const config = statusConfig[normalizedStatus] || {
    label: "قيد المراجعة",
    activeStep: 0,
  };

  const titles = [
    {
      title: "تم إرسال الطلب",
      description: "تم استلام طلب الصيانة",
    },
    {
      title: "تم تعيين الفني",
      description: "تم تحديد الفني المسؤول عن الطلب",
    },
    {
      title: "الفني في الطريق",
      description: "متابعة حالة الزيارة",
    },
    {
      title: "اكتمال الصيانة",
      description: "تم الانتهاء من أعمال الصيانة",
    },
  ];

  return {
    config,
    steps: titles.map((step, index) => ({
      ...step,
      done: config.activeStep >= 0 && index < config.activeStep,
      active: index === config.activeStep,
    })),
  };
};

const MaintenanceTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestIdFromUrl = searchParams.get("requestId");

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestError, setRequestError] = useState("");
const [retryKey, setRetryKey] = useState(0);


  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setRequestError("");

      try {
        let requestId = requestIdFromUrl;

        if (!requestId) {
          const listResponse = await apiClient.get("/maintenance-requests");

          const requests = listResponse.data?.requests;

          if (!Array.isArray(requests) || requests.length === 0) {
            throw new Error("NO_MAINTENANCE_REQUESTS");
          }

          const latestRequest = [...requests].sort(
            (a, b) =>
              new Date(b.created_at || 0).getTime() -
              new Date(a.created_at || 0).getTime(),
          )[0];

          requestId = latestRequest.id;
        }

        if (!requestId) {
          throw new Error("MISSING_MAINTENANCE_REQUEST_ID");
        }

        const response = await apiClient.get(
          `/maintenance-requests/${encodeURIComponent(requestId)}`,
        );

        if (!response.data?.request) {
          throw new Error("INVALID_MAINTENANCE_RESPONSE");
        }

        if (!cancelled) {
          setRequest(response.data.request);
        }
      } catch (error) {
        console.error("Failed to fetch maintenance request:", error);

        if (!cancelled) {
          setRequest(null);

          setRequestError(
            error.message === "NO_MAINTENANCE_REQUESTS"
              ? "لا توجد طلبات صيانة لعرضها حاليًا."
              : getErrorMessage(error),
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
}, [requestIdFromUrl, retryKey]);

  const issueType = request?.issue_type;
  const technician = request?.technician;
  const technicianName = technician?.user?.name || MOCK_TECHNICIAN_NAME;

  const { config, steps } = buildSteps(request?.status);

  const formatDate = (value) => {
    if (!value) return "غير متاح";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "غير متاح";

    return new Intl.DateTimeFormat("ar-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <header className={styles.header}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate("/customer/maintenance")}
            >
              <ArrowRight size={17} />
              العودة لطلبات الصيانة
            </button>

            <div className={styles.titleRow}>
              <div>
                <span className={styles.eyebrow}>متابعة طلب الصيانة</span>
                <h1>{loading ? "جاري تحميل تفاصيل الطلب..." : config.label}</h1>
                <p>يمكنك متابعة حالة الطلب وبيانات الفني المتاحة.</p>
              </div>

              {request && (
                <span className={styles.statusBadge}>
                  <span />
                  {config.label}
                </span>
              )}
            </div>
          </header>

          {requestError && (
            <div className={styles.trackingNotice} role="alert">
              <AlertCircle size={20} />
              <span>{requestError}</span>

              <button
                type="button"
                className={styles.retryButton}
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={15} />
                إعادة المحاولة
              </button>
            </div>
          )}

          {loading && (
            <div className={styles.loadingState}>
              <LoaderCircle size={28} className={styles.trackingSpinner} />
              <span>جاري تحميل بيانات طلب الصيانة...</span>
            </div>
          )}

          {!loading && request && (
            <>
              <div className={styles.layout}>
                <main>
                  <section className={styles.mapCard}>
                    <div className={styles.mapHeader}>
                      <div>
                        <span>التتبع المباشر</span>
                        <strong>موقع الفني</strong>
                      </div>

                      <div className={styles.liveBadge}>
                        <span />
                        بيانات تجريبية
                      </div>
                    </div>

                    <div className={styles.map}>
                      <div className={styles.mapGrid} />

                      <div className={styles.routeLine} />

                      <div className={styles.homeMarker}>
                        <span>
                          <Navigation size={18} />
                        </span>
                        <strong>موقعك</strong>
                      </div>

                      <div className={styles.technicianMarker}>
                        <span>
                          <Wrench size={17} />
                        </span>
                        <div>
                          <strong>{technicianName}</strong>
                          <small>الفني</small>
                        </div>
                      </div>

                      <div className={styles.mapControls}>
                        <button type="button" aria-label="تكبير الخريطة">
                          +
                        </button>
                        <button type="button" aria-label="تصغير الخريطة">
                          −
                        </button>
                      </div>

                      <div className={styles.eta}>
                        <Clock3 size={16} />
                        <div>
                          <span>الوقت المتوقع للوصول</span>
                          <strong>25 دقيقة</strong>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className={styles.timelineCard}>
                    <div className={styles.cardHeader}>
                      <div>
                        <span className={styles.sectionEyebrow}>
                          حالة الطلب
                        </span>
                        <h2>مراحل طلب الصيانة</h2>
                      </div>

                      <span className={styles.requestId}>{request.id}</span>
                    </div>

                    <div className={styles.timeline}>
                      {steps.map((step, index) => (
                        <div
                          key={step.title}
                          className={`${styles.timelineItem} ${
                            step.active ? styles.timelineActive : ""
                          }`}
                        >
                          <div className={styles.timelineIndicator}>
                            {step.done ? (
                              <Check size={13} />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>

                          {index < steps.length - 1 && (
                            <div
                              className={`${styles.timelineLine} ${
                                step.done ? styles.lineDone : ""
                              }`}
                            />
                          )}

                          <div className={styles.timelineContent}>
                            <strong>{step.title}</strong>
                            <span>{step.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {request.completed_at && (
                      <p className={styles.completedDate}>
                        تاريخ اكتمال الصيانة: {formatDate(request.completed_at)}
                      </p>
                    )}
                  </section>
                </main>

                <aside className={styles.sidebar}>
                  <section className={styles.technicianCard}>
                    <div className={styles.cardHeader}>
                      <div>
                        <span className={styles.sectionEyebrow}>
                          الفني المسؤول
                        </span>
                        <h2>بيانات الفني</h2>
                      </div>
                    </div>

                    <div className={styles.technicianInfo}>
                      <div className={styles.avatar}>
                        <UserRound size={24} />
                      </div>

                      <div>
                        <strong>{technicianName}</strong>
                        <span>
                          {technician
                            ? `منطقة الخدمة: ${technician.area || "غير محددة"}`
                            : "بيانات الفني مؤقتة"}
                        </span>
                      </div>

                      {technician && (
                        <span className={styles.verified}>
                          <Check size={12} />
                        </span>
                      )}
                    </div>

                    <div className={styles.visitInfo}>
                      <div>
                        <Clock3 size={16} />
                        <span>
                          <small>تاريخ إنشاء الطلب</small>
                          <strong>{formatDate(request.created_at)}</strong>
                        </span>
                      </div>

                      <div>
                        <Navigation size={16} />
                        <span>
                          <small>المسافة</small>
                          <strong>2.4 كم تقريبًا</strong>
                        </span>
                      </div>
                    </div>

                    <div className={styles.contactActions}>
                      {supportTelHref ? (
                        <a href={supportTelHref}>
                          <Phone size={16} />
                          اتصال بالدعم
                        </a>
                      ) : (
                        <button type="button" disabled>
                          <Phone size={16} />
                          اتصال
                        </button>
                      )}

                      {supportWhatsAppHref ? (
                        <a
                          href={supportWhatsAppHref}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.chatButton}
                        >
                          <MessageCircle size={16} />
                          واتساب
                        </a>
                      ) : (
                        <button
                          type="button"
                          className={styles.chatButton}
                          disabled
                        >
                          <MessageCircle size={16} />
                          واتساب
                        </button>
                      )}
                    </div>
                  </section>

                  <section className={styles.problemCard}>
                    <div className={styles.problemIcon}>
                      <Wrench size={18} />
                    </div>

                    <div>
                      <span>نوع المشكلة</span>
                      <strong>{issueType?.label || "غير محدد"}</strong>

                      {request.description && (
                        <p className={styles.requestDescription}>
                          {request.description}
                        </p>
                      )}
                    </div>
                  </section>

                  <button
                    type="button"
                    className={styles.homeButton}
                    onClick={() => navigate("/customer/home")}
                  >
                    العودة للرئيسية
                    <ChevronLeft size={16} />
                  </button>
                </aside>
              </div>
            </>
          )}

          {!loading && !request && !requestError && (
            <div className={styles.trackingNotice}>
              لم يتم العثور على بيانات الطلب.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default MaintenanceTracking;
