import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Wifi,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  LoaderCircle,
} from "lucide-react";

import apiClient from "../../../lib/apiClient";
import { setToken } from "../../../lib/auth";
import styles from "./CustomerLogin.module.css";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await apiClient.post("/login", {
        phone: formData.serviceNumber.trim(),
        password: formData.password,
      });

      const { token, customer, must_change_password } = response.data;

      if (!token) {
        throw new Error("لم يرجع الخادم رمز تسجيل الدخول. حاول مرة أخرى.");
      }

      setToken(token);

      if (customer) {
        try {
          localStorage.setItem("customer", JSON.stringify(customer));
        } catch {
        }
      }
navigate(
  typeof location.state?.from === "string" &&
    location.state.from.startsWith("/customer/")
    ? location.state.from
    : "/customer/home",
  { replace: true },
);

      const requestedPath = location.state?.from;
      const destination =
        typeof requestedPath === "string" &&
        requestedPath.startsWith("/customer/")
          ? requestedPath
          : "/customer/home";

      navigate(destination, { replace: true });
    } catch (error) {
      const data = error.response?.data;

      const message =
        data?.errors?.phone?.[0] ||
        data?.errors?.password?.[0] ||
        data?.message ||
        error.message ||
        "تعذر تسجيل الدخول. برجاء المحاولة مرة أخرى.";

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageViewport}>
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>

      <div className={styles.loginCard}>
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
          <div className={styles.fieldBlock}>
            <label htmlFor="serviceNumber">رقم الموبايل / الخدمة</label>

            <div className={styles.inputBox}>
              <Wifi size={18} className={styles.fieldIcon} />

              <input
                id="serviceNumber"
                type="text"
                name="serviceNumber"
                value={formData.serviceNumber}
                onChange={handleChange}
                placeholder="010XXXXXXXX"
                autoComplete="username"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className={styles.fieldBlock}>
            <div className={styles.labelRow}>
              <label htmlFor="password">كلمة المرور</label>

              <Link to="/customer/forgot-password" className={styles.forgotPass}>
                نسيت كلمة المرور؟
              </Link>
            </div>

            <div className={styles.inputBox}>
              <KeyRound size={18} className={styles.fieldIcon} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={isSubmitting}
              />

              <button
                type="button"
                className={styles.eyeToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                }
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.rememberRow}>
            <label className={styles.customCheckbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
              />
              <span className={styles.checkmark}></span>
              <span>تذكر بياناتي على هذا الجهاز</span>
            </label>
          </div>

          {errorMessage && (
            <div
              role="alert"
              aria-live="polite"
              style={{
                padding: "12px 14px",
                marginBottom: "16px",
                borderRadius: "12px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#B91C1C",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </span>

            {isSubmitting ? (
              <LoaderCircle size={19} className={styles.btnArrow} />
            ) : (
              <ArrowLeft size={19} className={styles.btnArrow} />
            )}
          </button>
        </form>

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
