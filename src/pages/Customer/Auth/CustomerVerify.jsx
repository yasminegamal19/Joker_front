import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquareText, ShieldCheck, Wifi } from "lucide-react";

import styles from "./CustomerVerify.module.css";

const CustomerVerify = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const newOtp = ["", "", "", "", "", ""];

    pastedValue.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedValue.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.join("").length !== 6) return;

    navigate("/customer/login");
  };

  return (
    <div className={styles.pageViewport}>
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>

      <div className={styles.verifyCard}>
        <div className={styles.brandHeader}>
          <div className={styles.logoBadge}>
            <Wifi className={styles.wifiIcon} size={22} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>الجوكر للاتصالات</span>
            <span className={styles.brandSub}>تأكيد الحساب</span>
          </div>
        </div>

        <div className={styles.cardText}>
          <div className={styles.iconCircle}>
            <MessageSquareText size={22} />
          </div>
          <h2>تأكيد رقم الهاتف</h2>
          <p>أدخل رمز التحقق المكون من 6 أرقام المرسل إلى رقم هاتفك</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.mainForm}>
          <div className={styles.otpGroup} dir="ltr">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                aria-label={`رقم ${index + 1}`}
              />
            ))}
          </div>

          <div className={styles.resendRow}>
            <span>لم يصلك الرمز؟</span>
            <button type="button" className={styles.resendButton}>
              إعادة إرسال
            </button>
          </div>

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={otp.join("").length !== 6}
          >
            <span>تأكيد الحساب</span>
            <ArrowLeft size={19} className={styles.btnArrow} />
          </button>
        </form>

        <div className={styles.cardFooter}>
          <div className={styles.secureLine}>
            <ShieldCheck size={15} />
            <span>تأكيد مشفر وآمن</span>
          </div>

          <Link to="/customer/register" className={styles.backLink}>
            تعديل بيانات التسجيل
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerVerify;
