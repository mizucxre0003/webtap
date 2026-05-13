export function normalizePhone(phone: string | null | undefined) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("8") && digits.length === 11) {
    return `7${digits.slice(1)}`;
  }
  return digits;
}

export function whatsappUrl(phone: string | null | undefined, text?: string) {
  const normalized = normalizePhone(phone);
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return normalized ? `https://wa.me/${normalized}${query}` : "#";
}

export function ownerWhatsappUrl(text = "Здравствуйте! Пишу с сайта WebTap.kz") {
  return whatsappUrl(process.env.WHATSAPP_PHONE, text);
}
