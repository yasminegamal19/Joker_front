import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileImage,
  IdCard,
  LockKeyhole,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  UploadCloud,
  UserRound,
  X,
} from "lucide-react";
import styles from "./CustomerJoin.module.css";

const loadLeaflet = () =>
  new Promise((resolve, reject) => {
    if (window.L) {
      resolve(window.L);
      return;
    }

    const existingScript = document.querySelector("#joker-leaflet-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.L), { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    if (!document.querySelector("#joker-leaflet-style")) {
      const link = document.createElement("link");
      link.id = "joker-leaflet-style";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.id = "joker-leaflet-script";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.body.appendChild(script);
  });

const CustomerJoin = () => {
  const navigate = useNavigate();
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    phone: "",
    password: "",
    address: "",
  });
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [mapError, setMapError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitNotice, setSubmitNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    loadLeaflet()
      .then((L) => {
        if (cancelled || !mapElement.current || mapRef.current) return;

        const initialPosition = [30.0444, 31.2357];
        const map = L.map(mapElement.current, {
          scrollWheelZoom: false,
        }).setView(initialPosition, 11);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        map.on("click", async (event) => {
          const coords = {
            lat: Number(event.latlng.lat.toFixed(6)),
            lng: Number(event.latlng.lng.toFixed(6)),
          };

          setLocation(coords);
          setMapError("");

          if (markerRef.current) markerRef.current.remove();
          markerRef.current = L.marker([coords.lat, coords.lng])
            .addTo(map)
            .bindPopup("موقع الخدمة المحدد")
            .openPopup();

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}&accept-language=ar`
            );
            if (!response.ok) throw new Error("تعذر تحديد العنوان تلقائيًا.");
            const data = await response.json();
            if (data.display_name) {
              setFormData((previous) => ({
                ...previous,
                address: data.display_name,
              }));
            }
          } catch {
            setMapError("تم تحديد الموقع، لكن تعذر جلب العنوان تلقائيًا. يمكنك كتابة العنوان يدويًا.");
          }
        });

        mapRef.current = map;
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setMapError("تعذر تحميل الخريطة. تحقق من اتصال الإنترنت وحاول تحديث الصفحة.");
        }
      });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setSubmitNotice("");
  };

  const handleImageChange = (event, side) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitNotice("من فضلك اختاري ملف صورة صالحًا.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSubmitNotice("حجم الصورة يجب ألا يتجاوز 5 ميجابايت.");
      event.target.value = "";
      return;
    }

    const image = {
      file,
      preview: URL.createObjectURL(file),
    };

    if (side === "front") setFrontImage(image);
    else setBackImage(image);
    setSubmitNotice("");
  };

  const removeImage = (side) => {
    const image = side === "front" ? frontImage : backImage;
    if (image?.preview) URL.revokeObjectURL(image.preview);
    if (side === "front") setFrontImage(null);
    else setBackImage(null);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setMapError("المتصفح لا يدعم تحديد الموقع. اختاري موقعك بالضغط على الخريطة.");
      return;
    }

    setIsLocating(true);
    setMapError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: Number(position.coords.latitude.toFixed(6)),
          lng: Number(position.coords.longitude.toFixed(6)),
        };

        setLocation(coords);
        if (mapRef.current && window.L) {
          mapRef.current.setView([coords.lat, coords.lng], 16);
          if (markerRef.current) markerRef.current.remove();
          markerRef.current = window.L.marker([coords.lat, coords.lng])
            .addTo(mapRef.current)
            .bindPopup("موقعك الحالي")
            .openPopup();
        }

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}&accept-language=ar`
        )
          .then((response) => {
            if (!response.ok) throw new Error("Address lookup failed");
            return response.json();
          })
          .then((data) => {
            if (data.display_name) {
              setFormData((previous) => ({ ...previous, address: data.display_name }));
            }
          })
          .catch(() => setMapError("تم تحديد موقعك، اكتبي العنوان يدويًا إذا لم يظهر تلقائيًا."))
          .finally(() => setIsLocating(false));
      },
      () => {
        setMapError("لم نتمكن من الوصول لموقعك. اسمحي للمتصفح باستخدام الموقع أو حدديه على الخريطة.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!location) {
      setSubmitNotice("حددي موقع الخدمة على الخريطة أولًا.");
      return;
    }
    if (!frontImage || !backImage) {
      setSubmitNotice("ارفعي صورة البطاقة من الوجه الأمامي والخلفي.");
      return;
    }

    // The join-request API has not been provided yet; no personal data is sent or stored.
    setSubmitNotice("الواجهة جاهزة، لكن إرسال طلب الانضمام سيتفعّل بعد تجهيز وربط الـ API.");
  };

  useEffect(() => {
    return () => {
      if (frontImage?.preview) URL.revokeObjectURL(frontImage.preview);
      if (backImage?.preview) URL.revokeObjectURL(backImage.preview);
    };
  }, [frontImage, backImage]);

  return (
    <main className={styles.page}>
      <div className={styles.ambientOne} />
      <div className={styles.ambientTwo} />

      <div className={styles.pageShell}>
        <button type="button" className={styles.backButton} onClick={() => navigate("/")}>
          <ArrowRight size={18} />
          العودة للرئيسية
        </button>

        <section className={styles.intro}>
          <span className={styles.eyebrow}><span /> بوابتك لخدمات الجوكر</span>
          <h1>انضم إلى <span>عملاء الجوكر</span></h1>
          <p>
            ابدأ طلب الانضمام بخطوات بسيطة. بعد مراجعة بياناتك، سيتواصل معك فريق
            الجوكر لاستكمال إجراءات الاشتراك.
          </p>
          <div className={styles.trustNote}>
            <ShieldCheck size={18} />
            <span>بياناتك مخصصة لمراجعة طلب الانضمام فقط.</span>
          </div>
        </section>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.formHeading}>
            <div className={styles.headingIcon}><IdCard size={22} /></div>
            <div>
              <h2>بيانات طلب الانضمام</h2>
              <p>املأ البيانات بدقة لتسهيل مراجعة طلبك.</p>
            </div>
            <span className={styles.requiredHint}>* حقول مطلوبة</span>
          </div>

          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>01</span>
              <div><h3>البيانات الشخصية</h3><p>بيانات التواصل والتحقق من الهوية</p></div>
            </div>

            <div className={styles.fieldsGrid}>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="fullName">الاسم بالكامل <b>*</b></label>
                <div className={styles.inputWrap}>
                  <UserRound size={18} />
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="اكتب الاسم كما هو في البطاقة"
                    autoComplete="name"
                    required
                    minLength={5}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="nationalId">رقم بطاقة الرقم القومي <b>*</b></label>
                <div className={styles.inputWrap}>
                  <IdCard size={18} />
                  <input
                    id="nationalId"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, "").slice(0, 14);
                      setFormData((previous) => ({ ...previous, nationalId: value }));
                      setSubmitNotice("");
                    }}
                    placeholder="14 رقمًا"
                    inputMode="numeric"
                    autoComplete="off"
                    pattern="[0-9]{14}"
                    title="رقم البطاقة يجب أن يتكون من 14 رقمًا"
                    required
                  />
                </div>
                <small>أدخل الرقم المكوّن من 14 رقمًا.</small>
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">رقم الهاتف <b>*</b></label>
                <div className={styles.inputWrap}>
                  <Phone size={18} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => {
                      const value = event.target.value.replace(/[^\d+]/g, "").slice(0, 14);
                      setFormData((previous) => ({ ...previous, phone: value }));
                      setSubmitNotice("");
                    }}
                    placeholder="01xxxxxxxxx"
                    autoComplete="tel"
                    pattern="01[0-9]{9}"
                    title="أدخل رقم هاتف مصري صحيحًا يبدأ بـ 01 ويتكون من 11 رقمًا"
                    required
                  />
                </div>
              </div>

              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="password">كلمة المرور <b>*</b></label>
                <div className={styles.inputWrap}>
                  <LockKeyhole size={18} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="أنشئ كلمة مرور قوية"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                  >
                    {showPassword ? "إخفاء" : "إظهار"}
                  </button>
                </div>
                <small>8 أحرف أو أرقام على الأقل. لن يتم إنشاء الحساب في هذه المرحلة.</small>
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>02</span>
              <div><h3>عنوان الخدمة</h3><p>اضغط على الخريطة لتحديد مكان الخدمة بدقة</p></div>
            </div>

            <div className={styles.mapToolbar}>
              <div className={styles.mapHint}><MapPin size={17} /><span>اضغط على موقعك داخل الخريطة</span></div>
              <button type="button" className={styles.locateButton} onClick={handleLocateMe} disabled={isLocating}>
                <Navigation size={16} />
                {isLocating ? "جارٍ تحديد الموقع..." : "تحديد موقعي الحالي"}
              </button>
            </div>

            <div className={styles.mapFrame}>
              <div ref={mapElement} className={styles.map} aria-label="خريطة تحديد عنوان الخدمة" />
              {!mapReady && !mapError && <div className={styles.mapLoading}>جارٍ تحميل الخريطة...</div>}
              {mapError && <div className={styles.mapMessage} role="status">{mapError}</div>}
            </div>

            <div className={styles.coordinatesRow}>
              <span className={styles.coordinateBadge}>
                <MapPin size={15} />
                {location ? `${location.lat}, ${location.lng}` : "لم يتم تحديد الموقع بعد"}
              </span>
              {location && <span className={styles.selectedBadge}><CheckCircle2 size={15} /> تم تحديد الموقع</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="address">العنوان بالتفصيل <b>*</b></label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="سيظهر العنوان من الخريطة، ويمكنك إضافة تفاصيل مثل رقم العقار والدور والشقة"
                rows={3}
                required
              />
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.sectionTitle}>
              <span>03</span>
              <div><h3>صورة بطاقة الرقم القومي</h3><p>ارفع صورًا واضحة للوجهين، بحد أقصى 5 ميجابايت للصورة</p></div>
            </div>

            <div className={styles.uploadGrid}>
              <ImageUpload
                title="الوجه الأمامي"
                description="الوجه الذي يحتوي على الصورة الشخصية"
                image={frontImage}
                onChange={(event) => handleImageChange(event, "front")}
                onRemove={() => removeImage("front")}
                inputId="nationalIdFront"
              />
              <ImageUpload
                title="الوجه الخلفي"
                description="الوجه الذي يحتوي على البيانات الخلفية"
                image={backImage}
                onChange={(event) => handleImageChange(event, "back")}
                onRemove={() => removeImage("back")}
                inputId="nationalIdBack"
              />
            </div>
            <p className={styles.privacyNote}><ShieldCheck size={16} /> لا تشارك صور بطاقتك إلا من خلال القنوات الرسمية للجوكر.</p>
          </section>

          {submitNotice && <div className={styles.notice} role="status">{submitNotice}</div>}

          <div className={styles.formFooter}>
            <div className={styles.footerCopy}>
              <ShieldCheck size={18} />
              <span>إرسال الطلب لا يعني إنشاء حساب أو تفعيل الخدمة تلقائيًا.</span>
            </div>
            <button type="submit" className={styles.submitButton}>
              تجهيز طلب الانضمام
              <ArrowUpRight size={18} />
            </button>
          </div>

          <p className={styles.existingAccount}>
            لديك حساب بالفعل؟ <Link to="/customer/login">تسجيل الدخول</Link>
          </p>
        </form>

        <p className={styles.bottomNote}>JOKER NET <span>•</span> اتصال أقرب، وخدمة أسهل</p>
      </div>
    </main>
  );
};

const ImageUpload = ({ title, description, image, onChange, onRemove, inputId }) => (
  <div className={styles.uploadField}>
    <input
      id={inputId}
      type="file"
      accept="image/*"
      onChange={onChange}
      className={styles.fileInput}
    />
    <label htmlFor={inputId} className={`${styles.uploadBox} ${image ? styles.uploaded : ""}`}>
      {image ? (
        <>
          <img src={image.preview} alt={`معاينة ${title}`} className={styles.imagePreview} />
          <span className={styles.uploadedOverlay}><CheckCircle2 size={18} /> تم اختيار الصورة</span>
        </>
      ) : (
        <>
          <span className={styles.uploadIcon}><UploadCloud size={23} /></span>
          <strong>{title}</strong>
          <span className={styles.uploadDescription}>{description}</span>
          <span className={styles.uploadAction}><FileImage size={16} /> اختر صورة</span>
        </>
      )}
    </label>
    {image && (
      <button type="button" className={styles.removeImage} onClick={onRemove}>
        <X size={14} /> إزالة الصورة
      </button>
    )}
    <span className={styles.uploadTitle}>{title}</span>
  </div>
);

export default CustomerJoin;
