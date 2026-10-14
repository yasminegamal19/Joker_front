import {
  ArrowRight,
  Check,
  ChevronLeft,
  Clock3,
  Gauge,
  MapPin,
  MoreHorizontal,
  Router,
  Scissors,
  WifiOff,
  Wrench,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../../../lib/apiClient";
import AppLayout from "../../../components/AppLayout/AppLayout";
import styles from "./MaintenanceRequest.module.css";

const issueIcons = {
  "wifi-off": WifiOff,
  wifi_off: WifiOff,
  speed: Gauge,
  location: MapPin,
  scissors: Scissors,
  router: Router,
  more: MoreHorizontal,
};

const getIssueIcon = (iconName) => {
  const normalizedName = String(iconName || "")
    .replaceAll("_", "-")
    .toLowerCase();

  return issueIcons[normalizedName] || Wrench;
};

const periods = [
  {
    id: "morning",
    title: "الفترة الصباحية",
    time: "من 9:00 ص إلى 1:00 م",
    icon: "☀",
  },
  {
    id: "evening",
    title: "الفترة المسائية",
    time: "من 4:00 م إلى 8:00 م",
    icon: "◐",
  },
];

const dateFormatter = new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
  day: "numeric",
  month: "long",
});

const buildDays = () =>
  [
    { id: "today", label: "اليوم" },
    { id: "tomorrow", label: "غدًا" },
    { id: "after", label: "بعد غد" },
  ].map((day, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    return {
      ...day,
      date: dateFormatter.format(date),
    };
  });

const getErrorMessage = (error, fallback) => {
  const status = error.response?.status;

  if (status === 401 || status === 403) {
    return "تعذر تنفيذ الطلب بسبب مشكلة في تسجيل الدخول أو الصلاحيات. سجّل الدخول مرة أخرى وحاول مجددًا.";
  }

  return error.response?.data?.message || fallback;
};

