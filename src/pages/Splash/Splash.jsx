import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import styles from "./Splash.module.css";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/choose-user", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className={styles.splash}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <img
            src={logo}
            alt="Joker"
            className={styles.logo}
          />
        </div>

        <p className={styles.tagline}>Internet services made easier.</p>
      </div>
    </main>
  );
};

export default Splash;
