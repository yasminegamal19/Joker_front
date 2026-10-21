import { useAppConfig } from "../context/AppConfigContext";

export const useFeature = () => {
  const { config, loading, error } = useAppConfig();

  return (flag) =>
    !flag || loading || Boolean(error) || config.feature_flags[flag] !== false;
};
