import { useAppConfig } from "../context/AppConfigContext";

/*
  هل ميزة "تغيير الباقة" مفتوحة؟
  - في الإنتاج: بتتبع change_package_enabled اللي راجع من /app-config
  - وقت التطوير (npm run dev): دايمًا مفتوحة عشان نقدر نجرّب الصفحات
    حتى لو الباك اند لسه مرجّع الـ flags فاضية
  لما الباك اند يفعّل الـ flag امسح سطر import.meta.env.DEV لو عايز نفس السلوك في التطوير.
*/
export const useCanChangePackage = () => {
  const { config, loading } = useAppConfig();

  const flag = Boolean(config?.feature_flags?.change_package_enabled);

  return { enabled: import.meta.env.DEV || flag, loading };
};
