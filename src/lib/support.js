export const SUPPORT_PHONE = import.meta.env.VITE_SUPPORT_PHONE || "";

const digits = SUPPORT_PHONE.replace(/\D/g, "");

export const supportTelHref = digits ? `tel:+${digits}` : null;
export const supportWhatsAppHref = digits ? `https://wa.me/${digits}` : null;
