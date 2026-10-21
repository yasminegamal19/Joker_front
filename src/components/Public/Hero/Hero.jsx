import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppConfig } from "../../../context/AppConfigContext";
import styles from "./Hero.module.css";

const defaultBanners = [
  {
    id: "default-1",
    tag: "عرض لفترة محدودة",
    title: "ضعف الجيجات على باقات الإنترنت المنزلي",
    highlight: "بنفس السعر",
    description:
      "اشترك الآن أو جدد باقتك واحصل على 100% جيجابايت إضافية مجانًا لفترة محدودة.",
    buttonText: "اشترك في العرض",
    buttonLink: "/choose-user",
    badgeIcon: Zap,
    theme: "blue",
    offer: "2X",
    offerLabel: "جيجات",
    imageUrl: null,
  },
  {
    id: "default-2",
    tag: "خدمات الجوكر",
    title: "إدارة الإنترنت أصبحت أسهل",
    highlight: "من مكان واحد",
    description: "تابع باقتك، اشحن رصيدك، جدد اشتراكك واطلب الصيانة بكل سهولة.",
    buttonText: "اكتشف خدماتنا",
    buttonLink: "/services",
    badgeIcon: CheckCircle2,
    theme: "light",
    offer: "24/7",
    offerLabel: "خدمة ودعم",
    imageUrl: null,
  },
];

const mapApiBanners = (apiBanners = []) =>
  apiBanners.map((b, index) => ({
    id: b.id,
    tag: "عرض خاص",
    title: b.title,
    highlight: "",
    description: "",
    buttonText: b.link_url ? "اعرف أكتر" : "اشترك الآن",
    buttonLink: b.link_url || "/choose-user",
    badgeIcon: Sparkles,
    theme: index % 2 === 0 ? "blue" : "light",
    offer: "",
    offerLabel: "",
    imageUrl: b.image_url || null,
  }));

const isExternal = (url) => /^https?:\/\//i.test(url);

const SmartLink = ({ to, className, children }) =>
  isExternal(to) ? (
    <a href={to} className={className} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link to={to} className={className}>
      {children}
    </Link>
  );

const Hero = ({ banners: bannersProp }) => {
  const { config } = useAppConfig();

  const apiBanners = mapApiBanners(config.banners);
  const banners =
    bannersProp ?? (apiBanners.length ? apiBanners : defaultBanners);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCurrentSlide(0);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length < 2) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners.length) return null;

  const activeSlide = banners[currentSlide] ?? banners[0];
  const BadgeIcon = activeSlide.badgeIcon || Sparkles;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundShapeOne} />
      <div className={styles.backgroundShapeTwo} />

      <div className={styles.container}>
        <div className={styles.heroCard}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>
                <BadgeIcon size={15} />
              </span>

              <span>{activeSlide.tag}</span>

              <span className={styles.badgeDot} />
            </div>

            <h1 className={styles.title}>
              {activeSlide.title}
              {activeSlide.highlight && <span>{activeSlide.highlight}</span>}
            </h1>

            {activeSlide.description && (
              <p className={styles.description}>{activeSlide.description}</p>
            )}

            <div className={styles.actions}>
              <SmartLink
                to={activeSlide.buttonLink}
                className={styles.primaryButton}
              >
                <span>{activeSlide.buttonText}</span>
                <ArrowLeft size={18} />
              </SmartLink>

              <Link to="/packages" className={styles.secondaryButton}>
                <span>استعرض الباقات</span>
              </Link>
            </div>

            <div className={styles.trust}>
              <div className={styles.trustItem}>
                <CheckCircle2 size={17} />
                <span>خدمة موثوقة</span>
              </div>

              <div className={styles.trustItem}>
                <CheckCircle2 size={17} />
                <span>دعم سريع</span>
              </div>

              <div className={styles.trustItem}>
                <CheckCircle2 size={17} />
                <span>أسعار مناسبة</span>
              </div>
            </div>
          </div>

          <div className={`${styles.visual} ${styles[activeSlide.theme]}`}>
            {activeSlide.imageUrl && (
              <>
                <img
                  src={activeSlide.imageUrl}
                  alt={activeSlide.title}
                  className={styles.visualImage}
                />
                <div className={styles.visualImageOverlay} />
              </>
            )}

            <div className={styles.visualGlow} />

            <div className={styles.visualTop}>
              <span>الجوكر</span>
              <WifiIcon />
            </div>

            {!activeSlide.imageUrl && activeSlide.offer && (
              <div className={styles.offerVisual}>
                <span className={styles.offerSmall}>عرض</span>

                <strong>{activeSlide.offer}</strong>

                <span className={styles.offerLabel}>
                  {activeSlide.offerLabel}
                </span>
              </div>
            )}

            <div className={styles.visualBottom}>
              <div>
                <span>استمتع بالخدمة</span>
                <strong>بسرعة وبدون تعقيد</strong>
              </div>

              <div className={styles.signal}>
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className={styles.decorCircle} />
            <div className={styles.decorCircleSmall} />
          </div>
        </div>

        {banners.length > 1 && (
          <>
            <div className={styles.sliderFooter}>
              <div className={styles.slideInfo}>
                <span>{String(currentSlide + 1).padStart(2, "0")}</span>

                <div className={styles.progress}>
                  <div
                    className={styles.progressBar}
                    style={{
                      width: `${((currentSlide + 1) / banners.length) * 100}%`,
                    }}
                  />
                </div>

                <span className={styles.total}>
                  {String(banners.length).padStart(2, "0")}
                </span>
              </div>

              <div className={styles.sliderText}>
                عروض وخدمات مميزة من الجوكر
              </div>

              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.arrowButton}
                  onClick={previousSlide}
                  aria-label="العرض السابق"
                >
                  <ChevronRight size={19} />
                </button>

                <button
                  type="button"
                  className={styles.arrowButton}
                  onClick={nextSlide}
                  aria-label="العرض التالي"
                >
                  <ChevronLeft size={19} />
                </button>
              </div>
            </div>

            <div className={styles.dots}>
              {banners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  aria-label={`العرض ${index + 1}`}
                  className={`${styles.dot} ${
                    index === currentSlide ? styles.activeDot : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const WifiIcon = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 8.5C8.5 4 15.5 4 21 8.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6.5 12C10.2 9.2 13.8 9.2 17.5 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M10 15.5C11.3 14.5 12.7 14.5 14 15.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="19" r="1.4" fill="currentColor" />
  </svg>
);

export default Hero;
