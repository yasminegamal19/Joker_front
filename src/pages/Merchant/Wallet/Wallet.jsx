import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowUpLeft,
  CalendarDays,
  ChevronLeft,
  CircleDollarSign,
  Clock3,
  Download,
  Search,
  Wallet as WalletIcon,
} from "lucide-react";

import styles from "./Wallet.module.css";

const INITIAL_TRANSACTIONS = [
  {
    id: "TX-1028",
    title: "استلام شحنة كروت جوكر",
    description: "شحنة كروت فئة 25",
    date: "21 أكتوبر 2026",
    time: "10:25 ص",
    amount: 1250,
    type: "deposit",
    status: "completed",
  },
  {
    id: "TX-1027",
    title: "خصم قيمة شحنة",
    description: "شحنة كروت فئة 50",
    date: "20 أكتوبر 2026",
    time: "02:15 م",
    amount: 2000,
    type: "withdrawal",
    status: "completed",
  },
  {
    id: "TX-1026",
    title: "إضافة رصيد للمحفظة",
    description: "تسوية حساب التاجر",
    date: "19 أكتوبر 2026",
    time: "11:40 ص",
    amount: 1500,
    type: "deposit",
    status: "completed",
  },
  {
    id: "TX-1025",
    title: "خصم مستحقات",
    description: "تسوية حساب التاجر",
    date: "18 أكتوبر 2026",
    time: "04:10 م",
    amount: 500,
    type: "withdrawal",
    status: "pending",
  },
  {
    id: "TX-1024",
    title: "إضافة رصيد للمحفظة",
    description: "عملية تجريبية",
    date: "17 أكتوبر 2026",
    time: "01:30 م",
    amount: 800,
    type: "deposit",
    status: "failed",
  },
];

const INITIAL_BALANCE = 4850;

