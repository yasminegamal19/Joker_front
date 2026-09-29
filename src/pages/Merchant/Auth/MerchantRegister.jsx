import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, MapPin, Phone, Store, UserRound } from "lucide-react";

import AuthLayout from "../../../components/Auth/AuthLayout";
import styles from "./MerchantRegister.module.css";

const MerchantRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    responsibleName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Merchant registration:", formData);

    navigate("/merchant/pending");
  };

  return (
    <AuthLayout
      badge="حساب تاجر"
      badgeIcon={Store}
      title="ابدأ تجارتك مع جوكر"
      description="سجّل نشاطك التجاري وأرسل طلبك لفريق جوكر لمراجعته وتفعيل حسابك."
    >
      <div className={styles.header}>
        <span className={styles.eyebrow}>طلب حساب تاجر</span>

        <h2>تسجيل نشاط تجاري</h2>

        <p>أدخل البيانات التالية لإرسال طلب التسجيل.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="businessName">اسم النشاط التجاري</label>

          <div className={styles.inputWrapper}>
            <Building2 size={19} />

            <input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="مثال: بقالة النور"
              autoComplete="organization"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="responsibleName">اسم المسؤول عن النشاط</label>

          <div className={styles.inputWrapper}>
            <UserRound size={19} />

            <input
              id="responsibleName"
              name="responsibleName"
              type="text"
              value={formData.responsibleName}
              onChange={handleChange}
              placeholder="أدخل اسم المسؤول"
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">رقم هاتف المسؤول</label>

          <div className={styles.inputWrapper}>
            <Phone size={19} />

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01xxxxxxxxx"
              autoComplete="tel"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">عنوان النشاط</label>

          <div className={styles.inputWrapper}>
            <MapPin size={19} />

            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="أدخل عنوان النشاط بالتفصيل"
              autoComplete="street-address"
              required
            />
          </div>
        </div>

        <button type="button" className={styles.locationButton}>
          <MapPin size={18} />
          <span>
            <strong>تحديد موقع النشاط</strong>
            <small>حدد الموقع على الخريطة</small>
          </span>
        </button>

        <button type="submit" className={styles.submitButton}>
          إرسال طلب التسجيل
        </button>
      </form>

      <p className={styles.footer}>
        لديك حساب تاجر بالفعل؟ <Link to="/merchant/login">تسجيل الدخول</Link>
      </p>
    </AuthLayout>
  );
};

export default MerchantRegister;
