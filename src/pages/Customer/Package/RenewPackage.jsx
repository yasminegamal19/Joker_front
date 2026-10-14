import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, RefreshCw } from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import { customerMock } from "../../../data/customerMock";
import { useCanChangePackage } from "../../../hooks/useCanChangePackage";
import { usePackages } from "../../../hooks/usePackages";
import { findCurrentPackage } from "../../../utils/packages";
import PackageCard from "./PackageCard";
import styles from "./PackageFlow.module.css";

const { package: myPackage } = customerMock;

// لو باقة العميل مش موجودة في قايمة الـ API نعرض اللي عندنا عنها
const fromCustomerData = (pkg) => ({
  id: pkg.id ?? null,
  name: pkg.name,
  description: "",
  downloadSpeed: pkg.speedMbps != null ? String(pkg.speedMbps) : null,
  quota: pkg.totalGb != null ? String(pkg.totalGb) : null,
  days: null,
  priceValue: null,
  price: null,
  features: [],
});

const RenewPackage = () => {
  const navigate = useNavigate();
  const { packages, loading, error, retry } = usePackages();

  const { enabled: canChangePackage } = useCanChangePackage();

  const livePackage = useMemo(
    () => findCurrentPackage(packages, myPackage),
    [packages],
  );

  // أثناء التحميل ما نعرضش بيانات مؤقتة، وبعد كده الباقة الحقيقية أو اللي عندنا
  const pkg = livePackage ?? fromCustomerData(myPackage);

  const handleRenew = () => {
    // TODO: اربطه بـ endpoint تجديد الباقة لما الباك اند يجهزه
    console.log("renew package ->", pkg.id, pkg.name);
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
            <span className={styles.eyebrow}>الإنترنت المنزلي</span>
            <h1>تجديد الباقة</h1>
            <p>جدّد اشتراكك في باقتك الحالية بنفس المواصفات.</p>
          </header>

          {loading ? (
            <div className={styles.state}>جاري تحميل تفاصيل الباقة...</div>
          ) : (
            <div className={styles.renewLayout}>
              <PackageCard
                pkg={pkg}
                isCurrent
                large
                variant="primary"
                actionLabel="تجديد الآن"
                onAction={handleRenew}
              />

              <aside className={styles.renewSide}>
                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>
                    <CalendarDays size={18} />
                  </span>
                  <div>
                    <span>تاريخ انتهاء الباقة الحالية</span>
                    <strong>{myPackage.endDate}</strong>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoIcon}>
                    <RefreshCw size={18} />
                  </span>
                  <div>
                    <span>نوع التجديد</span>
                    <strong>{myPackage.autoRenew ? "تلقائي" : "يدوي"}</strong>
                  </div>
                </div>

                {error && (
                  <div className={styles.notice}>
                    تعذر تحميل سعر الباقة حاليًا.
                    <button type="button" onClick={retry}>
                      إعادة المحاولة
                    </button>
                  </div>
                )}

                {!error && !livePackage && (
                  <div className={styles.notice}>
                    باقتك غير موجودة في قائمة الباقات المتاحة، لذلك لا يظهر
                    سعرها.
                  </div>
                )}

                {canChangePackage && (
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => navigate("/customer/packages")}
                  >
                    تريد باقة مختلفة؟ تغيير الباقة
                  </button>
                )}
              </aside>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default RenewPackage;
