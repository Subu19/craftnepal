export const fmt = (id: string) =>
  (id || "")
    .replace("minecraft:", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const fmtVal = (value: number | string | null | undefined, unit?: string) => {
  const val = typeof value === "string" ? parseFloat(value) : value;
  if (val == null || isNaN(val)) return "0";
  if (unit === "ticks") return (val / 72000).toFixed(1) + " hrs";
  if (unit === "cm")
    return val >= 100000
      ? (val / 100000).toFixed(2) + " km"
      : (val / 100).toFixed(1) + " m";
  return val.toLocaleString();
};
