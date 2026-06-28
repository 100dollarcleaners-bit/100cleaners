export function getAppUrl(path = ""): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
