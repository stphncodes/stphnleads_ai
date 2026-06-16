import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses Row Level Security. SERVER-ONLY.
 * Used by the seed script and any privileged backend task. Never import this
 * into a Client Component or expose the service_role key to the browser.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
