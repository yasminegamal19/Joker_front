// TODO(backend): بيانات تجريبية مؤقتة لحد ما يتربط الـ API.
// مصدر واحد للرئيسية وباقتي والمحفظة عشان الأرقام تبقى متطابقة في كل الصفحات.

const pkg = {
  name: "Turbo 200",
  serviceType: "إنترنت منزلي",
  speedMbps: 30,
  totalGb: 200,
  usedGb: 128,
  startDate: "28 سبتمبر 2026",
  endDate: "28 أكتوبر 2026",
  daysLeft: 14,
  autoRenew: true,
};

export const customerMock = {
  firstName: "ياسمين",
  walletBalance: 250,
  package: {
    ...pkg,
    remainingGb: pkg.totalGb - pkg.usedGb,
    usedPercent: Math.round((pkg.usedGb / pkg.totalGb) * 100),
  },
};
