import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Wifi } from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import { getAdditionalPackages } from "../../../services/packageService";
import { formatPrice, parsePrice } from "../../../utils/packages";
import styles from "./PackageFlow.module.css";

const AdditionalPackages = () => {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    getAdditionalPackages(controller.signal)
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.packages;
        setPackages(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;

        if (err?.response?.status === 401) {
          navigate("/customer/login", { replace: true });
          return;
        }

        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [attempt, navigate]);

  const handleAdd = (item) => {
    console.log("add additional package ->", item.id, item.name);
  };

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate("/customer/package")}
          >
            <ArrowRight size={16} />
            الرجوع لباقتي
          </button>

          <header className={styles.header}>
            <span className={styles.eyebrow}>إضافات الإنترنت</span>
            <h1>الباقات الإضافية</h1>
            <p>
              زوّد سعة الإنترنت الخاصة بك واستمتع بالكوتا الإضافية حتى نهاية
              الشهر.
            </p>
          </header>

          {loading && (
            <div className={styles.state}>جاري تحميل الباقات الإضافية...</div>
          )}

          {!loading && error && (
            <div className={styles.state}>
              <p>تعذر تحميل الباقات الإضافية.</p>
              <button
                type="button"
                className={styles.retry}
                onClick={() => setAttempt((n) => n + 1)}
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading && !error && packages.length === 0 && (
            <div className={styles.state}>
              لا توجد باقات إضافية متاحة حاليًا.
            </div>
          )}

          {!loading && !error && packages.length > 0 && (
            <div className={styles.grid}>
              {packages.map((item) => (
                <article key={item.id} className={styles.addCard}>
                  <div className={styles.addIcon}>
                    <Wifi size={20} />
                  </div>

                  <h3>{item.name}</h3>

                  {item.description && <p>{item.description}</p>}

                  <div className={styles.addQuota}>
                    <strong>{item.quota_gb}</strong>
                    <span>GB إضافية</span>
                  </div>

                  <div className={styles.spacer} />

                  <div className={styles.addFooter}>
                    <div className={styles.addPrice}>
                      <strong>{formatPrice(parsePrice(item.price))}</strong>
                      <span>جنيه</span>
                    </div>

                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() => handleAdd(item)}
                    >
                      إضافة الباقة
                      <ArrowLeft size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdditionalPackages;
