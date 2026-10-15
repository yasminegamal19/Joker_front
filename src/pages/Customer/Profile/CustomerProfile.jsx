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
  Wallet,
  Mail,
  RefreshCw,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/AppLayout/AppLayout";
import apiClient from "../../../lib/apiClient";
import { clearToken } from "../../../lib/auth";
import styles from "./CustomerProfile.module.css";

const formatBalance = (balance) =>
  new Intl.NumberFormat("ar-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(balance ?? 0));

const CustomerProfile = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.get("/me");
      const data = response?.data ?? response;

      if (!data?.customer) {
        throw new Error("لم نتمكن من تحميل بيانات الحساب.");
      }

      setCustomer(data.customer);
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401) {
        setError("انتهت جلسة تسجيل الدخول أو أن بيانات التوثيق غير صالحة.");
      } else {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "حدث خطأ أثناء تحميل بيانات الحساب.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = () => {
    clearToken();
    navigate("/customer/login", { replace: true });
  };

  const statusLabels = {
    active: "نشط",
    inactive: "غير نشط",
    suspended: "موقوف",
    pending: "قيد المراجعة",
  };

  const fullName = customer?.name || "—";

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

          {loading ? (
            <div className={styles.profileState} role="status">
              <LoaderCircle size={28} className={styles.loadingIcon} />
              <p>جاري تحميل بيانات حسابك...</p>
            </div>
          ) : error ? (
            <div className={styles.profileError} role="alert">
              <AlertCircle size={23} />
              <div className={styles.profileErrorContent}>
                <strong>تعذر تحميل البروفايل</strong>
                <p>{error}</p>
                <button
                  type="button"
                  className={styles.retryButton}
                  onClick={fetchProfile}
                >
                  <RefreshCw size={15} />
                  إعادة المحاولة
                </button>
              </div>
            </div>
          ) : (
            <>
              <section className={styles.profileCard}>
                <div className={styles.profileMain}>
                  <div className={styles.avatar}>
                    <UserRound size={30} />
                  </div>

                  <div className={styles.profileInfo}>
                    <h2>{fullName}</h2>
                    <span>عميل جوكر</span>

                    <div className={styles.serviceNumber}>
                      <span>كود العميل</span>
                      <strong dir="ltr">{customer.customer_code || "—"}</strong>
                    </div>
                  </div>
                </div>

                <div className={styles.profileActions}>
                  <span
                    className={`${styles.accountStatus} ${
                      customer.status === "active" ? styles.activeStatus : ""
                    }`}
                  >
                    <span className={styles.statusDot} />
                    {statusLabels[customer.status] ||
                      customer.status ||
                      "غير محدد"}
                  </span>

                  <button
                    type="button"
                    className={styles.editButton}
                    disabled
                    title="تعديل البيانات غير متاح حاليًا"
                  >
                    <Pencil size={16} />
                    تعديل البيانات
                  </button>
                </div>
              </section>

              <section className={styles.balanceCard}>
                <div className={styles.balanceIcon}>
                  <Wallet size={22} />
                </div>
                <div className={styles.balanceInfo}>
                  <span>رصيد المحفظة</span>
                  <strong>
                    {formatBalance(customer.wallet_balance)} <small>جنيه</small>
                  </strong>
                </div>
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
                      <div className={styles.infoText}>
                        <span>الاسم</span>
                        <strong>{customer.name || "غير متوفر"}</strong>
                      </div>
                      <ChevronLeft size={17} />
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoIcon}>
                        <Phone size={18} />
                      </div>
                      <div className={styles.infoText}>
                        <span>رقم الهاتف الأساسي</span>
                        <strong dir="ltr">
                          {customer.phone || "غير متوفر"}
                        </strong>
                      </div>
                      <ChevronLeft size={17} />
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoIcon}>
                        <Phone size={18} />
                      </div>
                      <div className={styles.infoText}>
                        <span>رقم الهاتف الإضافي</span>
                        <strong dir="ltr">
                          {customer.phone_secondary || "غير مضاف"}
                        </strong>
                      </div>
                      <ChevronLeft size={17} />
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoIcon}>
                        <Mail size={18} />
                      </div>
                      <div className={styles.infoText}>
                        <span>البريد الإلكتروني</span>
                        <strong dir="ltr">
                          {customer.email || "غير مضاف"}
                        </strong>
                      </div>
                      <ChevronLeft size={17} />
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoIcon}>
                        <MapPin size={18} />
                      </div>
                      <div className={styles.infoText}>
                        <span>العنوان</span>
                        <strong>
                          {customer.address || "لم يتم إضافة عنوان"}
                        </strong>
                      </div>
                      <ChevronLeft size={17} />
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoIcon}>
                        <MapPin size={18} />
                      </div>
                      <div className={styles.infoText}>
                        <span>المنطقة</span>
                        <strong>{customer.area || "غير محددة"}</strong>
                      </div>
                      <ChevronLeft size={17} />
                    </div>

                    <div className={styles.infoRow}>
                      <div className={styles.infoIcon}>
                        <FileText size={18} />
                      </div>
                      <div className={styles.infoText}>
                        <span>كود العميل</span>
                        <strong dir="ltr">
                          {customer.customer_code || "—"}
                        </strong>
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
                    <button
                      type="button"
                      className={styles.settingItem}
                      disabled
                      title="تغيير كلمة المرور غير متاح حاليًا"
                    >
                      <span className={`${styles.settingIcon} ${styles.blue}`}>
                        <KeyRound size={18} />
                      </span>
                      <span className={styles.settingText}>
                        <strong>تغيير كلمة المرور</strong>
                        <small>تحديث كلمة المرور الخاصة بحسابك</small>
                      </span>
                      <ChevronLeft size={17} />
                    </button>

                    <button
                      type="button"
                      className={styles.settingItem}
                      disabled
                      title="إعدادات الأمان غير متاحة حاليًا"
                    >
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
                      <span
                        className={`${styles.settingIcon} ${styles.orange}`}
                      >
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
                    تواصل مع خدمة عملاء جوكر إذا كان لديك أي استفسار بخصوص
                    الخدمة أو حسابك.
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.helpButton}
                  onClick={() => navigate("/customer/notifications")}
                >
                  تواصل معنا
                  <ChevronLeft size={16} />
                </button>
              </section>

              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                <LogOut size={17} />
                تسجيل الخروج
              </button>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerProfile;
