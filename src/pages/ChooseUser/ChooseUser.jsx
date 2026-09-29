import { useNavigate } from "react-router-dom";
import { Store, UserRound } from "lucide-react";

import styles from "./ChooseUser.module.css";

const ChooseUser = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <img
              src="/src/assets/logo.png"
              alt="Joker"
              className={styles.logo}
            />
          </div>

          <h1>أهلاً بك في جوكر</h1>

          <p>اختر نوع الحساب للمتابعة</p>
        </div>

        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={() => navigate("/customer/login")}
          >
            <span className={styles.icon}>
              <UserRound size={28} strokeWidth={1.8} />
            </span>

            <span className={styles.optionContent}>
              <strong>عميل</strong>
              <small>
                لإدارة اشتراكك وخدمات الإنترنت
              </small>
            </span>
          </button>

          <button
            className={styles.option}
            onClick={() => navigate("/merchant/login")}
          >
            <span className={styles.icon}>
              <Store size={28} strokeWidth={1.8} />
            </span>

            <span className={styles.optionContent}>
              <strong>تاجر</strong>
              <small>
                لإدارة كروت الإنترنت وطلباتك
              </small>
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChooseUser;
