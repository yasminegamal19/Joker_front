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
  speed: Gauge,
  location: MapPin,
  scissors: Scissors,
  router: Router,
  more: MoreHorizontal,
};

const getIssueIcon = (iconName) => {
  return issueIcons[iconName] || Wrench;
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

// الأيام المتاحة للحجز: اليوم + اليومين القادمين (بتتحسب من تاريخ النهاردة)
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
    return { ...day, date: dateFormatter.format(date) };
  });

const MaintenanceRequest = () => {
  const navigate = useNavigate();

  const days = useMemo(buildDays, []);
  const [problems, setProblems] = useState([]);
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [problemsError, setProblemsError] = useState("");

  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fetchIssueTypes = async () => {
    try {
      setLoadingProblems(true);
      setProblemsError("");

      const response = await apiClient.get(
        "/maintenance-requests/issue-types"
      );

      const issueTypes = response.data?.issue_types;

      if (!Array.isArray(issueTypes)) {
        throw new Error("صيغة البيانات المستلمة غير صحيحة.");
      }

      setProblems(issueTypes);
    } catch (error) {
      console.error("Failed to fetch maintenance issue types:", error);

      // رسالة السيرفر (لو موجودة) أو رسالة عربية ثابتة — مش بنعرض رسائل الشبكة الإنجليزية للعميل
      setProblemsError(
        error.response?.data?.message ||
          "تعذر تحميل أنواع مشاكل الصيانة. حاول مرة أخرى."
      );
    } finally {
      setLoadingProblems(false);
    }
  };

  useEffect(() => {
    fetchIssueTypes();
  }, []);

  const canSubmit =
    selectedProblem !== "" &&
    selectedPeriod !== "" &&
    selectedDay !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;

    setSubmitted(true);
  };

  if (submitted) {
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
                تم استلام طلب الصيانة الخاص بك، وسيقوم فريق جوكر
                بمراجعة الطلب وتحديد الفني المناسب.
              </p>

              <div className={styles.requestNumber}>
                <span>رقم الطلب</span>
                <strong>JOK-MNT-10245</strong>
              </div>

              <div className={styles.nextSteps}>
                <div className={styles.nextStep}>
                  <span className={styles.stepNumber}>1</span>
                  <div>
                    <strong>مراجعة الطلب</strong>
                    <p>يتم الآن مراجعة تفاصيل طلبك.</p>
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
                    <p>سيصلك إشعار بموعد الزيارة.</p>
                  </div>
                </div>
              </div>

              <div className={styles.successActions}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/customer/notifications")}
                >
                  متابعة الإشعارات
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
              <p>
                أخبرنا بالمشكلة وسنساعدك في تحديد موعد مناسب لزيارة الفني.
              </p>
            </div>
          </header>

          <div className={styles.layout}>
            <main className={styles.formCard}>
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
                    <LoaderCircle
                      size={24}
                      className={styles.loadingIcon}
                    />
                    <span>جاري تحميل أنواع مشاكل الصيانة...</span>
                  </div>
                ) : problemsError ? (
                  <div
                    className={styles.problemsStatus}
                    role="alert"
                  >
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
                        onClick={() => setSelectedProblem(problem.id)}
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
                    >
                      <span className={styles.periodIcon}>
                        {period.icon}
                      </span>

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
                <span className={styles.stepBadge}>3</span>
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

              <div className={styles.submitArea}>
                <button
                  type="button"
                  className={`btn btn-primary ${styles.submitButton}`}
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  إرسال طلب الصيانة
                  <ChevronLeft size={17} />
                </button>

                {!canSubmit && (
                  <span>اختر المشكلة والفترة واليوم أولًا.</span>
                )}
              </div>
            </main>

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
                  <p>يمكنك متابعة الفني والتواصل معه من التطبيق.</p>
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
                <span>
                  مواعيد الصيانة متاحة اليوم وغدًا وبعد غد فقط.
                </span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MaintenanceRequest;

