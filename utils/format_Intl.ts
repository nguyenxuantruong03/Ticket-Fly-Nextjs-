export function formatNumber(value?: number) {
  if (!value) return "0";

  return new Intl.NumberFormat("vi-VN").format(value);
}
