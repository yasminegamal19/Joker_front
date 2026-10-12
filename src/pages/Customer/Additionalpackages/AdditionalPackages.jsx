import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Wifi } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import { getAdditionalPackages } from "../../../services/packageService";
import styles from "./AdditionalPackages.module.css";

// "50.00" -> "50"
const formatPrice = (price) => {
  const n = Number(price);
  if (Number.isNaN(n)) return String(price);
  return Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2);
};

const AdditionalPackages = () => {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    getAdditionalPackages(controller.signal)
      .then((data) => setPackages(data?.packages || []))
      .catch((err) => {
        if (controller.signal.aborted) return;

        if (err?.response?.status === 401) {
          navigate("/customer/login", { replace: true });
          return;
        }

        setError("تعذر تحميل الباقات الإضافية.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [attempt, navigate]);

  const handleAdd = (item) => {
    // TODO: اربطه بـ endpoint شراء الباقة الإضافية لما الباك اند يجهزه
    console.log("add additional package", item.id);
  };

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
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
              <p>{error}</p>
              <button
                type="button"
                className={styles.retryButton}
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
                <article key={item.id} className={styles.card}>
                  <div className={styles.icon}>
                    <Wifi size={20} />
                  </div>

                  <div className={styles.content}>
                    <h3>{item.name}</h3>

                    {item.description && <p>{item.description}</p>}

                    <div className={styles.quota}>
                      <strong>{item.quota_gb}</strong>
                      <span>GB إضافية</span>
                    </div>
                  </div>

                  <div className={styles.footer}>
                    <div className={styles.price}>
                      <strong>{formatPrice(item.price)}</strong>
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