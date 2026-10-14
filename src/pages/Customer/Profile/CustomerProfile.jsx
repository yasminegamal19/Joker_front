import {
  Bell,
  ChevronLeft,
  FileText,
  HelpCircle,
  KeyRound,
  LogOut,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/AppLayout/AppLayout";
import { clearToken } from "../../../lib/auth";
import styles from "./CustomerProfile.module.css";

const CustomerProfile = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>إعدادات الحساب</span>
              <h1>البروفايل</h1>
              <p>إدارة بيانات حسابك وإعدادات الخدمة الخاصة بك.</p>
            </div>
          </header>

          <section className={styles.profileCard}>
            <div className={styles.profileMain}>
              <div className={styles.avatar}>
                <UserRound size={30} />
              </div>

              <div className={styles.profileInfo}>
                <h2>ياسمين جمال</h2>
                <span>عميل جوكر</span>

                <div className={styles.serviceNumber}>
                  <span>رقم الخدمة</span>
                  <strong>+20 122 592 5175</strong>
                </div>
              </div>
            </div>

            <button type="button" className={styles.editButton}>
              <Pencil size={16} />
              تعديل البيانات
            </button>
          </section>

          <div className={styles.grid}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.sectionEyebrow}>
                    المعلومات الأساسية
                  </span>
                  <h2>بيانات الحساب</h2>
                </div>
              </div>

              <div className={styles.infoList}>
                <div className={styles.infoRow}>
                  <div className={styles.infoIcon}>
                    <UserRound size={18} />
                  </div>

                  <div>
                    <span>الاسم</span>
                    <strong>ياسمين جمال</strong>
                  </div>

                  <ChevronLeft size={17} />
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoIcon}>
                    <Phone size={18} />
                  </div>

                  <div>
                    <span>رقم الهاتف</span>
                    <strong dir="ltr">+20 122 592 5175</strong>
                  </div>

                  <ChevronLeft size={17} />
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoIcon}>
                    <MapPin size={18} />
                  </div>

                  <div>
                    <span>العنوان</span>
                    <strong>لم يتم إضافة عنوان</strong>
                  </div>

                  <ChevronLeft size={17} />
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoIcon}>
                    <FileText size={18} />
                  </div>

                  <div>
                    <span>رقم الخدمة</span>
                    <strong dir="ltr">JOK-102458</strong>
                  </div>

                  <ChevronLeft size={17} />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.sectionEyebrow}>
                    الأمان والإعدادات
                  </span>
                  <h2>إعدادات الحساب</h2>
                </div>
              </div>

              <div className={styles.settingsList}>
                <button type="button" className={styles.settingItem}>
                  <span className={`${styles.settingIcon} ${styles.blue}`}>
                    <KeyRound size={18} />
                  </span>

                  <span className={styles.settingText}>
                    <strong>تغيير كلمة المرور</strong>
                    <small>تحديث كلمة المرور الخاصة بحسابك</small>
                  </span>

                  <ChevronLeft size={17} />
                </button>

                <button type="button" className={styles.settingItem}>
                  <span className={`${styles.settingIcon} ${styles.green}`}>
                    <ShieldCheck size={18} />
                  </span>

                  <span className={styles.settingText}>
                    <strong>أمان الحساب</strong>
                    <small>إدارة إعدادات حماية الحساب</small>
                  </span>

                  <ChevronLeft size={17} />
                </button>

                <button
                  type="button"
                  className={styles.settingItem}
                  onClick={() => navigate("/customer/notifications")}
                >
                  <span className={`${styles.settingIcon} ${styles.orange}`}>
                    <Bell size={18} />
                  </span>

                  <span className={styles.settingText}>
                    <strong>الإشعارات</strong>
                    <small>إدارة ومتابعة إشعارات حسابك</small>
                  </span>

                  <ChevronLeft size={17} />
                </button>
              </div>
            </section>
          </div>

          <section className={styles.helpCard}>
            <div className={styles.helpIcon}>
              <HelpCircle size={21} />
            </div>

            <div className={styles.helpContent}>
              <strong>تحتاج إلى مساعدة؟</strong>
              <p>
                تواصل مع خدمة عملاء جوكر إذا كان لديك أي استفسار بخصوص الخدمة أو
                حسابك.
              </p>
            </div>

            <button type="button" className={styles.helpButton}>
              تواصل معنا
              <ChevronLeft size={16} />
            </button>
          </section>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={() => {
              clearToken();
              navigate("/customer/login", { replace: true });
            }}
          >
            <LogOut size={17} />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerProfile;
