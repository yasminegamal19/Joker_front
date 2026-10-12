import { ArrowLeft, CreditCard, Headphones, Wallet, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Services.module.css";

const servicesList = [
  {
    icon: Wifi,
    number: "01",
    title: "الإنترنت المنزلي",
    desc: "باقات إنترنت بسرعات مختلفة واستقرار يساعدك على الاستمتاع بالتصفح والبث والعمل بدون انقطاع.",
    link: "/packages",
    featured: true,
  },
  {
    icon: Wallet,
    number: "02",
    title: "محفظة الجوكر",
    desc: "اشحن رصيدك، تابع معاملاتك وادفع خدماتك بسهولة من مكان واحد.",
    link: "/choose-user",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "سداد الاشتراكات",
    desc: "جدّد باقتك وسدد مستحقاتك بسرعة وأمان بدون خطوات معقدة.",
    link: "/choose-user",
  },
  {
    icon: Headphones,
    number: "04",
    title: "الدعم والصيانة",
    desc: "اطلب الدعم أو الصيانة وتابع طلبك لحد ما المشكلة تتحل.",
    link: "/choose-user",
  },
];

const Services = () => {
  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headingSide}>
            <span className={styles.subTitle}>خدمات الجوكر</span>

            <h2>
              كل خدماتك
              <span> في مكان واحد</span>
            </h2>
          </div>

          <div className={styles.descriptionSide}>
            <p>
              من الإنترنت المنزلي والشحن، لحد الدفع والصيانة. بنوفر لك كل اللي
              تحتاجه عشان تفضل متصل بسهولة.
            </p>

            <div className={styles.headerLine}>
              <span />
              <span />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {servicesList.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className={`${styles.serviceCard} ${
                  service.featured ? styles.featured : ""
                }`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.number}>{service.number}</span>

                  <div className={styles.iconWrapper}>
                    <Icon size={23} strokeWidth={1.9} />
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3>{service.title}</h3>

                  <p>{service.desc}</p>
                </div>

                <Link to={service.link} className={styles.cardLink}>
                  <span>اكتشف الخدمة</span>

                  <span className={styles.arrow}>
                    <ArrowLeft size={16} />
                  </span>
                </Link>

                <div className={styles.cardAccent} />
              </article>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className={styles.bottomBanner}>
          <div className={styles.bannerIcon}>
            <Wifi size={21} />
          </div>

          <div className={styles.bannerText}>
            <strong>كل حاجة متوصلة ببعض</strong>
            <span>
              حساب واحد تقدر من خلاله تدير الإنترنت والخدمات الخاصة بيك.
            </span>
          </div>

          <Link to="/choose-user" className={styles.bannerLink}>
            ابدأ الآن
            <ArrowLeft size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
