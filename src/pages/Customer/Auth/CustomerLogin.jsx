import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";

import AuthLayout from "../../../components/Auth/AuthLayout";
import styles from "./CustomerLogin.module.css";

const CustomerLogin = () => {
    const navigate = useNavigate();

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

    console.log("Customer login:", formData);

    navigate("/customer/home");
  };

  return (
    <AuthLayout
      badge="حساب عميل"
      badgeIcon={UserRound}
      title="أهلاً بك في جوكر"
      description="تحكم في خدمات الإنترنت الخاصة بك، تابع باقتك ومحفظتك واطلب الدعم بسهولة من مكان واحد."
    >
      <div className={styles.header}>
        <span className={styles.eyebrow}>بوابة العميل</span>

        <h2>تسجيل الدخول</h2>

        <p>أدخل بياناتك للوصول إلى حسابك.</p>
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
              placeholder="رقم الكارت أو الهاتف أو الواي فاي"
              autoComplete="username"
              required
            />
          </div>

          <span className={styles.hint}>
            يمكنك استخدام رقم الكارت أو رقم الهاتف أو رقم خدمة الواي فاي.
          </span>
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
              aria-label={
                showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
              }
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
        ليس لديك حساب؟ <Link to="/customer/register">إنشاء حساب جديد</Link>
      </p>
    </AuthLayout>
  );
};

export default CustomerLogin;
