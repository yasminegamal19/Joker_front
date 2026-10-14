import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import { customerMock } from "../../../data/customerMock";
import { useCanChangePackage } from "../../../hooks/useCanChangePackage";
import { usePackages } from "../../../hooks/usePackages";
import { findCurrentPackage } from "../../../utils/packages";
import apiClient from "../../../lib/apiClient";
import PackageCard from "./PackageCard";
import styles from "./PackageFlow.module.css";

const { package: myPackage } = customerMock;

const ChangePackage = () => {
  const navigate = useNavigate();
  const { enabled } = useCanChangePackage();
  const { packages, loading, error, retry } = usePackages();

  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [currentPackageId, setCurrentPackageId] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSubscription = async () => {
      try {
        const response = await apiClient.get("/subscription");

        if (mounted) {
          const activeSubscription = response.data?.subscription ?? null;
          setSubscription(activeSubscription);
          setCurrentPackageId(activeSubscription?.package_id ?? null);
        }
      } catch {
        if (mounted) {
          setNotice({
            type: "error",
            message: "تعذر تحميل بيانات اشتراكك الحالية.",
          });
        }
      } finally {
        if (mounted) setSubscriptionLoading(false);
      }
    };

    fetchSubscription();

    return () => {
      mounted = false;
    };
  }, []);

  const current = useMemo(() => {
    if (currentPackageId != null) {
      const matchedById = packages.find(
        (pkg) => String(pkg.id) === String(currentPackageId),
      );

      if (matchedById) return matchedById;
    }

    if (subscription?.package_name) {
      const matchedByName = packages.find(
        (pkg) =>
          pkg.name?.trim() === subscription.package_name.trim(),
      );

      if (matchedByName) return matchedByName;
    }

    return findCurrentPackage(packages, myPackage);
  }, [packages, currentPackageId, subscription]);

  const ordered = useMemo(() => {
    if (!current) return packages;

    return [
      current,
      ...packages.filter((pkg) => pkg.id !== current.id),
    ];
  }, [packages, current]);

  const handleSelect = async (pkg) => {
    if (!enabled || submittingId !== null || pkg.id == null) return;

    if (String(pkg.id) === String(current?.id)) return;

    setSubmittingId(pkg.id);
    setNotice(null);

    try {
      const response = await apiClient.post(
        "/subscription/change-package",
        {
          package_id: pkg.id,
        },
      );

      const updatedSubscription = response.data?.subscription;

      if (updatedSubscription) {
        setSubscription((previous) => ({
          ...previous,
          ...updatedSubscription,
          package_name: pkg.name,
        }));

        setCurrentPackageId(
          updatedSubscription.package_id ?? pkg.id,
        );
      } else {
        setCurrentPackageId(pkg.id);
      }

      setNotice({
        type: "success",
        message:
          response.data?.message || "تم تغيير الباقة بنجاح.",
      });
    } catch (requestError) {
      setNotice({
        type: "error",
        message:
          requestError.response?.data?.message ||
          "تعذر تغيير الباقة. برجاء المحاولة مرة أخرى.",
      });
    } finally {
      setSubmittingId(null);
    }
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

          {notice && (
            <div
              className={styles.notice}
              role={notice.type === "error" ? "alert" : "status"}
            >
              {notice.message}
            </div>
          )}

          {(loading || subscriptionLoading) && (
            <div className={styles.state}>
              جاري تحميل بيانات الباقات والاشتراك...
            </div>
          )}

          {!loading && error && (
            <div className={styles.state}>
              <p>تعذر تحميل الباقات.</p>
              <button
                type="button"
                className={styles.retry}
                onClick={retry}
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading &&
            !subscriptionLoading &&
            !error &&
            ordered.length === 0 && (
              <div className={styles.state}>
                لا توجد باقات متاحة حاليًا.
              </div>
            )}

          {!loading &&
            !subscriptionLoading &&
            !error &&
            ordered.length > 0 && (
              <div className={styles.grid}>
                {ordered.map((pkg) => {
                  const isCurrent =
                    String(current?.id) === String(pkg.id);

                  return (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      isCurrent={isCurrent}
                      actionLabel={
                        submittingId === pkg.id
                          ? "جاري التغيير..."
                          : enabled
                            ? isCurrent
                              ? "باقتك الحالية"
                              : "اختيار الباقة"
                            : undefined
                      }
                      actionDisabled={
                        isCurrent || submittingId !== null
                      }
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
