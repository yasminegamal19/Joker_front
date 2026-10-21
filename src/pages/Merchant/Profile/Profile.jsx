import { useState } from "react";
import {
  UserRound,
  Store,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Save,
  RotateCcw,
  Camera,
  Building2,
  CalendarDays,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

import styles from "./Profile.module.css";

const initialProfile = {
  fullName: "أحمد محمد",
  storeName: "متجر الجوكر",
  email: "ahmed@example.com",
  phone: "01012345678",
  address: "المعادي، القاهرة، مصر",
  businessType: "تجارة إلكترونية",
  taxNumber: "123-456-789",
  description: "متجر متخصص في تقديم أفضل الخدمات والباقات لعملائنا.",
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [activeTab, setActiveTab] = useState("personal");
  const [notice, setNotice] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setNotice("");
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSavedProfile({ ...profile });
    setNotice("تم حفظ التعديلات محليًا بنجاح.");
  };

  const handleReset = () => {
    setProfile({ ...savedProfile });
    setNotice("تم التراجع عن التعديلات غير المحفوظة.");
  };

  const initials = profile.fullName.trim().slice(0, 1) || "ت";

  return (
    <div className={styles.page} dir="rtl">
      <header className={styles.pageHeader}>
        <div className={styles.heading}>
          <div className={styles.headingIcon}>
            <UserRound size={23} />
          </div>

          <div>
            <h1>الملف الشخصي</h1>
            <p>إدارة بياناتك الشخصية ومعلومات متجرك من مكان واحد.</p>
          </div>
        </div>

        <div className={styles.accountStatus}>
          <ShieldCheck size={17} />
          <span>حساب التاجر</span>
        </div>
      </header>

      <section className={styles.profileHero}>
        <div className={styles.heroPattern} />

        <div className={styles.heroContent}>
          <div className={styles.profileAvatar}>
            <span>{initials}</span>
            <button
              type="button"
              className={styles.cameraButton}
              title="تغيير الصورة غير متاح حاليًا"
              aria-label="تغيير الصورة"
              disabled
            >
              <Camera size={15} />
            </button>
          </div>

          <div className={styles.heroInfo}>
            <span className={styles.merchantLabel}>
              <Store size={14} />
              حساب تاجر
            </span>

            <h2>{profile.fullName || "اسم التاجر"}</h2>
            <p>{profile.storeName || "اسم المتجر"}</p>
          </div>

          <div className={styles.memberSince}>
            <span className={styles.memberIcon}>
              <CalendarDays size={17} />
            </span>
            <div>
              <span>عضو منذ</span>
              <strong>أكتوبر 2026</strong>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.profileLayout}>
        <aside className={styles.profileSidebar}>
          <div className={styles.sidebarHeading}>
            <h3>إعدادات الحساب</h3>
            <p>إدارة بيانات حسابك</p>
          </div>

          <button
            type="button"
            className={`${styles.tabButton} ${
              activeTab === "personal" ? styles.activeTab : ""
            }`}
            onClick={() => {
              setActiveTab("personal");
              setNotice("");
            }}
          >
            <span className={styles.tabIcon}>
              <UserRound size={18} />
            </span>
            <span className={styles.tabText}>
              <strong>البيانات الشخصية</strong>
              <small>الاسم وبيانات التواصل</small>
            </span>
          </button>

          <button
            type="button"
            className={`${styles.tabButton} ${
              activeTab === "business" ? styles.activeTab : ""
            }`}
            onClick={() => {
              setActiveTab("business");
              setNotice("");
            }}
          >
            <span className={styles.tabIcon}>
              <Building2 size={18} />
            </span>
            <span className={styles.tabText}>
              <strong>بيانات المتجر</strong>
              <small>معلومات النشاط التجاري</small>
            </span>
          </button>

          <div className={styles.securityNote}>
            <span>
              <LockKeyhole size={18} />
            </span>
            <strong>بياناتك في أمان</strong>
            <p>حافظ على تحديث بيانات حسابك لتسهيل التواصل مع فريق الدعم.</p>
          </div>
        </aside>

        <section className={styles.formCard}>
          <div className={styles.formHeader}>
            <div>
              <h2>
                {activeTab === "personal"
                  ? "البيانات الشخصية"
                  : "بيانات المتجر"}
              </h2>
              <p>
                {activeTab === "personal"
                  ? "راجع بياناتك الشخصية وعدّلها عند الحاجة."
                  : "حدّث بيانات نشاطك التجاري ومعلومات متجرك."}
              </p>
            </div>

            <span className={styles.formHeaderIcon}>
              {activeTab === "personal" ? (
                <UserRound size={21} />
              ) : (
                <Store size={21} />
              )}
            </span>
          </div>

          <form onSubmit={handleSave}>
            {activeTab === "personal" ? (
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="fullName">الاسم بالكامل</label>
                  <div className={styles.inputWrap}>
                    <UserRound size={17} />
                    <input
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      placeholder="اكتب الاسم بالكامل"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <div className={styles.inputWrap}>
                    <Mail size={17} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">رقم الهاتف</label>
                  <div className={styles.inputWrap}>
                    <Phone size={17} />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="address">العنوان</label>
                  <div className={styles.inputWrap}>
                    <MapPin size={17} />
                    <input
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      placeholder="المحافظة والمنطقة"
                      autoComplete="street-address"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label htmlFor="storeName">اسم المتجر</label>
                  <div className={styles.inputWrap}>
                    <Store size={17} />
                    <input
                      id="storeName"
                      name="storeName"
                      value={profile.storeName}
                      onChange={handleChange}
                      placeholder="اكتب اسم المتجر"
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="businessType">نوع النشاط التجاري</label>
                  <div className={styles.inputWrap}>
                    <Building2 size={17} />
                    <input
                      id="businessType"
                      name="businessType"
                      value={profile.businessType}
                      onChange={handleChange}
                      placeholder="نوع النشاط"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="taxNumber">الرقم الضريبي</label>
                  <div className={styles.inputWrap}>
                    <ShieldCheck size={17} />
                    <input
                      id="taxNumber"
                      name="taxNumber"
                      value={profile.taxNumber}
                      onChange={handleChange}
                      placeholder="الرقم الضريبي"
                    />
                  </div>
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label htmlFor="description">نبذة عن المتجر</label>
                  <textarea
                    id="description"
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    placeholder="اكتب نبذة مختصرة عن نشاطك التجاري..."
                    rows={5}
                  />
                  <span className={styles.fieldHint}>
                    وصف مختصر يساعد في التعريف بنشاطك التجاري.
                  </span>
                </div>
              </div>
            )}

            {notice && (
              <div className={styles.notice} role="status">
                <CheckCircle2 size={18} />
                <span>{notice}</span>
              </div>
            )}

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                <Save size={17} />
                حفظ التعديلات
              </button>

              <button
                type="button"
                className={styles.resetButton}
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                تراجع
              </button>
            </div>
          </form>
        </section>
      </div>

      <div className={styles.demoNotice}>
        <ShieldCheck size={17} />
        <p>
          البيانات الحالية تجريبية، والتعديلات بتتخزن داخل الصفحة فقط لحد ربط
          الـ API.
        </p>
      </div>
    </div>
  );
}
