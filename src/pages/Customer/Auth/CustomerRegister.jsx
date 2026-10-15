import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Phone,
  UserRound,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

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
    <div className={styles.pageViewport}>
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>

      <div className={styles.registerCard}>
        <div className={styles.brandHeader}>
          <div className={styles.logoBadge}>
            <UserRound className={styles.userIcon} size={22} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>الجوكر للاتصالات</span>
            <span className={styles.brandSub}>حساب عميل جديد</span>
          </div>
        </div>

        <div className={styles.cardText}>
          <h2>إنشاء حساب</h2>
          <p>أدخل بياناتك الأساسية للوصول لإدارة خدماتك ومحفظتك</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.mainForm}>
          <div className={styles.fieldBlock}>
            <label htmlFor="name">الاسم بالكامل</label>
            <div className={styles.inputBox}>
              <UserRound size={18} className={styles.fieldIcon} />
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

          <div className={styles.fieldBlock}>
            <label htmlFor="phone">رقم الهاتف</label>
            <div className={styles.inputBox}>
              <Phone size={18} className={styles.fieldIcon} />
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

          <div className={styles.fieldBlock}>
            <label htmlFor="password">كلمة المرور</label>
            <div className={styles.inputBox}>
              <LockKeyhole size={18} className={styles.fieldIcon} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.fieldBlock}>
            <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
            <div className={styles.inputBox}>
              <LockKeyhole size={18} className={styles.fieldIcon} />
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
                className={styles.eyeToggle}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.primaryBtn}>
            <span>إنشاء الحساب</span>
            <ArrowLeft size={19} className={styles.btnArrow} />
          </button>
        </form>

        <div className={styles.cardFooter}>
          <div className={styles.secureLine}>
            <ShieldCheck size={15} />
            <span>بياناتك محمية ومشفرة 100%</span>
          </div>

          <p className={styles.loginPrompt}>
            لديك حساب بالفعل؟{" "}
            <Link to="/customer/login" className={styles.loginLink}>
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
