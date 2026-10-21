import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard, Plus, Search, SlidersHorizontal, Wifi, CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./Cards.module.css";

const initialCards = [
  { id: "JK-001", name: "كارت جوكر 10 جنيه", value: 10, stock: 84, sold: 126, status: "متاح" },
  { id: "JK-002", name: "كارت جوكر 20 جنيه", value: 20, stock: 62, sold: 98, status: "متاح" },
  { id: "JK-003", name: "كارت جوكر 50 جنيه", value: 50, stock: 17, sold: 74, status: "مخزون منخفض" },
  { id: "JK-004", name: "كارت جوكر 100 جنيه", value: 100, stock: 0, sold: 32, status: "نفد المخزون" },
  { id: "JK-005", name: "كارت جوكر 5 جنيه", value: 5, stock: 110, sold: 143, status: "متاح" },
];

export default function Cards() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("الكل");
  const cards = useMemo(() => initialCards.filter(card =>
    (`${card.id} ${card.name}`).toLowerCase().includes(query.toLowerCase()) &&
    (filter === "الكل" || card.status === filter)
  ), [query, filter]);
  return <div className={styles.page} dir="rtl">
    <header className={styles.header}><div><button className={styles.back} onClick={() => navigate("/merchant/home")}><ArrowRight size={17}/> الرئيسية</button><p className={styles.eyebrow}>بوابة التاجر / إدارة المنتجات</p><h1>إدارة البطاقات</h1><p className={styles.subtitle}>تابع مخزون بطاقات الجوكر وحركة البيع من مكان واحد.</p></div><button className={styles.primary} onClick={() => window.alert("إضافة البطاقات ستُفعّل عند تجهيز آلية المخزون.")}><Plus size={18}/> إضافة بطاقات</button></header>
    <section className={styles.metrics}><article><span className={styles.metricIcon}><CreditCard size={20}/></span><div><small>إجمالي أنواع البطاقات</small><strong>5</strong></div></article><article><span className={`${styles.metricIcon} ${styles.green}`}><CheckCircle2 size={20}/></span><div><small>متاحة للبيع</small><strong>3 أنواع</strong></div></article><article><span className={`${styles.metricIcon} ${styles.orange}`}><AlertCircle size={20}/></span><div><small>تحتاج متابعة المخزون</small><strong>نوعان</strong></div></article></section>
    <section className={styles.panel}><div className={styles.toolbar}><div><h2>بطاقات المتجر</h2><p>قائمة البطاقات والأسعار والكميات الحالية</p></div><label className={styles.search}><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث باسم البطاقة أو الكود"/></label><label className={styles.filter}><SlidersHorizontal size={17}/><select value={filter} onChange={e=>setFilter(e.target.value)}><option>الكل</option><option>متاح</option><option>مخزون منخفض</option><option>نفد المخزون</option></select></label></div>
    <div className={styles.grid}>{cards.map(card=><article className={styles.card} key={card.id}><div className={styles.cardTop}><span className={styles.cardArt}><Wifi size={24}/></span><span className={`${styles.status} ${card.status === "متاح" ? styles.available : card.status === "مخزون منخفض" ? styles.low : styles.out}`}>{card.status}</span></div><p className={styles.code}>{card.id}</p><h3>{card.name}</h3><strong className={styles.price}>{card.value.toFixed(2)} <small>ج.م</small></strong><div className={styles.cardStats}><div><span>المخزون الحالي</span><b>{card.stock} كارت</b></div><div><span>إجمالي المبيعات</span><b>{card.sold} كارت</b></div></div><button className={styles.secondary} onClick={() => window.alert("تفاصيل وتعديل البطاقة ستُتاح بعد ربط بيانات المخزون.")}>عرض التفاصيل</button></article>)}{cards.length===0&&<div className={styles.empty}>مفيش بطاقات مطابقة للبحث أو الفلتر.</div>}</div><p className={styles.note}>بيانات تجريبية للعرض فقط — سيتم ربط المخزون والمبيعات بالـ Backend لاحقًا.</p></section>
  </div>;
}
