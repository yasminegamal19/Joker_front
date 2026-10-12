// src/components/Public/MaintenanceGate/MaintenanceGate.jsx
import { useAppConfig } from "../../../context/AppConfigContext";
import { useTheme } from "../../../context/ThemeContext";
import logoLight from "../../../assets/logo-light.png";
import logoDark from "../../../assets/logo-dark.png";

const MaintenanceGate = ({ children }) => {
  const { config, loading } = useAppConfig();
  const { isDark } = useTheme();

  if (loading) return null;

  if (config.feature_flags.maintenance_enabled) {
    const logoSrc = isDark ? logoDark : logoLight;

    return (
      <div
        dir="rtl"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          padding: "24px",
          textAlign: "center",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-family)",
          transition: "background-color var(--transition), color var(--transition)",
        }}
      >
        <img src={logoSrc} alt="الجوكر" style={{ height: 56, objectFit: "contain" }} />
        <h1 style={{ fontSize: "1.6rem", margin: 0, color: "var(--text-primary)" }}>
          الموقع تحت الصيانة حاليًا
        </h1>
        <p style={{ margin: 0, color: "var(--text-secondary)", maxWidth: "480px" }}>
          بنشتغل على تحسينات وهنرجع في أقرب وقت. شكرًا لصبرك.
        </p>
      </div>
    );
  }

  return children;
};

export default MaintenanceGate;
