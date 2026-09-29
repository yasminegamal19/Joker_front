import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Phone, UserRound } from "lucide-react";

import AuthLayout from "../../../components/Auth/AuthLayout";
import styles from "./CustomerRegister.module.css";

const CustomerRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    navigate("/customer/verify");
  };

  return (
    <AuthLayout
      badge="حساب عميل"
      badgeIcon={UserRound}
      title="انضم إلى جوكر"
      description="أنشئ حسابك واستمتع بإدارة خدمات الإنترنت، المحفظة والباقات من مكان واحد."
    >
      <div className={styles.header}>
        <span className={styles.eyebrow}>حساب جديد</span>

        <h2>إنشاء حساب</h2>

        <p>أدخل بياناتك الأساسية للبدء.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">الاسم بالكامل</label>

          <div className={styles.inputWrapper}>
            <UserRound size={19} />

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل اسمك بالكامل"
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">رقم الهاتف</label>

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
              autoComplete="new-password"
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

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>

          <div className={styles.inputWrapper}>
            <LockKeyhole size={19} />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="أعد إدخال كلمة المرور"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          إنشاء الحساب
        </button>
      </form>

      <p className={styles.footer}>
        لديك حساب بالفعل؟ <Link to="/customer/login">تسجيل الدخول</Link>
      </p>
    </AuthLayout>
  );
};

export default CustomerRegister;
