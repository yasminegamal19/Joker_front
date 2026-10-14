import { useAppConfig } from "../context/AppConfigContext";

// بيرجّع دالة تقول هل الـ feature flag مفعّل.
// لو الـ API لسه بيحمّل أو وقع، مش بنخفي أي قسم؛ الإخفاء بس لما السيرفر يقول الـ flag مقفول صراحةً.
export const useFeature = () => {
  const { config, loading, error } = useAppConfig();

  return (flag) =>
    !flag || loading || Boolean(error) || config.feature_flags[flag] !== false;
};
