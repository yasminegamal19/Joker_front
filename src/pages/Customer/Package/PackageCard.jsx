import { ArrowLeft, Check, Wifi } from "lucide-react";
import styles from "./PackageFlow.module.css";

/*
  كارت باقة مشترك بين صفحة "تغيير الباقة" وصفحة "تجديد الباقة".
  pkg: الشكل الناتج من mapPackage (priceValue = null معناها السعر مش معروف)
*/
const PackageCard = ({
  pkg,
  isCurrent = false,
  actionLabel,
  onAction,
  actionDisabled = false,
  variant = "outline", // "primary" | "outline"
  large = false,
}) => {
  const hasPrice = pkg.priceValue !== null && pkg.priceValue !== undefined;

  return (
    <article
      className={`${styles.card} ${isCurrent ? styles.cardCurrent : ""} ${
        large ? styles.cardLarge : ""
      }`}
    >
      {isCurrent && (
        <span className={styles.currentBadge}>
          <span />
          باقتك الحالية
        </span>
      )}

      <div className={styles.cardHeader}>
        <div className={styles.cardIconRow}>
          <div className={styles.cardIcon}>
            <Wifi size={20} />
          </div>

          {pkg.days ? (
            <span className={styles.cardDays}>{pkg.days} يوم</span>
          ) : null}
        </div>

        <h3>{pkg.name}</h3>

        {pkg.description && <p>{pkg.description}</p>}
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span>سرعة التحميل</span>
          <strong>
            {pkg.downloadSpeed ?? "—"}
            {pkg.downloadSpeed && <small> Mbps</small>}
          </strong>
        </div>

        <div className={styles.stat}>
          <span>السعة</span>
          <strong>
            {pkg.quota ?? "—"}
            {pkg.quota && <small> GB</small>}
          </strong>
        </div>
      </div>

      {hasPrice && (
        <div className={styles.priceRow}>
          {pkg.priceValue === 0 ? (
            <strong>مجانًا</strong>
          ) : (
            <>
              <strong>{pkg.price}</strong>
              <span>جنيه</span>
            </>
          )}

          {pkg.days ? (
            <small>{pkg.days === 30 ? "شهريًا" : `/ ${pkg.days} يوم`}</small>
          ) : null}
        </div>
      )}

      {pkg.features?.length > 0 && (
        <ul className={styles.features}>
          {pkg.features.map((feature) => (
            <li key={feature}>
              <span className={styles.check}>
                <Check size={12} strokeWidth={2.5} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {actionLabel && (
        <>
          <div className={styles.spacer} />

          <button
            type="button"
            className={
              variant === "primary" ? styles.btnPrimary : styles.btnOutline
            }
            onClick={onAction}
            disabled={actionDisabled}
          >
            {actionLabel}
            {!actionDisabled && <ArrowLeft size={16} />}
          </button>
        </>
      )}
    </article>
  );
};

export default PackageCard;
