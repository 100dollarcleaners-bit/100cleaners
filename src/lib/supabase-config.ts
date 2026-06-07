/** Normalize Supabase project URL from env (fixes common Vercel copy/paste mistakes). */
export function normalizeSupabaseUrl(raw: string): string {
  let url = raw.trim();

  // Dashboard URL pasted by mistake
  url = url.replace(/^(https?:\/\/)?supabase\.com\/dashboard\/project\//, "https://");
  url = url.replace(/\/project\/[\w-]+$/, "");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  // Only the project root — not /rest/v1
  url = url.replace(/\/rest\/v1\/?$/, "");
  url = url.replace(/\/+$/, "");

  return url;
}

export function getSupabaseConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !key) {
    return null;
  }

  return {
    url: normalizeSupabaseUrl(rawUrl),
    key: key.trim(),
  };
}
