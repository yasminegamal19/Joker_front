import {
  CreditCard,
  Headphones,
  MapPin,
  RefreshCcw,
  Wallet,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Services.module.css";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Wallet,
      title: "شحن المحفظة",
      description: "اشحن رصيدك بسهولة واستخدمه في تجديد الباقات والخدمات.",
      action: "اشحن الآن",
      path: "/choose-user",
    },
    {
      icon: RefreshCcw,
      title: "تجديد الباقة",
      description: "جدّد باقتك الحالية واستمر في استخدام الإنترنت بدون توقف.",
      action: "جدّد باقتك",
      path: "/choose-user",
    },
    {
      icon: CreditCard,
      title: "كروت الإنترنت",
      description: "احصل على كروت الإنترنت المناسبة لك من أقرب متجر.",
      action: "اعرف المزيد",
      path: "#packages",
    },
    {
      icon: Zap,
      title: "اختبار السرعة",
      description: "اختبر سرعة اتصالك بالإنترنت وتابع أداء الخدمة.",
      action: "اختبر السرعة",
      path: "/choose-user",
    },
    {
      icon: Headphones,
      title: "طلب صيانة",
      description: "واجهتك مشكلة؟ اطلب فني صيانة في الوقت المناسب لك.",
      action: "اطلب صيانة",
      path: "/choose-user",
    },
    {
      icon: MapPin,
      title: "أقرب متجر",
      description: "تعرف على المتاجر التي توفر خدمات وكروت الجوكر بالقرب منك.",
      action: "اعثر على متجر",
      path: "#stores",
    },
  ];

  const handleClick = (path) => {
    if (path.startsWith("#")) {
      document.querySelector(path)?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }

    navigate(path);
  };

  return (
    <section className={styles.services} id="services">
      <div className={`container ${styles.container}`}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>خدمات الجوكر</span>

          <h2>
            كل ما تحتاجه
            <span> في مكان واحد</span>
          </h2>

          <p>
            خدمات متكاملة تساعدك على إدارة الإنترنت والرصيد والصيانة بكل سهولة.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className={styles.card} key={service.title}>
                <div className={styles.icon}>
                  <Icon size={21} strokeWidth={2} />
                </div>

                <div className={styles.cardContent}>
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <button
                    type="button"
                    className={styles.cardAction}
                    onClick={() => handleClick(service.path)}
                  >
                    {service.action}
                    <span>←</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
