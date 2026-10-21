import { createContext, useContext, useEffect, useState } from "react";
import { getAppConfig } from "../services/appService";

const defaultConfig = {
  banners: [],
  feature_flags: {
    wallet_enabled: false,
    maintenance_enabled: false,
    change_package_enabled: false,
  },
  content_keys: [],
};

const isPlainObject = (v) => v && typeof v === "object" && !Array.isArray(v);

const normalize = (data = {}) => ({
  banners: Array.isArray(data.banners) ? data.banners : [],
  feature_flags: {
    ...defaultConfig.feature_flags,
    ...(isPlainObject(data.feature_flags) ? data.feature_flags : {}),
  },
  content_keys: Array.isArray(data.content_keys) ? data.content_keys : [],
});

const AppConfigContext = createContext({
  config: defaultConfig,
  loading: true,
  error: null,
});

export const AppConfigProvider = ({ children }) => {
  const [state, setState] = useState({
    config: defaultConfig,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    getAppConfig(controller.signal)
      .then((data) =>
        setState({ config: normalize(data), loading: false, error: null }),
      )
      .catch((err) => {
        if (controller.signal.aborted) return;
        setState({ config: defaultConfig, loading: false, error: err });
      });

    return () => controller.abort();
  }, []);

  return (
    <AppConfigContext.Provider value={state}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
