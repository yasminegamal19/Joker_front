import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import { customerMock } from "../../../data/customerMock";
import { useCanChangePackage } from "../../../hooks/useCanChangePackage";
import { usePackages } from "../../../hooks/usePackages";
import { findCurrentPackage } from "../../../utils/packages";
import PackageCard from "./PackageCard";
import styles from "./PackageFlow.module.css";

const { package: myPackage } = customerMock;

const ChangePackage = () => {
  const navigate = useNavigate();
  const { enabled } = useCanChangePackage();
  const { packages, loading, error, retry } = usePackages();

  const current = useMemo(
    () => findCurrentPackage(packages, myPackage),
    [packages],
  );

  // باقة العميل الحالية أول واحدة، والباقي من الأرخص للأغلى
  const ordered = useMemo(() => {
    if (!current) return packages;
    return [current, ...packages.filter((p) => p.id !== current.id)];
  }, [packages, current]);

  const handleSelect = (pkg) => {
    // TODO: اربطه بـ endpoint تغيير الباقة لما الباك اند يجهزه
    console.log("change package ->", pkg.id, pkg.name);
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
            <h1>الباقات</h1>
            <p>
              {enabled
                ? "اختار الباقة اللي تناسب استخدامك من كل الباقات المتاحة."
                : "استعرض كل الباقات المتاحة."}
            </p>
          </header>

          {loading && <div className={styles.state}>جاري تحميل الباقات...</div>}

          {!loading && error && (
            <div className={styles.state}>
              <p>تعذر تحميل الباقات.</p>
              <button type="button" className={styles.retry} onClick={retry}>
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading && !error && ordered.length === 0 && (
            <div className={styles.state}>لا توجد باقات متاحة حاليًا.</div>
          )}

          {!loading && !error && ordered.length > 0 && (
            <div className={styles.grid}>
              {ordered.map((pkg) => {
                const isCurrent = current?.id === pkg.id;

                return (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isCurrent={isCurrent}
                    actionLabel={
                      enabled
                        ? isCurrent
                          ? "باقتك الحالية"
                          : "اختيار الباقة"
                        : undefined
                    }
                    actionDisabled={isCurrent}
                    variant="outline"
                    onAction={() => handleSelect(pkg)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ChangePackage;
