import { useAppConfig } from "../context/AppConfigContext";

export const useCanChangePackage = () => {
  const { config, loading } = useAppConfig();

  const flag = Boolean(config?.feature_flags?.change_package_enabled);

  return { enabled: import.meta.env.DEV || flag, loading };
};