const MaintenanceRequest = () => {
  const navigate = useNavigate();
  const days = useMemo(buildDays, []);

  const [problems, setProblems] = useState([]);
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [problemsError, setProblemsError] = useState("");

  const [selectedProblem, setSelectedProblem] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [createdRequest, setCreatedRequest] = useState(null);

  const [latestRequest, setLatestRequest] = useState(null);
  const [loadingLatestRequest, setLoadingLatestRequest] = useState(true);
  const [latestRequestError, setLatestRequestError] = useState("");

  const fetchIssueTypes = async () => {
    try {
      setLoadingProblems(true);
      setProblemsError("");

      const response = await apiClient.get("/maintenance-requests/issue-types");

      const issueTypes = response.data?.issue_types;

      if (!Array.isArray(issueTypes)) {
        throw new Error("صيغة البيانات المستلمة غير صحيحة.");
      }

      setProblems(issueTypes);
    } catch (error) {
      console.error("Failed to fetch maintenance issue types:", error);

      setProblemsError(
        getErrorMessage(
          error,
          "تعذر تحميل أنواع مشاكل الصيانة. حاول مرة أخرى.",
        ),
      );
    } finally {
      setLoadingProblems(false);
    }
  };

  const fetchLatestRequest = async () => {
    try {
      setLoadingLatestRequest(true);
      setLatestRequestError("");

      const response = await apiClient.get("/maintenance-requests");
      const requests = response.data?.requests;

      if (!Array.isArray(requests)) {
        throw new Error("تعذر قراءة قائمة الطلبات.");
      }

      const sortedRequests = [...requests].sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime(),
      );

      setLatestRequest(sortedRequests[0] || null);
    } catch (error) {
      console.error("Failed to fetch latest maintenance request:", error);
      setLatestRequestError(
        error.response?.data?.message ||
          "تعذر تحميل طلب الصيانة السابق حاليًا.",
      );
    } finally {
      setLoadingLatestRequest(false);
    }
  };

  useEffect(() => {
    fetchIssueTypes();
    fetchLatestRequest();
  }, []);

  const canSubmit =
    selectedProblem !== "" &&
    description.trim().length > 0 &&
    selectedPeriod !== "" &&
    selectedDay !== "" &&
    !submitting;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) return;

    try {
      setSubmitting(true);
      setSubmitError("");

      const response = await apiClient.post("/maintenance-requests", {
        issue_type_id: Number(selectedProblem),
        description: description.trim(),
      });

      const request =
        response.data?.request || response.data?.maintenance_request || null;

      const requestId =
        request?.id ?? response.data?.id ?? response.data?.request_id ?? null;

      setCreatedRequest({
        id: requestId,
        issueType:
          request?.issue_type ||
          problems.find(
            (problem) => String(problem.id) === String(selectedProblem),
          ),
        description: request?.description || description.trim(),
        status: request?.status || "pending",
        createdAt: request?.created_at || null,
      });
    } catch (error) {
      console.error("Failed to create maintenance request:", error);

      setSubmitError(
        getErrorMessage(
          error,
          "تعذر إرسال طلب الصيانة. راجع البيانات وحاول مرة أخرى.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openLatestTracking = () => {
    if (!latestRequest?.id) return;

    navigate(
      `/customer/maintenance/tracking?requestId=${encodeURIComponent(
        latestRequest.id,
      )}`,
    );
  };

  const openTracking = () => {
    const requestId = createdRequest?.id;

    navigate(
      requestId
        ? `/customer/maintenance/tracking?requestId=${encodeURIComponent(requestId)}`
        : "/customer/maintenance/tracking",
    );
  };

  if (createdRequest) {
    return (
      <AppLayout>
        <div className={styles.page}>
          <div className={`container ${styles.container}`}>
            <section className={styles.successCard}>
              <div className={styles.successIcon}>
                <Check size={32} />
              </div>

              <span className={styles.successEyebrow}>
                تم إرسال الطلب بنجاح
              </span>

              <h1>طلب الصيانة قيد المراجعة</h1>

              <p>
                تم استلام طلب الصيانة الخاص بك، ويمكنك متابعة حالته من صفحة
                متابعة الطلب.
              </p>

              <div className={styles.requestNumber}>
                <span>رقم الطلب</span>
                <strong>{createdRequest.id ?? "تم استلام الطلب"}</strong>
              </div>

              <div className={styles.nextSteps}>
                <div className={styles.nextStep}>
                  <span className={styles.stepNumber}>1</span>
                  <div>
                    <strong>مراجعة الطلب</strong>
                    <p>يتم مراجعة تفاصيل طلبك.</p>
                  </div>
                </div>

                <div className={styles.nextStep}>
                  <span className={styles.stepNumber}>2</span>
                  <div>
                    <strong>تحديد الفني</strong>
                    <p>سيتم تعيين فني مناسب للطلب.</p>
                  </div>
                </div>

                <div className={styles.nextStep}>
                  <span className={styles.stepNumber}>3</span>
                  <div>
                    <strong>إشعارك بالموعد</strong>
                    <p>تابع تحديثات طلب الصيانة.</p>
                  </div>
                </div>
              </div>

              <div className={styles.successActions}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openTracking}
                >
                  متابعة طلب الصيانة
                  <ChevronLeft size={17} />
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate("/customer/home")}
                >
                  العودة للرئيسية
                </button>
              </div>
            </section>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <header className={styles.header}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate("/customer/home")}
            >
              <ArrowRight size={17} />
              العودة للرئيسية
            </button>

            <div>
              <span className={styles.eyebrow}>الدعم والصيانة</span>
              <h1>طلب صيانة</h1>
              <p>أخبرنا بالمشكلة وسنساعدك في تحديد موعد مناسب لزيارة الفني.</p>
            </div>
          </header>

          {loadingLatestRequest ? (
            <div className={styles.latestRequestLoading}>
              <LoaderCircle size={18} className={styles.loadingIcon} />
              <span>جاري التحقق من طلبات الصيانة السابقة...</span>
            </div>
          ) : latestRequest ? (
            <section className={styles.latestRequestCard}>
              <div className={styles.latestRequestIcon}>
                <Wrench size={21} />
              </div>

              <div className={styles.latestRequestInfo}>
                <span className={styles.latestRequestEyebrow}>
                  لديك طلب صيانة سابق
                </span>

                <h2>{latestRequest.issue_type?.label || "طلب صيانة"}</h2>

                <p>
                  رقم الطلب: {latestRequest.id}
                  {latestRequest.created_at && (
                    <>
                      {" · "}
                      {new Intl.DateTimeFormat("ar-EG", {
                        dateStyle: "medium",
                      }).format(new Date(latestRequest.created_at))}
                    </>
                  )}
                </p>

                <span className={styles.latestRequestStatus}>
                  {{
                    pending: "قيد المراجعة",
                    submitted: "تم إرسال الطلب",
                    assigned: "تم تعيين الفني",
                    accepted: "تم تعيين الفني",
                    on_the_way: "الفني في الطريق",
                    in_progress: "جاري تنفيذ الصيانة",
                    completed: "اكتملت الصيانة",
                    resolved: "اكتملت الصيانة",
                    cancelled: "تم إلغاء الطلب",
                  }[
                    String(latestRequest.status || "pending")
                      .toLowerCase()
                      .replaceAll("-", "_")
                      .replaceAll(" ", "_")
                  ] || "حالة الطلب قيد التحديث"}
                </span>
              </div>

              <button
                type="button"
                className={styles.latestRequestButton}
                onClick={openLatestTracking}
              >
                متابعة الطلب
                <ChevronLeft size={17} />
              </button>
            </section>
          ) : latestRequestError ? (
            <div className={styles.latestRequestNotice} role="alert">
              <AlertCircle size={18} />
              <span>{latestRequestError}</span>

              <button type="button" onClick={fetchLatestRequest}>
                إعادة المحاولة
              </button>
            </div>
          ) : null}

          <div className={styles.layout}>
            <form className={styles.formCard} onSubmit={handleSubmit}>
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>1</span>
                <div>
                  <h2>ما المشكلة التي تواجهها؟</h2>
                  <p>اختر نوع المشكلة الأقرب لحالتك.</p>
                </div>
              </div>

              <div className={styles.problemsGrid}>
                {loadingProblems ? (
                  <div className={styles.problemsStatus}>
                    <LoaderCircle size={24} className={styles.loadingIcon} />
                    <span>جاري تحميل أنواع مشاكل الصيانة...</span>
                  </div>
                ) : problemsError ? (
                  <div className={styles.problemsStatus} role="alert">
                    <AlertCircle size={24} />
                    <span>{problemsError}</span>

                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={fetchIssueTypes}
                      disabled={loadingProblems}
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                ) : problems.length === 0 ? (
                  <div className={styles.problemsStatus}>
                    لا توجد أنواع مشاكل متاحة حاليًا.
                  </div>
                ) : (
                  problems.map((problem) => {
                    const Icon = getIssueIcon(problem.icon);
                    const isSelected =
                      String(selectedProblem) === String(problem.id);

                    return (
                      <button
                        key={problem.id}
                        type="button"
                        className={`${styles.problemCard} ${
                          isSelected ? styles.selected : ""
                        }`}
                        onClick={() => setSelectedProblem(String(problem.id))}
                        aria-pressed={isSelected}
                      >
                        <span className={styles.problemIcon}>
                          <Icon size={21} />
                        </span>

                        <span className={styles.problemContent}>
                          <strong>{problem.label}</strong>
                          <small>{problem.description}</small>
                        </span>

                        <span className={styles.radio}>
                          {isSelected && <Check size={12} />}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              <div className={styles.divider} />

              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>2</span>
                <div>
                  <h2>اشرح المشكلة بالتفصيل</h2>
                  <p>ساعدنا في فهم المشكلة لتسهيل عملية الصيانة.</p>
                </div>
              </div>

              <div className={styles.descriptionField}>
                <label
                  className={styles.fieldLabel}
                  htmlFor="maintenance-description"
                >
                  وصف المشكلة
                </label>

                <textarea
                  id="maintenance-description"
                  className={styles.descriptionInput}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="مثال: الإنترنت توقف عن العمل منذ الصباح..."
                  rows={4}
                  maxLength={1000}
                  required
                />

                <span className={styles.descriptionCounter}>
                  {description.length}/1000
                </span>
              </div>

              <div className={styles.divider} />

              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>3</span>
                <div>
                  <h2>اختر الفترة المناسبة</h2>
                  <p>حدد الوقت الذي يناسبك لاستقبال الفني.</p>
                </div>
              </div>

              <div className={styles.periodGrid}>
                {periods.map((period) => {
                  const isSelected = selectedPeriod === period.id;

                  return (
                    <button
                      key={period.id}
                      type="button"
                      className={`${styles.periodCard} ${
                        isSelected ? styles.selected : ""
                      }`}
                      onClick={() => setSelectedPeriod(period.id)}
                      aria-pressed={isSelected}
                    >
                      <span className={styles.periodIcon}>{period.icon}</span>

                      <span>
                        <strong>{period.title}</strong>
                        <small>{period.time}</small>
                      </span>

                      <span className={styles.radio}>
                        {isSelected && <Check size={12} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.divider} />

              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>4</span>
                <div>
                  <h2>اختر اليوم</h2>
                  <p>يمكنك اختيار اليوم أو اليومين القادمين.</p>
                </div>
              </div>

              <div className={styles.daysGrid}>
                {days.map((day) => {
                  const isSelected = selectedDay === day.id;

                  return (
                    <button
                      key={day.id}
                      type="button"
                      className={`${styles.dayCard} ${
                        isSelected ? styles.selected : ""
                      }`}
                      onClick={() => setSelectedDay(day.id)}
                      aria-pressed={isSelected}
                    >
                      <span>{day.label}</span>
                      <strong>{day.date}</strong>

                      {isSelected && (
                        <span className={styles.dayCheck}>
                          <Check size={13} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {submitError && (
                <div className={styles.submitError} role="alert">
                  <AlertCircle size={18} />
                  <span>{submitError}</span>
                </div>
              )}

              <div className={styles.submitArea}>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submitButton}`}
                  disabled={!canSubmit}
                >
                  {submitting ? (
                    <>
                      <LoaderCircle size={17} className={styles.loadingIcon} />
                      جاري إرسال الطلب...
                    </>
                  ) : (
                    <>
                      إرسال طلب الصيانة
                      <ChevronLeft size={17} />
                    </>
                  )}
                </button>

                {!canSubmit && !submitting && (
                  <span>
                    اختر المشكلة واكتب وصفها وحدد الفترة واليوم أولًا.
                  </span>
                )}
              </div>
            </form>

            <aside className={styles.sideCard}>
              <div className={styles.sideIcon}>
                <Wrench size={21} />
              </div>

              <h2>كيف تعمل الصيانة؟</h2>

              <div className={styles.sideSteps}>
                <div>
                  <span>01</span>
                  <p>أرسل تفاصيل المشكلة وحدد الموعد المناسب.</p>
                </div>

                <div>
                  <span>02</span>
                  <p>يقوم فريق جوكر بمراجعة الطلب وتعيين الفني.</p>
                </div>

                <div>
                  <span>03</span>
                  <p>يصلك إشعار ببيانات الفني وموعد الزيارة.</p>
                </div>

                <div>
                  <span>04</span>
                  <p>يمكنك متابعة حالة طلبك من صفحة المتابعة.</p>
                </div>
              </div>

              <div className={styles.locationBox}>
                <MapPin size={17} />
                <div>
                  <span>موقع الخدمة</span>
                  <strong>سيتم استخدام عنوان الخدمة المسجل</strong>
                </div>
              </div>

              <div className={styles.timeBox}>
                <Clock3 size={17} />
                <span>مواعيد الصيانة متاحة اليوم وغدًا وبعد غد فقط.</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MaintenanceRequest;
