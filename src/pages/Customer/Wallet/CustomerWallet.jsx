import { useCallback, useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  CreditCard,
  Plus,
  ReceiptText,
  Wallet,
  RefreshCw,
  FileText,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import AppLayout from "../../../components/AppLayout/AppLayout";
import apiClient from "../../../lib/apiClient";
import styles from "./CustomerWallet.module.css";

const formatAmount = (value) =>
  Number(value ?? 0).toLocaleString("ar-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (value) => {
  if (!value) return "التاريخ غير متاح";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "التاريخ غير متاح";

  return date.toLocaleString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDateOnly = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const transactionTitle = (type) => {
  if (type === "credit") return "إضافة رصيد للمحفظة";
  if (type === "debit") return "خصم من المحفظة";
  return "معاملة مالية";
};

const statusLabel = (status) => {
  const statuses = {
    completed: "مكتملة",
    pending: "قيد الانتظار",
    paid: "مدفوعة",
    unpaid: "غير مدفوعة",
    failed: "فشلت",
    cancelled: "ملغاة",
    refunded: "تم رد المبلغ",
    processing: "قيد المعالجة",
    expired: "منتهية",
  };

  return statuses[status] || status || "غير محددة";
};

const getStatusClass = (status) => {
  if (["completed", "paid"].includes(status)) return styles.statusSuccess;
  if (["pending", "processing", "unpaid"].includes(status))
    return styles.statusPending;
  if (["failed", "cancelled", "expired"].includes(status))
    return styles.statusFailed;
  return "";
};

const CustomerWallet = () => {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [invoicesLoading, setInvoicesLoading] = useState(true);

  const [error, setError] = useState("");
  const [paymentsError, setPaymentsError] = useState("");
  const [invoicesError, setInvoicesError] = useState("");

  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [topUpError, setTopUpError] = useState("");

  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showAllPayments, setShowAllPayments] = useState(false);
  const [showAllInvoices, setShowAllInvoices] = useState(false);

  const fetchWallet = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const [walletResult, transactionsResult] = await Promise.allSettled([
        apiClient.get("/wallet"),
        apiClient.get("/wallet/transactions"),
      ]);

      if (walletResult.status === "fulfilled") {
        setBalance(walletResult.value.data?.balance ?? "0.00");
      } else {
        throw walletResult.reason;
      }

      if (transactionsResult.status === "fulfilled") {
        const data = transactionsResult.value.data?.transactions;
        setTransactions(Array.isArray(data) ? data : []);
      } else {
        setTransactions([]);
        setError(
          transactionsResult.reason?.response?.data?.message ||
            "تم تحميل الرصيد، لكن تعذر تحميل سجل المعاملات.",
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "تعذر تحميل بيانات المحفظة. برجاء المحاولة مرة أخرى.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchPayments = useCallback(async () => {
    setPaymentsLoading(true);
    setPaymentsError("");

    try {
      const response = await apiClient.get("/payments");
      const data = response.data?.payments;
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      setPaymentsError(
        err.response?.data?.message || "تعذر تحميل سجل المدفوعات.",
      );
    } finally {
      setPaymentsLoading(false);
    }
  }, []);

  const fetchInvoices = useCallback(async () => {
    setInvoicesLoading(true);
    setInvoicesError("");

    try {
      const response = await apiClient.get("/invoices");
      const data = response.data?.invoices;
      setInvoices(Array.isArray(data) ? data : []);
    } catch (err) {
      setInvoicesError(
        err.response?.data?.message || "تعذر تحميل الفواتير.",
      );
    } finally {
      setInvoicesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
    fetchPayments();
    fetchInvoices();
  }, [fetchWallet, fetchPayments, fetchInvoices]);

  const handleTopUp = async (event) => {
    event.preventDefault();

    const amount = Number(topUpAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setTopUpError("اكتبي مبلغ شحن صحيحًا أكبر من صفر.");
      return;
    }

    setTopUpLoading(true);
    setTopUpError("");

    try {
      const response = await apiClient.post("/wallet/top-up", { amount });
      const paymentUrl = response.data?.payment_url;

      if (!paymentUrl) {
        throw new Error("لم يتم استلام رابط الدفع من الخادم.");
      }

      let parsedUrl;

      try {
        parsedUrl = new URL(paymentUrl);
      } catch {
        throw new Error("رابط الدفع المستلم غير صالح.");
      }

      if (parsedUrl.protocol !== "https:") {
        throw new Error("رابط الدفع غير آمن.");
      }

      // Open the payment gateway supplied by the backend.
      window.location.assign(parsedUrl.href);
    } catch (err) {
      setTopUpError(
        err.response?.data?.message ||
          err.message ||
          "تعذر بدء عملية الشحن. برجاء المحاولة مرة أخرى.",
      );
      setTopUpLoading(false);
    }
  };

  const completedCredits = transactions
    .filter((item) => item.type === "credit" && item.status === "completed")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const completedDebits = transactions
    .filter((item) => item.type === "debit" && item.status === "completed")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const displayedTransactions = showAllTransactions
    ? transactions
    : transactions.slice(0, 5);

  const displayedPayments = showAllPayments
    ? payments
    : payments.slice(0, 5);

  const displayedInvoices = showAllInvoices
    ? invoices
    : invoices.slice(0, 5);

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>المحفظة</span>
              <h1>محفظتي</h1>
              <p>تابعي رصيدك ومعاملاتك المالية وفواتيرك في مكان واحد.</p>
            </div>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                setShowTopUp((previous) => !previous);
                setTopUpError("");
              }}
              disabled={topUpLoading}
            >
              <Plus size={18} />
              {showTopUp ? "إلغاء الشحن" : "شحن المحفظة"}
            </button>
          </header>

          {showTopUp && (
            <section className={styles.topUpCard}>
              <div className={styles.topUpHeading}>
                <span className={styles.walletIcon}>
                  <CreditCard size={20} />
                </span>
                <div>
                  <h2>شحن المحفظة</h2>
                  <p>حددي المبلغ، ثم تابعي إلى بوابة الدفع الآمنة.</p>
                </div>
              </div>

              <form className={styles.topUpForm} onSubmit={handleTopUp}>
                <label htmlFor="wallet-top-up-amount">مبلغ الشحن (جنيه)</label>
                <div className={styles.topUpControls}>
                  <input
                    id="wallet-top-up-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    inputMode="decimal"
                    placeholder="مثال: 200"
                    value={topUpAmount}
                    onChange={(event) => setTopUpAmount(event.target.value)}
                    disabled={topUpLoading}
                    required
                  />

                  <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={topUpLoading}
                  >
                    {topUpLoading ? (
                      <RefreshCw className={styles.spin} size={17} />
                    ) : (
                      <CreditCard size={17} />
                    )}
                    {topUpLoading ? "جارٍ تجهيز الدفع..." : "متابعة للدفع"}
                  </button>
                </div>

                {topUpError && (
                  <p className={styles.inlineError} role="alert">
                    {topUpError}
                  </p>
                )}

                <p className={styles.paymentHint}>
                  سيتم فتح بوابة الدفع التي يحددها الخادم. لن يتغير الرصيد
                  المعروض إلا بعد تأكيد الدفع وتحديث بيانات المحفظة من الخادم.
                </p>
              </form>
            </section>
          )}

          {error && (
            <div className={styles.errorMessage} role="alert">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => fetchWallet(true)}
                disabled={refreshing}
              >
                {refreshing ? "جارٍ التحديث..." : "إعادة المحاولة"}
              </button>
            </div>
          )}

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
                <span className={styles.activeBadge}>المحفظة</span>
              </div>

              <div className={styles.balance}>
                <strong>
                  {loading && balance === null ? "..." : formatAmount(balance)}
                </strong>
                <span>جنيه</span>
              </div>

              <div className={styles.balanceBottom}>
                <span>الرصيد الحالي من بيانات الخادم</span>
                <button
                  type="button"
                  className={styles.balanceAction}
                  onClick={() => fetchWallet(true)}
                  disabled={refreshing}
                >
                  <RefreshCw size={15} />
                  {refreshing ? "تحديث..." : "تحديث الرصيد"}
                </button>
              </div>
            </div>

            <div className={styles.statsCard}>
              <div className={styles.stat}>
                <span className={`${styles.statIcon} ${styles.incomeIcon}`}>
                  <ArrowDownLeft size={18} />
                </span>
                <div>
                  <small>إجمالي الشحن المكتمل</small>
                  <strong>
                    {loading ? "..." : `${formatAmount(completedCredits)} جنيه`}
                  </strong>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.stat}>
                <span className={`${styles.statIcon} ${styles.expenseIcon}`}>
                  <ArrowUpRight size={18} />
                </span>
                <div>
                  <small>إجمالي الخصم المكتمل</small>
                  <strong>
                    {loading ? "..." : `${formatAmount(completedDebits)} جنيه`}
                  </strong>
                </div>
              </div>
            </div>
          </section>

          {/* Wallet transactions */}
          <section className={styles.transactionsSection}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>سجل المحفظة</span>
                <h2>آخر المعاملات</h2>
              </div>

              <button
                type="button"
                className={styles.filterButton}
                onClick={() =>
                  setShowAllTransactions((previous) => !previous)
                }
                disabled={loading || transactions.length <= 5}
              >
                {showAllTransactions ? "عرض الأحدث فقط" : "كل العمليات"}
                <ArrowLeft size={15} />
              </button>
            </div>

            <div className={styles.transactionsCard}>
              {loading ? (
                <div className={styles.emptyState}>جارٍ تحميل المعاملات...</div>
              ) : transactions.length === 0 ? (
                <div className={styles.emptyState}>
                  <ReceiptText size={28} />
                  <strong>لا توجد معاملات حتى الآن</strong>
                  <span>ستظهر هنا عمليات الشحن والخصم الخاصة بك.</span>
                </div>
              ) : (
                displayedTransactions.map((transaction) => {
                  const isCredit = transaction.type === "credit";

                  return (
                    <div className={styles.transaction} key={transaction.id}>
                      <div
                        className={`${styles.transactionIcon} ${
                          isCredit
                            ? styles.transactionDeposit
                            : styles.transactionPayment
                        }`}
                      >
                        {isCredit ? (
                          <ArrowDownLeft size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </div>

                      <div className={styles.transactionInfo}>
                        <strong>{transactionTitle(transaction.type)}</strong>
                        <span>{formatDate(transaction.created_at)}</span>
                        <span>
                          {statusLabel(transaction.status)}
                          {transaction.balance_after != null &&
                            ` • الرصيد بعد العملية: ${formatAmount(transaction.balance_after)} جنيه`}
                        </span>
                      </div>

                      <div
                        className={`${styles.transactionAmount} ${
                          isCredit
                            ? styles.amountPositive
                            : styles.amountNegative
                        }`}
                      >
                        {isCredit ? "+" : "-"}
                        {formatAmount(transaction.amount)} جنيه
                      </div>
                    </div>
                  );
                })
              )}

              {!loading && transactions.length > 5 && (
                <button
                  type="button"
                  className={styles.viewAllButton}
                  onClick={() =>
                    setShowAllTransactions((previous) => !previous)
                  }
                >
                  <ReceiptText size={17} />
                  {showAllTransactions
                    ? "عرض المعاملات الأخيرة"
                    : "عرض جميع المعاملات"}
                  <ArrowLeft size={15} />
                </button>
              )}
            </div>
          </section>

          {/* Payments */}
          <section className={styles.transactionsSection}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>عمليات الدفع</span>
                <h2>المدفوعات</h2>
              </div>
              <button
                type="button"
                className={styles.filterButton}
                onClick={fetchPayments}
                disabled={paymentsLoading}
              >
                <RefreshCw size={14} />
                تحديث
              </button>
            </div>

            <div className={styles.transactionsCard}>
              {paymentsLoading ? (
                <div className={styles.emptyState}>جارٍ تحميل المدفوعات...</div>
              ) : paymentsError ? (
                <div className={styles.emptyState}>
                  <span>{paymentsError}</span>
                  <button
                    type="button"
                    className={styles.filterButton}
                    onClick={fetchPayments}
                  >
                    إعادة المحاولة
                  </button>
                </div>
              ) : payments.length === 0 ? (
                <div className={styles.emptyState}>
                  <CreditCard size={28} />
                  <strong>لا توجد مدفوعات</strong>
                  <span>ستظهر هنا تفاصيل عمليات الدفع المسجلة.</span>
                </div>
              ) : (
                displayedPayments.map((payment) => (
                  <div className={styles.financialRecord} key={payment.id}>
                    <span className={styles.recordIcon}>
                      <CreditCard size={19} />
                    </span>

                    <div className={styles.recordInfo}>
                      <strong>عملية دفع #{payment.id}</strong>
                      <span>
                        طريقة الدفع: {payment.method || "غير محددة"}
                      </span>
                      <span>{formatDate(payment.paid_at)}</span>
                    </div>

                    <div className={styles.recordEnd}>
                      <strong>{formatAmount(payment.amount)} جنيه</strong>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(payment.status)}`}
                      >
                        {statusLabel(payment.status)}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {!paymentsLoading && !paymentsError && payments.length > 5 && (
                <button
                  type="button"
                  className={styles.viewAllButton}
                  onClick={() => setShowAllPayments((previous) => !previous)}
                >
                  {showAllPayments ? "عرض الأحدث فقط" : "عرض كل المدفوعات"}
                  <ArrowLeft size={15} />
                </button>
              )}
            </div>
          </section>

          {/* Invoices */}
          <section className={styles.transactionsSection}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionEyebrow}>الفواتير</span>
                <h2>فواتيري</h2>
              </div>
              <button
                type="button"
                className={styles.filterButton}
                onClick={fetchInvoices}
                disabled={invoicesLoading}
              >
                <RefreshCw size={14} />
                تحديث
              </button>
            </div>

            <div className={styles.transactionsCard}>
              {invoicesLoading ? (
                <div className={styles.emptyState}>جارٍ تحميل الفواتير...</div>
              ) : invoicesError ? (
                <div className={styles.emptyState}>
                  <span>{invoicesError}</span>
                  <button
                    type="button"
                    className={styles.filterButton}
                    onClick={fetchInvoices}
                  >
                    إعادة المحاولة
                  </button>
                </div>
              ) : invoices.length === 0 ? (
                <div className={styles.emptyState}>
                  <FileText size={28} />
                  <strong>لا توجد فواتير</strong>
                  <span>ستظهر هنا الفواتير المسجلة على حسابك.</span>
                </div>
              ) : (
                displayedInvoices.map((invoice) => (
                  <div className={styles.financialRecord} key={invoice.id}>
                    <span className={styles.recordIcon}>
                      <FileText size={19} />
                    </span>

                    <div className={styles.recordInfo}>
                      <strong>
                        {invoice.invoice_number || `فاتورة #${invoice.id}`}
                      </strong>
                      <span>
                        تاريخ الاستحقاق: {formatDateOnly(invoice.due_date)}
                      </span>
                    </div>

                    <div className={styles.recordEnd}>
                      <strong>{formatAmount(invoice.amount)} جنيه</strong>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(invoice.status)}`}
                      >
                        {invoice.status === "paid" ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <Clock3 size={13} />
                        )}
                        {statusLabel(invoice.status)}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {!invoicesLoading && !invoicesError && invoices.length > 5 && (
                <button
                  type="button"
                  className={styles.viewAllButton}
                  onClick={() => setShowAllInvoices((previous) => !previous)}
                >
                  {showAllInvoices ? "عرض الأحدث فقط" : "عرض كل الفواتير"}
                  <ArrowLeft size={15} />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomerWallet;
