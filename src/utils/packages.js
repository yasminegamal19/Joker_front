
export const kbpsToMbps = (kbps) => {
  const mbps = Math.round((Number(kbps) / 1024) * 10) / 10;
  return Number.isInteger(mbps) ? String(mbps) : mbps.toFixed(1);
};

export const parsePrice = (price) => {
  const n = Number(price);
  return Number.isNaN(n) ? 0 : n;
};

export const formatPrice = (n) =>
  Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2);

export const mapPackage = (p) => {
  const priceValue = parsePrice(p.price);
  const hasQuota = p.quota_gb !== null && p.quota_gb !== undefined;
  const download = kbpsToMbps(p.download_speed_kbps);
  const browsing = kbpsToMbps(p.browsing_speed_kbps);

  const features = [
    `سرعة تحميل تصل إلى ${download} Mbps`,
    `سرعة تصفح ${browsing} Mbps`,
    hasQuota
      ? `${p.quota_gb} جيجابايت لمدة ${p.duration_days} يوم`
      : `مدة الاشتراك ${p.duration_days} يوم`,
  ];

  return {
    id: p.id,
    name: p.name,
    description: p.description || "",
    downloadSpeed: download,
    quota: hasQuota ? String(p.quota_gb) : null,
    days: p.duration_days,
    priceValue,
    price: formatPrice(priceValue),
    features,
  };
};

const normalize = (s) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

export const findCurrentPackage = (packages, current) => {
  if (!current || !packages?.length) return null;

  if (current.id !== undefined && current.id !== null) {
    const byId = packages.find((p) => String(p.id) === String(current.id));
    if (byId) return byId;
  }

  const name = normalize(current.name);
  if (!name) return null;

  return packages.find((p) => normalize(p.name) === name) || null;
};
