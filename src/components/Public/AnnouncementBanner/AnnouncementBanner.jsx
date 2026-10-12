import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./AnnouncementBanner.module.css";

const demoAds = [
  {
    id: 1,
    badge: "عرض جديد",
    title: "استمتع بعروض الجوكر الحصرية",
    description:
      "اختار الباقة المناسبة ليك واستمتع بتجربة إنترنت أسرع وأسهل.",
    buttonText: "اكتشف العرض",
    buttonUrl: "#packages",
    image: null,
  },
  {
    id: 2,
    badge: "لفترة محدودة",
    title: "خليك متصل بدون توقف",
    description:
      "جدّد باقتك بسهولة واستمتع بخدمات الجوكر من مكان واحد.",
    buttonText: "اعرف المزيد",
    buttonUrl: "#services",
    image: null,
  },
];

const AnnouncementBanner = ({ ads = demoAds }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeAd = ads[activeIndex];

  useEffect(() => {
    if (ads.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ads.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [ads.length]);

  if (!ads.length) {
    return null;
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % ads.length);
  };

  const previousSlide = () => {
    setActiveIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <section className={styles.banner} aria-label="الإعلانات">
      <div className={styles.backgroundGlow} />

      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Sparkles size={15} />
            <span>{activeAd.badge || "إعلان"}</span>
          </div>

          <h2>{activeAd.title}</h2>

          {activeAd.description && (
            <p>{activeAd.description}</p>
          )}

          {activeAd.buttonText && activeAd.buttonUrl && (
            <a
              href={activeAd.buttonUrl}
              className={styles.button}
            >
              {activeAd.buttonText}
              <ArrowLeft size={17} />
            </a>
          )}
        </div>

        <div className={styles.visual}>
          {activeAd.image ? (
            <img
              src={activeAd.image}
              alt={activeAd.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.visualPlaceholder}>
              <div className={styles.signal}>
                <span />
                <span />
                <span />
              </div>

              <strong>JOKER</strong>
              <small>ابقَ متصلًا</small>
            </div>
          )}
        </div>

        {ads.length > 1 && (
          <div className={styles.controls}>
            <button
              type="button"
              onClick={previousSlide}
              aria-label="الإعلان السابق"
            >
              <ChevronRight size={19} />
            </button>

            <div className={styles.dots}>
              {ads.map((ad, index) => (
                <button
                  key={ad.id}
                  type="button"
                  className={
                    index === activeIndex ? styles.activeDot : ""
                  }
                  onClick={() => setActiveIndex(index)}
                  aria-label={`الإعلان ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="الإعلان التالي"
            >
              <ChevronLeft size={19} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementBanner;