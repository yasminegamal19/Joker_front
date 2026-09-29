import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  CreditCard,
  Plus,
  ReceiptText,
  Wallet,
} from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import styles from "./CustomerWallet.module.css";

const transactions = [
  {
    id: 1,
    title: "شحن المحفظة",
    date: "28 سبتمبر 2026 - 10:35 ص",
    amount: "+ 200.00 جنيه",
    type: "deposit",
  },
  {
    id: 2,
    title: "تجديد باقة الإنترنت",
    date: "15 سبتمبر 2026 - 09:20 م",
    amount: "- 150.00 جنيه",
    type: "payment",
  },
  {
    id: 3,
    title: "شحن المحفظة",
    date: "10 سبتمبر 2026 - 02:15 م",
    amount: "+ 300.00 جنيه",
    type: "deposit",
  },
  {
    id: 4,
    title: "شراء كارت إنترنت",
    date: "05 سبتمبر 2026 - 06:42 م",
    amount: "- 50.00 جنيه",
    type: "payment",
  },
];

const CustomerWallet = () => {
  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>المحفظة</span>
              <h1>محفظتي</h1>
              <p>تابع رصيدك وعمليات الدفع والشحن الخاصة بك.</p>
            </div>

            <button type="button" className={styles.primaryButton}>
              <Plus size={18} />
              شحن المحفظة
            </button>
          </header>

          <section className={styles.walletOverview}>
            <div className={styles.balanceCard}>
              <div className={styles.balanceTop}>
                <div className={styles.balanceTitle}>
                  <span className={styles.walletIcon}>
                    <Wallet size={21} />
                  </span>

                  <div>
                    <span>الرصيد المتاح</span>
                    <small>محفظة جوكر</small>
                  </div>
                </div>

                <span className={styles.activeBadge}>نشطة</span>
              </div>

              <div className={styles.balance}>
                <strong>250.00</strong>
                <span>جنيه</span>
              </div>

              <div className={styles.balanceBottom}>
                <span>آخر تحديث منذ دقائق</span>

                <button type="button" className={styles.balanceAction}>
                  <CreditCard size={15} />
                  طرق الدفع
                </button>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.stat}>
                <span className={`${styles.statIcon} ${styles.incomeIcon}`}>
                  <ArrowDownLeft size={18} />
                </span>

                <div>
                  <small>إجمالي الشحن</small>
                  <strong>500.00 جنيه</strong>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.stat}>
                <span className={`${styles.statIcon} ${styles.expenseIcon}`}>
                  <ArrowUpRight size={18} />
                </span>

                <div>
                  <small>إجمالي المدفوعات</small>
                  <strong>200.00 جنيه</strong>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.transactionsSection}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>سجل العمليات</span>
                <h2>آخر المعاملات</h2>
              </div>

              <button type="button" className={styles.filterButton}>
                كل العمليات
                <ArrowLeft size={15} />
              </button>
            </div>

            <div className={styles.transactionsCard}>
              {transactions.map((transaction) => {
                const isDeposit = transaction.type === "deposit";

                return (
                  <div className={styles.transaction} key={transaction.id}>
                    <div
                      className={`${styles.transactionIcon} ${
                        isDeposit
                          ? styles.transactionDeposit
                          : styles.transactionPayment
                      }`}
                    >
                      {isDeposit ? (
                        <ArrowDownLeft size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>

                    <div className={styles.transactionInfo}>
                      <strong>{transaction.title}</strong>
                      <span>{transaction.date}</span>
                    </div>

                    <div
                      className={`${styles.transactionAmount} ${
                        isDeposit
                          ? styles.amountPositive
                          : styles.amountNegative
                      }`}
                    >
                      {transaction.amount}
                    </div>
                  </div>
                );
              })}

              <button type="button" className={styles.viewAllButton}>
                <ReceiptText size={17} />
                عرض جميع المعاملات
                <ArrowLeft size={15} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerWallet;
