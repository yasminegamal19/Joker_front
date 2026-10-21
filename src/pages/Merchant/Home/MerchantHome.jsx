import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  CircleHelp,
  CreditCard,
  Package,
  ShoppingBag,
  Wallet,
  Wifi,
} from "lucide-react";

import styles from "./MerchantHome.module.css";

const packages = [
  {
    name: "كارت جوكر 25",
    description: "كارت إنترنت (3.5 جيجا)",
    price: "42.50",
    oldPrice: "50.00",
    bonus: "4.00",
  },
  {
    name: "كارت جوكر 50",
    description: "كارت إنترنت (7 جيجا)",
    price: "85.00",
    oldPrice: "100.00",
    bonus: "8.00",
  },
  {
    name: "كارت جوكر 10",
    description: "كارت إنترنت (1.5 جيجا)",
    price: "17.00",
    oldPrice: "20.00",
    bonus: "1.50",
  },
];

const transactions = [
  {
    name: "استلام شحنة كروت فئة 10",
    date: "اليوم، 10:25 ص",
    amount: "850.00",
    type: "in",
  },
  {
    name: "سداد مديونية الجوكر",
    date: "أمس، 02:15 م",
    amount: "2,000.00",
    type: "out",
  },
  {
    name: "استلام شحنة كروت فئة 10",
    date: "20 أكتوبر، 11:40 ص",
    amount: "150.00",
    type: "in",
  },
  {
    name: "تسوية حساب التاجر",
    date: "19 أكتوبر، 04:10 م",
    amount: "500.00",
    type: "out",
  },
];

export default function MerchantHome() {
  const navigate = useNavigate();

  return (
    <div className={styles.content} dir="rtl">
      <section className={styles.welcome}>
        <div>
          <span className={styles.eyebrow}>
            مرحبًا بعودتك 👋
          </span>

          <h2>أهلاً بيك، محمد محمود</h2>

          <p>
            تابع حسابك وبطاقاتك وعملياتك من مكان واحد.
          </p>
        </div>

        <span className={styles.accountStatus}>
          <i />
          الحساب نشط تجريبيًا
        </span>
      </section>

      <section className={styles.promo}>
        <div className={styles.promoIcon}>
          <Package size={22} />
        </div>

        <div className={styles.promoText}>
          <span>عروض الجوكر الجديدة</span>

          <h3>اكتشف الباقات والكروت المتاحة</h3>

          <p>
            تابع أحدث الفئات والعروض الخاصة بنشاطك.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/merchant/packages")}
        >
          عرض الباقات
          <ChevronLeft size={17} />
        </button>

        <div className={styles.promoOrb} />
      </section>

      <section className={styles.summaryGrid}>
        <article className={styles.subscriptionCard}>
          <div className={styles.sectionHeading}>
            <div>
              <span>حساب التاجر</span>
              <h3>ملخص الحساب</h3>
            </div>

            <span className={styles.statusPill}>
              ● نشط
            </span>
          </div>

          <div className={styles.subscriptionBody}>
            <div className={styles.roundIcon}>
              <CreditCard size={21} />
            </div>

            <div>
              <strong>حساب متجر الجوكر</strong>
              <span>رقم الخدمة: JK-002821</span>
            </div>
          </div>

          <div className={styles.subscriptionFoot}>
            <span>حالة الحساب</span>
            <strong>نشط وجاهز للعمليات</strong>
          </div>
        </article>

        <article className={styles.balanceCard}>
          <div className={styles.sectionHeading}>
            <div>
              <span>الملخص المالي</span>
              <h3>المستحقات الحالية</h3>
            </div>

            <div className={styles.balanceIcon}>
              <Wallet size={20} />
            </div>
          </div>

          <strong className={styles.balance}>
            4,850.00 <small>ج.م</small>
          </strong>

          <span className={styles.balanceHint}>
            إجمالي الرصيد التجريبي
          </span>

          <button
            type="button"
            onClick={() => navigate("/merchant/wallet")}
          >
            عرض تفاصيل الحساب
            <ChevronLeft size={16} />
          </button>
        </article>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <div>
            <span className={styles.eyebrow}>
              اختيارات الجوكر
            </span>

            <h2>باقات وكروت جوكر نت</h2>
          </div>

          <button
            type="button"
            className={styles.textLink}
            onClick={() => navigate("/merchant/packages")}
          >
            عرض كل الباقات
            <ChevronLeft size={16} />
          </button>
        </div>

        <div className={styles.packagesGrid}>
          {packages.map((item) => (
            <article
              className={styles.packageCard}
              key={item.name}
            >
              <div className={styles.packageHeader}>
                <div className={styles.packageIcon}>
                  <Wifi size={19} />
                </div>

                <div>
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                </div>

                <span className={styles.available}>
                  متاح
                </span>
              </div>

              <div className={styles.packagePrices}>
                <div>
                  <span>سعر التاجر</span>
                  <strong>
                    {item.price} <small>ج.م</small>
                  </strong>
                </div>

                <div>
                  <span>السعر الأساسي</span>
                  <strong>
                    {item.oldPrice} <small>ج.م</small>
                  </strong>
                </div>

                <div>
                  <span>إضافي</span>
                  <strong className={styles.bonus}>
                    {item.bonus} <small>ج.م</small>
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className={styles.packageAction}
                onClick={() => navigate("/merchant/packages")}
              >
                <ShoppingBag size={16} />
                استعراض الباقات
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <div>
            <span className={styles.eyebrow}>
              آخر تحديثات حسابك
            </span>

            <h2>سجل العمليات</h2>
          </div>

          <button
            type="button"
            className={styles.textLink}
            onClick={() => navigate("/merchant/transactions")}
          >
            كل العمليات
            <ChevronLeft size={16} />
          </button>
        </div>

        <div className={styles.transactions}>
          {transactions.map((item, index) => (
            <article
              className={styles.transaction}
              key={`${item.name}-${index}`}
            >
              <div
                className={`${styles.transactionIcon} ${
                  item.type === "in"
                    ? styles.incoming
                    : styles.outgoing
                }`}
              >
                {item.type === "in" ? (
                  <CreditCard size={18} />
                ) : (
                  <Wallet size={18} />
                )}
              </div>

              <div className={styles.transactionInfo}>
                <strong>{item.name}</strong>
                <span>{item.date}</span>
              </div>

              <div
                className={`${styles.transactionAmount} ${
                  item.type === "in"
                    ? styles.positive
                    : styles.negative
                }`}
              >
                {item.type === "in" ? "+" : "−"} {item.amount}
                {" "}
                <small>ج.م</small>

                <span>
                  {item.type === "in"
                    ? "إضافة رصيد"
                    : "خصم من الحساب"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <CircleHelp size={18} />

          <div>
            <strong>محتاج مساعدة؟</strong>
            <span>
              فريق دعم الجوكر جاهز لمساعدتك على مدار اليوم.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            window.alert("سيتم تفعيل مركز الدعم لاحقًا.")
          }
        >
          تواصل مع الدعم
          <ChevronLeft size={16} />
        </button>
      </footer>
    </div>
  );
}
