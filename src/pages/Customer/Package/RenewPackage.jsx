import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import { customerMock } from "../../../data/customerMock";
import { useCanChangePackage } from "../../../hooks/useCanChangePackage";
import { usePackages } from "../../../hooks/usePackages";
import { findCurrentPackage } from "../../../utils/packages";
import apiClient from "../../../lib/apiClient";
import PackageCard from "./PackageCard";
import styles from "./PackageFlow.module.css";

const { package: myPackage } = customerMock;

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

const RenewPackage = () => {
  const navigate = useNavigate();
  const { packages, loading: packagesLoading, error: packagesError, retry } =
    usePackages();

  const { enabled: canChangePackage } = useCanChangePackage();

  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [subscriptionError, setSubscriptionError] = useState("");
  const [renewing, setRenewing] = useState(false);
  const [notice, setNotice] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchSubscription = async () => {
      try {
        const response = await apiClient.get("/subscription");

        if (mounted) {
          setSubscription(response.data?.subscription ?? null);
          setSubscriptionError("");
        }
      } catch (requestError) {
        if (mounted) {
          setSubscriptionError(
            requestError.response?.data?.message ||
              "تعذر تحميل بيانات الاشتراك الحالي.",
          );
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

  const livePackage = useMemo(() => {
    if (!subscription) return null;

    if (subscription.package_id != null) {
      const matchedById = packages.find(
        (pkg) =>
          String(pkg.id) === String(subscription.package_id),
      );

      if (matchedById) return matchedById;
    }

    if (subscription.package_name) {
      const matchedByName = packages.find(
        (pkg) =>
          pkg.name?.trim() === subscription.package_name.trim(),
      );

      if (matchedByName) return matchedByName;
    }

    return findCurrentPackage(packages, myPackage);
  }, [packages, subscription]);

  const pkg = useMemo(() => {
    if (livePackage) return livePackage;

    if (!subscription) return null;

    return {
      id: subscription.package_id ?? null,
      name: subscription.package_name || "باقتك الحالية",
      description: "",
      downloadSpeed:
        subscription.download_speed_kbps != null
          ? String(
              subscription.download_speed_kbps / 1024,
            )
          : null,
      quota: null,
      days: null,
      priceValue: null,
      price: null,
      features: [],
    };
  }, [livePackage, subscription]);

  const handleRenew = async () => {
    if (!subscription || renewing) return;

    setRenewing(true);
    setNotice(null);

    try {
      const response = await apiClient.post(
        "/subscription/renew",
        {
          months: 1,
        },
      );

      const updatedSubscription = response.data?.subscription;

      if (updatedSubscription) {
        setSubscription((previous) => ({
          ...previous,
          ...updatedSubscription,
        }));
      }

      if (response.data?.wallet_balance != null) {
        setWalletBalance(response.data.wallet_balance);
      }

      setNotice({
        type: "success",
        message:
          response.data?.message || "تم تجديد الاشتراك بنجاح.",
      });
    } catch (requestError) {
      setNotice({
        type: "error",
        message:
          requestError.response?.data?.message ||
          "تعذر تجديد الاشتراك. برجاء المحاولة مرة أخرى.",
      });
    } finally {
      setRenewing(false);
    }
  };

  const loading = packagesLoading || subscriptionLoading;

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
            <p>جدّد اشتراكك في باقتك الحالية لمدة شهر إضافي.</p>
          </header>

          {notice && (
            <div
              className={styles.notice}
              role={notice.type === "error" ? "alert" : "status"}
            >
              {notice.message}
              {notice.type === "success" &&
                walletBalance !== null && (
                  <p>رصيد محفظتك الحالي: {walletBalance} جنيه</p>
                )}
            </div>
          )}

          {loading && (
            <div className={styles.state}>
              جاري تحميل تفاصيل الاشتراك...
            </div>
          )}

          {!loading && subscriptionError && (
            <div className={styles.state}>
              <p>{subscriptionError}</p>
              <button
                type="button"
                className={styles.retry}
                onClick={() => window.location.reload()}
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading && !subscriptionError && !subscription && (
            <div className={styles.state}>
              لا يوجد اشتراك فعال حاليًا لتجديده.
            </div>
          )}

          {!loading &&
            !subscriptionError &&
            subscription &&
            pkg && (
              <div className={styles.renewLayout}>
                <PackageCard
                  pkg={pkg}
                  isCurrent
                  large
                  variant="primary"
                  actionLabel={
                    renewing ? "جاري التجديد..." : "تجديد الآن"
                  }
                  actionDisabled={renewing}
                  onAction={handleRenew}
                />

                <aside className={styles.renewSide}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoIcon}>
                      <CalendarDays size={18} />
                    </span>
                    <div>
                      <span>تاريخ انتهاء الباقة الحالية</span>
                      <strong>
                        {formatDate(subscription.end_date)}
                      </strong>
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoIcon}>
                      <RefreshCw size={18} />
                    </span>
                    <div>
                      <span>مدة التجديد</span>
                      <strong>شهر واحد</strong>
                    </div>
                  </div>

                  {packagesError && (
                    <div className={styles.notice}>
                      تعذر تحميل أسعار الباقات.
                      <button
                        type="button"
                        onClick={retry}
                      >
                        إعادة المحاولة
                      </button>
                    </div>
                  )}

                  {canChangePackage && (
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={() =>
                        navigate("/customer/packages")
                      }
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