const formatMoney = (amount) =>
  new Intl.NumberFormat("ar-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

const STATUS_LABELS = {
  completed: "مكتملة",
  pending: "قيد التنفيذ",
  failed: "فشلت",
};

export default function Wallet() {
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        !normalizedSearch ||
        transaction.title.toLowerCase().includes(normalizedSearch) ||
        transaction.description.toLowerCase().includes(normalizedSearch) ||
        transaction.id.toLowerCase().includes(normalizedSearch);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, search, typeFilter, statusFilter]);

  const totalDeposits = transactions
    .filter((item) => item.type === "deposit" && item.status === "completed")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalWithdrawals = transactions
    .filter((item) => item.type === "withdrawal" && item.status === "completed")
    .reduce((sum, item) => sum + item.amount, 0);

  const downloadTransactions = () => {
    const escapeCsv = (value) => `"${String(value).replace(/"/g, '""')}"`;

    const rows = [
      [
        "رقم العملية",
        "العملية",
        "التفاصيل",
        "التاريخ",
        "النوع",
        "المبلغ",
        "الحالة",
      ],
      ...filteredTransactions.map((item) => [
        item.id,
        item.title,
        item.description,
        `${item.date} ${item.time}`,
        item.type === "deposit" ? "إيداع" : "خصم",
        item.amount.toFixed(2),
        STATUS_LABELS[item.status],
      ]),
    ];

    const csv =
      "\uFEFF" + rows.map((row) => row.map(escapeCsv).join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "joker-wallet-transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.page} dir="rtl">
      <header className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>الإدارة المالية</span>
          <h1>المحفظة</h1>
          <p>تابع رصيدك وحركاتك المالية من مكان واحد.</p>
        </div>

        <button
          type="button"
          className={styles.exportButton}
          onClick={downloadTransactions}
        >
          <Download size={17} />
          تصدير العمليات
        </button>
      </header>

      <section className={styles.balanceBanner}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerLabel}>
            <span className={styles.bannerIcon}>
              <WalletIcon size={21} />
            </span>
            <span>الرصيد الحالي</span>
          </div>

          <strong className={styles.mainBalance}>
            {formatMoney(INITIAL_BALANCE)}
            <small>ج.م</small>
          </strong>

          <span className={styles.balanceCaption}>
            الرصيد المعروض تجريبي لحين ربط المحفظة بالبيانات الفعلية.
          </span>
        </div>

        <div className={styles.bannerDecoration} />

        <div className={styles.bannerSide}>
          <span>رقم المحفظة</span>
          <strong>JW-002821</strong>
          <span className={styles.demoBadge}>حساب تجريبي</span>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.blueIcon}`}>
            <CircleDollarSign size={21} />
          </div>
          <span className={styles.statLabel}>إجمالي الإيداعات المكتملة</span>
          <strong className={styles.statValue}>
            {formatMoney(totalDeposits)} <small>ج.م</small>
          </strong>
          <span className={styles.statHint}>حسب البيانات التجريبية</span>
        </article>

        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.redIcon}`}>
            <ArrowUpLeft size={21} />
          </div>
          <span className={styles.statLabel}>إجمالي الخصومات المكتملة</span>
          <strong className={styles.statValue}>
            {formatMoney(totalWithdrawals)} <small>ج.م</small>
          </strong>
          <span className={styles.statHint}>حسب البيانات التجريبية</span>
        </article>

        <article className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.greenIcon}`}>
            <ArrowDownLeft size={21} />
          </div>
          <span className={styles.statLabel}>عدد العمليات المكتملة</span>
          <strong className={styles.statValue}>
            {transactions.filter((item) => item.status === "completed").length}
          </strong>
          <span className={styles.statHint}>
            من إجمالي {transactions.length} عمليات
          </span>
        </article>
      </section>

      <section className={styles.historySection}>
        <div className={styles.historyHeader}>
          <div>
            <span className={styles.eyebrow}>حركة الحساب</span>
            <h2>سجل عمليات المحفظة</h2>
            <p>راجعي تفاصيل الإيداعات والخصومات وحالة كل عملية.</p>
          </div>

          <span className={styles.resultsCount}>
            {filteredTransactions.length} عمليات
          </span>
        </div>

        <div className={styles.filters}>
          <label className={styles.searchBox}>
            <Search size={18} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحثي برقم العملية أو اسمها..."
              aria-label="البحث في عمليات المحفظة"
            />
          </label>

          <label className={styles.selectWrap}>
            <span>نوع العملية</span>
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              <option value="all">كل العمليات</option>
              <option value="deposit">إيداعات</option>
              <option value="withdrawal">خصومات</option>
            </select>
          </label>

          <label className={styles.selectWrap}>
            <span>حالة العملية</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">كل الحالات</option>
              <option value="completed">مكتملة</option>
              <option value="pending">قيد التنفيذ</option>
              <option value="failed">فشلت</option>
            </select>
          </label>
        </div>

        <div className={styles.transactionList}>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((item) => (
              <article className={styles.transactionRow} key={item.id}>
                <div
                  className={`${styles.transactionIcon} ${
                    item.type === "deposit"
                      ? styles.depositIcon
                      : styles.withdrawalIcon
                  }`}
                >
                  {item.type === "deposit" ? (
                    <ArrowDownToLine size={20} />
                  ) : (
                    <ArrowUpLeft size={20} />
                  )}
                </div>

                <div className={styles.transactionDetails}>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                  <span className={styles.mobileDate}>
                    <CalendarDays size={13} />
                    {item.date} — {item.time}
                  </span>
                </div>

                <div className={styles.transactionDate}>
                  <span>{item.date}</span>
                  <small>
                    <Clock3 size={13} />
                    {item.time}
                  </small>
                </div>

                <div className={styles.transactionAmount}>
                  <strong
                    className={
                      item.type === "deposit"
                        ? styles.positiveAmount
                        : styles.negativeAmount
                    }
                  >
                    {item.type === "deposit" ? "+" : "−"}
                    {formatMoney(item.amount)}
                    <small>ج.م</small>
                  </strong>

                  <span className={`${styles.status} ${styles[item.status]}`}>
                    <i />
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>

                <span className={styles.transactionId}>{item.id}</span>
              </article>
            ))
          ) : (
            <div className={styles.emptyState}>
              <span>
                <Search size={24} />
              </span>
              <strong>مفيش عمليات مطابقة</strong>
              <p>جرّبي تغيّري كلمات البحث أو الفلاتر.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                  setStatusFilter("all");
                }}
              >
                عرض كل العمليات
                <ChevronLeft size={16} />
              </button>
            </div>
          )}
        </div>

        <div className={styles.historyFooter}>
          <span>البيانات المعروضة تجريبية وليست سجلًا ماليًا حقيقيًا.</span>
          <span>
            {filteredTransactions.length} من {transactions.length}
          </span>
        </div>
      </section>
    </div>
  );
}
