/** Định dạng số tiền VND (vi-VN). */
export function formatVnd(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("vi-VN").format(Math.round(value)) + " đ";
}

export function formatPercent(rate: number, digits = 1): string {
  return (rate * 100).toFixed(digits).replace(/\.0$/, "") + "%";
}

export function parseVndInput(raw: string): number {
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return 0;
  return Number(digits);
}
