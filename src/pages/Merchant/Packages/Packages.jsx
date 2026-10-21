import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  Package,
  Search,
  SlidersHorizontal,
  Wifi,
} from "lucide-react";
import styles from "./Packages.module.css";

const initialPackages = [
  {
    id: "PK-001",
    name: "جوكر نت 10",
    description: "باقة إنترنت للاستخدام اليومي",
    quota: "1.5 جيجا",
    price: 17,
    originalPrice: 20,
    bonus: 1.5,
    status: "متاحة",
  },
  {
    id: "PK-002",
    name: "جوكر نت 25",
    description: "باقة إنترنت للاستخدام المتوسط",
    quota: "3.5 جيجا",
    price: 42.5,
    originalPrice: 50,
    bonus: 4,
    status: "متاحة",
  },
  {
    id: "PK-003",
    name: "جوكر نت 50",
    description: "باقة إنترنت للاستخدام المكثف",
    quota: "7 جيجا",
    price: 85,
    originalPrice: 100,
    bonus: 8,
    status: "متاحة",
  },
  {
    id: "PK-004",
    name: "جوكر نت 5",
    description: "باقة إنترنت اقتصادية",
    quota: "750 ميجا",
    price: 8.5,
    originalPrice: 10,
    bonus: 0.5,
    status: "غير متاحة",
  },
];

const formatPrice = (value) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function Packages() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("الكل");

  const filteredPackages = useMemo(
    () =>
      initialPackages.filter((item) => {
        const matchesQuery = [
          item.name,
          item.id,
          item.description,
          item.quota,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase());

        const matchesStatus =
          filter === "الكل" || item.status === filter;

        return matchesQuery && matchesStatus;
      }),
    [query, filter]
  );

  const availableCount = initialPackages.filter(
    (item) => item.status === "متاحة"
  ).length;

  return (
    <div className={styles.page} dir="rtl">
      <header className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>
            إدارة المنتجات
          </span>

          <h2>الباقات</h2>

          <p>
            استعرض باقات الجوكر وتعرّف على أسعارها وتفاصيلها.
          </p>
        </div>

        <div className={styles.headerIcon}>
          <Package size={25} />
        </div>
      </header>

      <section className={styles.metrics}>
        <article className={styles.metric}>
          <span className={styles.metricIcon}>
            <Package size={20} />
          </span>

          <div>
            <span>إجمالي الباقات</span>
            <strong>{initialPackages.length}</strong>
            <small>كل الباقات المسجلة</small>
          </div>
        </article>

        <article className={styles.metric}>
          <span className={`${styles.metricIcon} ${styles.green}`}>
            <CheckCircle2 size={20} />
          </span>

          <div>
            <span>الباقات المتاحة</span>
            <strong>{availableCount}</strong>
            <small>متاحة للعرض</small>
          </div>
        </article>

        <article className={styles.metric}>
          <span className={`${styles.metricIcon} ${styles.blue}`}>
            <Wifi size={20} />
          </span>

          <div>
            <span>أنواع الإنترنت</span>
            <strong>{initialPackages.length}</strong>
            <small>ضمن البيانات التجريبية</small>
          </div>
        </article>
      </section>

      <section className={styles.catalog}>
        <div className={styles.catalogHeader}>
          <div>
            <h3>كتالوج الباقات</h3>
            <p>
              اختار الباقة المناسبة وراجع تفاصيلها.
            </p>
          </div>

          <span className={styles.resultCount}>
            {filteredPackages.length} باقات
          </span>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.search}>
            <Search size={19} />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث باسم الباقة أو الكود..."
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="مسح البحث"
              >
                ×
              </button>
            )}
          </label>

          <label className={styles.filter}>
            <SlidersHorizontal size={17} />

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="فلترة الباقات حسب الحالة"
            >
              <option value="الكل">كل الحالات</option>
              <option value="متاحة">متاحة</option>
              <option value="غير متاحة">غير متاحة</option>
            </select>
          </label>
        </div>

        {filteredPackages.length > 0 ? (
          <div className={styles.grid}>
            {filteredPackages.map((item) => (
              <article className={styles.packageCard} key={item.id}>
                <div className={styles.cardTop}>
                  <span className={styles.packageIcon}>
                    <Wifi size={23} />
                  </span>

                  <span
                    className={`${styles.status} ${
                      item.status === "متاحة"
                        ? styles.available
                        : styles.unavailable
                    }`}
                  >
                    <i />
                    {item.status}
                  </span>
                </div>

                <span className={styles.packageCode}>
                  {item.id}
                </span>

                <h4>{item.name}</h4>
                <p className={styles.description}>
                  {item.description}
                </p>

                <div className={styles.quota}>
                  <span>حجم الباقة</span>
                  <strong>{item.quota}</strong>
                </div>

                <div className={styles.priceBlock}>
                  <span>سعر التاجر</span>

                  <div className={styles.price}>
                    {formatPrice(item.price)}
                    <small>ج.م</small>
                  </div>

                  <span className={styles.originalPrice}>
                    السعر الأساسي: {formatPrice(item.originalPrice)} ج.م
                  </span>
                </div>

                <div className={styles.bonus}>
                  <span>قيمة الإضافي</span>
                  <strong>+{formatPrice(item.bonus)} ج.م</strong>
                </div>

                <button
                  type="button"
                  className={styles.detailsButton}
                  disabled={item.status !== "متاحة"}
                  onClick={() =>
                    window.alert(
                      "تفاصيل الطلب ستُفعّل بعد ربط الباقات بالـ API."
                    )
                  }
                >
                  {item.status === "متاحة"
                    ? "استعراض تفاصيل الطلب"
                    : "الباقة غير متاحة"}

                  <ChevronLeft size={17} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span>
              <Search size={25} />
            </span>

            <h4>ملقيناش باقات مطابقة</h4>

            <p>
              جرّبي تغيير كلمات البحث أو اختيار حالة مختلفة.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("الكل");
              }}
            >
              إعادة ضبط البحث
            </button>
          </div>
        )}

        <p className={styles.note}>
          <span>ⓘ</span>
          البيانات والأسعار المعروضة تجريبية، ويجب تأكيدها من
          الـ API قبل استخدامها في أي عملية فعلية.
        </p>
      </section>
    </div>
  );
}
