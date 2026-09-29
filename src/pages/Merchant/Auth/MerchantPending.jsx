import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,

} from "lucide-react";

import AuthLayout from "../../../components/Auth/AuthLayout";
import styles from "./MerchantPending.module.css";

const MerchantPending = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout
      badge="طلب قيد المراجعة"
      badgeIcon={Clock3}
      title="طلبك في أمان"
      description="تم استلام بيانات نشاطك التجاري بنجاح، وسيقوم فريق جوكر بمراجعة الطلب قبل تفعيل حسابك."
    >
      <div className={styles.container}>
        <div className={styles.successIcon}>
          <CheckCircle2 size={34} strokeWidth={1.8} />
        </div>

        <span className={styles.eyebrow}>تم إرسال الطلب بنجاح</span>

        <h2>طلبك قيد المراجعة</h2>

        <p className={styles.description}>
          شكرًا لتسجيل نشاطك التجاري مع جوكر.
          <br />
          سيقوم فريقنا بمراجعة بيانات الطلب، وعند الموافقة ستتمكن من الدخول إلى
          حسابك.
        </p>

        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>
            <Clock3 size={20} />
          </div>

          <div>
            <strong>انتظر تفعيل الحساب</strong>

            <p>ستتمكن من تسجيل الدخول بمجرد اعتماد طلب التسجيل من الإدارة.</p>
          </div>
        </div>

        <div className={styles.nextSteps}>
          <div className={styles.step}>
            <span>1</span>
            <div>
              <strong>مراجعة البيانات</strong>
              <p>فريق جوكر يراجع بيانات نشاطك.</p>
            </div>
          </div>

          <div className={styles.step}>
            <span>2</span>
            <div>
              <strong>اعتماد الحساب</strong>
              <p>يتم تفعيل حساب التاجر بعد الموافقة.</p>
            </div>
          </div>

          <div className={styles.step}>
            <span>3</span>
            <div>
              <strong>ابدأ استخدام جوكر</strong>
              <p>سجّل الدخول لإدارة خدمات نشاطك.</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.submitButton}
          onClick={() => navigate("/merchant/login")}
        >
          العودة لتسجيل الدخول
        </button>

        <Link to="/choose-user" className={styles.backLink}>
          <ArrowRight size={17} />
          العودة لاختيار نوع الحساب
        </Link>
      </div>
    </AuthLayout>
  );
};

export default MerchantPending;
