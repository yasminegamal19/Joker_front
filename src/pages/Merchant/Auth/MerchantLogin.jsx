import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Eye, EyeOff, LockKeyhole, Store } from "lucide-react";

import AuthLayout from "../../../components/Auth/AuthLayout";
import styles from "./MerchantLogin.module.css";

const MerchantLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    serviceNumber: "",
    password: "",
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

    console.log("Merchant login:", formData);
  };

  return (
    <AuthLayout
      badge="حساب تاجر"
      badgeIcon={Store}
      title="أهلاً بك في جوكر"
      description="أدر بطاقاتك وباقاتك وعمليات الدفع الخاصة بنشاطك التجاري بسهولة من مكان واحد."
    >
      <div className={styles.header}>
        <span className={styles.eyebrow}>بوابة التاجر</span>

        <h2>تسجيل الدخول</h2>

        <p>أدخل بيانات نشاطك التجاري للوصول إلى حسابك.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="serviceNumber">رقم الخدمة</label>

          <div className={styles.inputWrapper}>
            <Building2 size={19} />

            <input
              id="serviceNumber"
              name="serviceNumber"
              type="text"
              value={formData.serviceNumber}
              onChange={handleChange}
              placeholder="أدخل رقم الخدمة"
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">كلمة المرور</label>

          <div className={styles.inputWrapper}>
            <LockKeyhole size={19} />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="أدخل كلمة المرور"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <div className={styles.options}>
          <button type="button" className={styles.forgotPassword}>
            نسيت كلمة المرور؟
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          تسجيل الدخول
        </button>
      </form>

      <p className={styles.footer}>
        ليس لديك حساب تاجر؟ <Link to="/merchant/register">تقديم طلب تسجيل</Link>
      </p>
    </AuthLayout>
  );
};

export default MerchantLogin;
