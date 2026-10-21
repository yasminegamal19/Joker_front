import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppConfig } from "../../context/AppConfigContext";
import { getContent } from "../../services/appService";
import Navbar from "../../components/Public/Navbar/Navbar";
import Footer from "../../components/Public/Footer/Footer";

const TITLES = {
  about_us: "من نحن",
  terms: "الشروط والأحكام",
  privacy_policy: "سياسة الخصوصية",
  contact_us: "تواصل معنا",
};

const ContentPage = () => {
  const { key } = useParams();
  const { config, loading: configLoading } = useAppConfig();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    getContent(key, controller.signal)
      .then((data) => {
        setContent(data?.content ?? data?.body ?? data?.text ?? "");
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [key]);

  if (!configLoading && !config.content_keys.includes(key)) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <main
        dir="rtl"
        style={{ maxWidth: 820, margin: "0 auto", padding: "120px 20px 60px" }}
      >
        <h1 style={{ marginBottom: 24 }}>{TITLES[key] || "المحتوى"}</h1>

        {loading && <p>جاري التحميل...</p>}

        {error && <p>حصل خطأ أثناء تحميل المحتوى. حاول مرة أخرى لاحقًا.</p>}

        {!loading && !error && (
          <div style={{ whiteSpace: "pre-line", lineHeight: 1.9 }}>
            {content}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ContentPage;
