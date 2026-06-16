/**
 * Seed the Supabase database with the existing mock datasets for a demo user.
 *
 *   npm run seed
 *
 * Idempotent: it ensures the demo user exists, wipes that user's rows, then
 * re-inserts everything. Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

import { leads } from "../data/leads";
import { deals } from "../data/crm";
import { campaigns } from "../data/campaigns";
import { meetings } from "../data/meetings";
import { inboxThreads } from "../data/inbox";

// ---------- load .env.local (no extra deps) ----------
for (const line of readFileSync(resolve(process.cwd(), ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const DEMO_EMAIL = process.env.SEED_EMAIL ?? "demo@stphnlead.ai";
const DEMO_PASSWORD = process.env.SEED_PASSWORD ?? "demo123456";

if (!SUPABASE_URL || !SERVICE_KEY || SERVICE_KEY === "YOUR_SERVICE_ROLE_KEY") {
  console.error(
    "Missing Supabase credentials. Fill NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
  );
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function ensureDemoUser(): Promise<string> {
  // Look for an existing user with the demo email.
  const { data: list } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const existing = list?.users.find((u) => u.email === DEMO_EMAIL);
  if (existing) return existing.id;

  const { data, error } = await admin.auth.admin.createUser({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    email_confirm: true,
    user_metadata: { name: "Alex Stone" },
  });
  if (error || !data.user) throw error ?? new Error("Failed to create demo user");
  return data.user.id;
}

async function wipe(userId: string) {
  // Children cascade from parents, but clear top-level tables explicitly.
  for (const table of [
    "lead_messages",
    "lead_actions",
    "lead_notes",
    "leads",
    "deals",
    "campaigns",
    "meetings",
    "inbox_messages",
    "inbox_threads",
    "agent_messages",
  ]) {
    const { error } = await admin.from(table).delete().eq("user_id", userId);
    if (error) throw new Error(`wipe ${table}: ${error.message}`);
  }
}

async function seedLeads(userId: string) {
  for (const lead of leads) {
    const { data, error } = await admin
      .from("leads")
      .insert({
        user_id: userId,
        name: lead.name,
        title: lead.title,
        company: lead.company,
        industry: lead.industry,
        email: lead.email,
        phone: lead.phone,
        location: lead.location,
        avatar: lead.avatar,
        score: lead.score,
        status: lead.status,
        intent: lead.intent,
        source: lead.source,
        value: lead.value,
        tags: lead.tags,
        insights: lead.insights ?? [],
        last_contact: lead.lastContact,
        created_at: lead.createdAt,
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`lead ${lead.name}: ${error?.message}`);
    const leadId = data.id;

    if (lead.notes?.length) {
      await admin.from("lead_notes").insert(
        lead.notes.map((n) => ({
          lead_id: leadId,
          user_id: userId,
          author: n.author,
          body: n.body,
          created_at: n.createdAt,
        })),
      );
    }
    if (lead.nextActions?.length) {
      await admin.from("lead_actions").insert(
        lead.nextActions.map((a) => ({
          lead_id: leadId,
          user_id: userId,
          label: a.label,
          due: a.due,
          done: a.done,
          type: a.type,
        })),
      );
    }
    if (lead.conversation?.length) {
      await admin.from("lead_messages").insert(
        lead.conversation.map((c) => ({
          lead_id: leadId,
          user_id: userId,
          channel: c.channel,
          direction: c.direction,
          body: c.body,
          at: c.at,
        })),
      );
    }
  }
}

async function seedDeals(userId: string) {
  const { error } = await admin.from("deals").insert(
    deals.map((d) => ({
      user_id: userId,
      title: d.title,
      lead_name: d.leadName,
      company: d.company,
      contact_email: d.contactEmail,
      value: d.value,
      stage: d.stage,
      priority: d.priority,
      probability: d.probability,
      owner: d.owner,
      close_date: d.closeDate,
      ai_suggestion: d.aiSuggestion ?? null,
    })),
  );
  if (error) throw new Error(`deals: ${error.message}`);
}

async function seedCampaigns(userId: string) {
  const { error } = await admin.from("campaigns").insert(
    campaigns.map((c) => ({
      user_id: userId,
      name: c.name,
      type: c.type,
      status: c.status,
      sent: c.sent,
      open_rate: c.openRate,
      reply_rate: c.replyRate,
      meetings_booked: c.meetingsBooked,
      sequence_steps: c.sequenceSteps,
      updated_at: c.updatedAt,
    })),
  );
  if (error) throw new Error(`campaigns: ${error.message}`);
}

async function seedMeetings(userId: string) {
  const { error } = await admin.from("meetings").insert(
    meetings.map((m) => ({
      user_id: userId,
      title: m.title,
      lead_name: m.leadName,
      company: m.company,
      start_at: m.start,
      duration_mins: m.durationMins,
      type: m.type,
      location: m.location,
      status: m.status,
      prep_notes: m.prepNotes ?? [],
      attendees: m.attendees,
    })),
  );
  if (error) throw new Error(`meetings: ${error.message}`);
}

async function seedInbox(userId: string) {
  for (const thread of inboxThreads) {
    const { data, error } = await admin
      .from("inbox_threads")
      .insert({
        user_id: userId,
        channel: thread.channel,
        contact_name: thread.contactName,
        company: thread.company,
        subject: thread.subject,
        preview: thread.preview,
        unread: thread.unread,
        starred: thread.starred,
        labels: thread.labels,
        ai_replies: thread.aiReplies,
        at: thread.at,
      })
      .select("id")
      .single();
    if (error || !data) throw new Error(`thread ${thread.subject}: ${error?.message}`);

    if (thread.messages?.length) {
      await admin.from("inbox_messages").insert(
        thread.messages.map((msg) => ({
          thread_id: data.id,
          user_id: userId,
          channel: msg.channel,
          direction: msg.direction,
          body: msg.body,
          at: msg.at,
        })),
      );
    }
  }
}

async function main() {
  console.log("→ Ensuring demo user…");
  const userId = await ensureDemoUser();
  console.log(`  user: ${DEMO_EMAIL} (${userId})`);

  // Keep the profile in sync with the original mock identity.
  await admin
    .from("profiles")
    .upsert({ id: userId, name: "Alex Stone", email: DEMO_EMAIL, role: "Founder & CEO", plan: "Pro" });

  console.log("→ Wiping previous demo data…");
  await wipe(userId);

  console.log("→ Seeding leads…");
  await seedLeads(userId);
  console.log("→ Seeding deals…");
  await seedDeals(userId);
  console.log("→ Seeding campaigns…");
  await seedCampaigns(userId);
  console.log("→ Seeding meetings…");
  await seedMeetings(userId);
  console.log("→ Seeding inbox…");
  await seedInbox(userId);

  console.log(`\n✓ Seed complete. Sign in with ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
}

main().catch((err) => {
  console.error("✗ Seed failed:", err.message ?? err);
  process.exit(1);
});
