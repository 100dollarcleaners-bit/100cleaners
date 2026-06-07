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

export function isValidSupabaseUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

export function getSupabaseConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !key) {
    return null;
  }

  const url = normalizeSupabaseUrl(rawUrl);

  if (!isValidSupabaseUrl(url)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SUPABASE_URL: "${rawUrl}". Use your Supabase project URL, e.g. https://YOUR-PROJECT-ID.supabase.co — not your website domain.`
    );
  }

  return {
    url,
    key: key.trim(),
  };
}
