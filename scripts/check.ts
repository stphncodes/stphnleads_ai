/** Quick connectivity probe against Supabase using the service_role key. */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  for (const line of readFileSync(resolve(process.cwd(), ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

async function main() {
  loadEnv();
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const { data, error } = await admin.auth.admin.listUsers({ perPage: 1 });
  if (error) {
    console.error("✗ Connection failed:", error.message);
    process.exit(1);
  }
  console.log(`✓ Connected. Auth users so far: ${data.users.length}`);

  // Probe whether the schema has been applied yet.
  const { error: tblErr } = await admin.from("leads").select("id").limit(1);
  if (tblErr) {
    console.log(`• 'leads' table not found yet (${tblErr.message}) — schema not applied.`);
  } else {
    console.log("• 'leads' table exists — schema already applied.");
  }
}

main();
