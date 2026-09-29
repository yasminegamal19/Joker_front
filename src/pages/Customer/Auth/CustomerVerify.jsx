import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquareText, UserRound } from "lucide-react";

import AuthLayout from "../../../components/Auth/AuthLayout";
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
    <AuthLayout
      badge="تأكيد رقم الهاتف"
      badgeIcon={UserRound}
      title="تأكيد حسابك"
      description="أرسلنا رمز تحقق إلى رقم الهاتف الذي أدخلته. أدخل الرمز لإكمال إنشاء حسابك."
    >
      <div className={styles.header}>
        <div className={styles.icon}>
          <MessageSquareText size={25} />
        </div>

        <span className={styles.eyebrow}>رمز التحقق</span>

        <h2>تأكيد رقم الهاتف</h2>

        <p>أدخل الرمز المكون من 6 أرقام المرسل إلى رقم هاتفك.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
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
          className={styles.submitButton}
          disabled={otp.join("").length !== 6}
        >
          تأكيد الحساب
        </button>
      </form>

      <Link to="/customer/register" className={styles.backLink}>
        <ArrowRight size={17} />
        تعديل بيانات التسجيل
      </Link>
    </AuthLayout>
  );
};

export default CustomerVerify;
