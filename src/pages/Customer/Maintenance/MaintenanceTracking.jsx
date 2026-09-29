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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/AppLayout/AppLayout";
import styles from "./MaintenanceTracking.module.css";

const steps = [
  {
    title: "تم إرسال الطلب",
    description: "تم استلام طلب الصيانة",
    done: true,
  },
  {
    title: "تم تعيين الفني",
    description: "تم تعيين أحمد محمد للطلب",
    done: true,
  },
  {
    title: "الفني في الطريق",
    description: "الفني متجه إلى موقعك",
    active: true,
  },
  {
    title: "اكتمال الصيانة",
    description: "سيتم تحديث الحالة بعد انتهاء الزيارة",
    done: false,
  },
];

const MaintenanceTracking = () => {
  const navigate = useNavigate();

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

            <div className={styles.titleRow}>
              <div>
                <span className={styles.eyebrow}>متابعة طلب الصيانة</span>
                <h1>الفني في الطريق إليك</h1>
                <p>يمكنك متابعة حالة طلب الصيانة والتواصل مع الفني.</p>
              </div>

              <span className={styles.statusBadge}>
                <span />
                جاري التنفيذ
              </span>
            </div>
          </header>

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
                    مباشر
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
                      <strong>أحمد محمد</strong>
                      <small>الفني</small>
                    </div>
                  </div>

                  <div className={styles.mapControls}>
                    <button type="button">+</button>
                    <button type="button">−</button>
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
                    <span className={styles.sectionEyebrow}>حالة الطلب</span>
                    <h2>مراحل طلب الصيانة</h2>
                  </div>

                  <span className={styles.requestId}>JOK-MNT-10245</span>
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
              </section>
            </main>

            <aside className={styles.sidebar}>
              <section className={styles.technicianCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.sectionEyebrow}>الفني المسؤول</span>
                    <h2>بيانات الفني</h2>
                  </div>
                </div>

                <div className={styles.technicianInfo}>
                  <div className={styles.avatar}>
                    <UserRound size={24} />
                  </div>

                  <div>
                    <strong>أحمد محمد</strong>
                    <span>فني صيانة</span>
                  </div>

                  <span className={styles.verified}>
                    <Check size={12} />
                  </span>
                </div>

                <div className={styles.visitInfo}>
                  <div>
                    <Clock3 size={16} />
                    <span>
                      <small>موعد الزيارة</small>
                      <strong>اليوم، 4:00 - 8:00 م</strong>
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
                  <button type="button">
                    <Phone size={16} />
                    اتصال
                  </button>

                  <button
                    type="button"
                    className={styles.chatButton}
                    onClick={() => navigate("/customer/chat")}
                  >
                    <MessageCircle size={16} />
                    محادثة
                  </button>
                </div>
              </section>

              <section className={styles.problemCard}>
                <div className={styles.problemIcon}>
                  <Wrench size={18} />
                </div>

                <div>
                  <span>نوع المشكلة</span>
                  <strong>بطء الإنترنت</strong>
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
        </div>
      </div>
    </AppLayout>
  );
};

export default MaintenanceTracking;
