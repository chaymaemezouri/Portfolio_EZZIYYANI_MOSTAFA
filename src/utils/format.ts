export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatMetric(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("en-GB").format(value);
}
