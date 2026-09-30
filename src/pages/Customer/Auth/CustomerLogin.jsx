import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wifi,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  Sparkles,
} from "lucide-react";
import styles from "./CustomerLogin.module.css";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ serviceNumber: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/customer/home");
  };

  return (
    <div className={styles.pageViewport}>
      {/* خلفية ضوئية فاتحة وهادئة */}
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>

      <div className={styles.loginCard}>
        {/* الهيدر مع شارة البراند */}
        <div className={styles.brandHeader}>
          <div className={styles.logoBadge}>
            <Wifi className={styles.wifiIcon} size={22} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>الجوكر للاتصالات</span>
            <span className={styles.brandSub}>بوابة خدمات العميل</span>
          </div>
        </div>

        <div className={styles.cardText}>
          <h2>تسجيل الدخول</h2>
          <p>أدخل بيانات الخط أو كارت الشحن للوصول لمحفظتك واشتراكك</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.mainForm}>
          {/* حقل رقم الخدمة */}
          <div className={styles.fieldBlock}>
            <label>رقم الخدمة / الكارت</label>
            <div className={styles.inputBox}>
              <Wifi size={18} className={styles.fieldIcon} />
              <input
                type="text"
                name="serviceNumber"
                value={formData.serviceNumber}
                onChange={handleChange}
                placeholder="010XXXXXXXX أو رقم الكارت"
                required
              />
            </div>
          </div>

          {/* حقل كلمة المرور */}
          <div className={styles.fieldBlock}>
            <div className={styles.labelRow}>
              <label>كلمة المرور</label>
              <a href="#forgot" className={styles.forgotPass}>
                نسيت كلمة المرور؟
              </a>
            </div>
            <div className={styles.inputBox}>
              <KeyRound size={18} className={styles.fieldIcon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* خيار تذكرني */}
          <div className={styles.rememberRow}>
            <label className={styles.customCheckbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
              <span>تذكر بياناتي على هذا الجهاز</span>
            </label>
          </div>

          {/* زر تسجيل الدخول */}
          <button type="submit" className={styles.primaryBtn}>
            <span>تسجيل الدخول</span>
            <ArrowLeft size={19} className={styles.btnArrow} />
          </button>
        </form>

        {/* الفوتر */}
        <div className={styles.cardFooter}>
          <div className={styles.secureLine}>
            <ShieldCheck size={15} />
            <span>اتصال مشفر وآمن 100%</span>
          </div>

          <p className={styles.registerPrompt}>
            ليس لديك حساب؟{" "}
            <Link to="/customer/register" className={styles.regLink}>
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
