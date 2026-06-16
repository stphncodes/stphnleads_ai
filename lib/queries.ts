import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  Lead,
  Deal,
  Campaign,
  Meeting,
  InboxThread,
  Note,
  NextAction,
  ConversationMessage,
} from "@/types";

/**
 * Server-side data access. Every query runs as the signed-in user, so Row
 * Level Security scopes results to their own rows automatically. Rows are
 * mapped from the DB's snake_case columns to the camelCase domain types the
 * UI already expects.
 */

function groupBy<T>(rows: T[], key: (row: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const row of rows) {
    const k = key(row);
    (map.get(k) ?? map.set(k, []).get(k)!).push(row);
  }
  return map;
}

export async function getLeads(): Promise<Lead[]> {
  const supabase = await createClient();
  const [leadsRes, notesRes, actionsRes, messagesRes] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: true }),
    supabase.from("lead_notes").select("*").order("created_at", { ascending: true }),
    supabase.from("lead_actions").select("*"),
    supabase.from("lead_messages").select("*").order("at", { ascending: true }),
  ]);

  if (leadsRes.error) throw leadsRes.error;

  const notesByLead = groupBy(notesRes.data ?? [], (r) => r.lead_id);
  const actionsByLead = groupBy(actionsRes.data ?? [], (r) => r.lead_id);
  const messagesByLead = groupBy(messagesRes.data ?? [], (r) => r.lead_id);

  return (leadsRes.data ?? []).map((r): Lead => ({
    id: r.id,
    name: r.name,
    title: r.title,
    company: r.company,
    industry: r.industry,
    email: r.email,
    phone: r.phone ?? undefined,
    location: r.location,
    avatar: r.avatar ?? undefined,
    score: r.score,
    status: r.status,
    intent: r.intent,
    source: r.source,
    lastContact: r.last_contact ?? "",
    createdAt: r.created_at,
    value: r.value,
    tags: r.tags ?? [],
    insights: r.insights ?? [],
    notes: (notesByLead.get(r.id) ?? []).map(
      (n): Note => ({ id: n.id, author: n.author, body: n.body, createdAt: n.created_at }),
    ),
    nextActions: (actionsByLead.get(r.id) ?? []).map(
      (a): NextAction => ({ id: a.id, label: a.label, due: a.due, done: a.done, type: a.type }),
    ),
    conversation: (messagesByLead.get(r.id) ?? []).map(
      (c): ConversationMessage => ({
        id: c.id,
        channel: c.channel,
        direction: c.direction,
        body: c.body,
        at: c.at,
      }),
    ),
  }));
}

export async function getDeals(): Promise<Deal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;

  return (data ?? []).map((r): Deal => ({
    id: r.id,
    title: r.title,
    leadName: r.lead_name,
    company: r.company,
    contactEmail: r.contact_email,
    value: r.value,
    stage: r.stage,
    priority: r.priority,
    probability: r.probability,
    owner: r.owner,
    closeDate: r.close_date,
    aiSuggestion: r.ai_suggestion ?? undefined,
  }));
}

export async function getCampaigns(): Promise<Campaign[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;

  return (data ?? []).map((r): Campaign => ({
    id: r.id,
    name: r.name,
    type: r.type,
    status: r.status,
    sent: r.sent,
    openRate: Number(r.open_rate),
    replyRate: Number(r.reply_rate),
    meetingsBooked: r.meetings_booked,
    sequenceSteps: r.sequence_steps,
    updatedAt: r.updated_at,
  }));
}

export async function getMeetings(): Promise<Meeting[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .order("start_at", { ascending: true });
  if (error) throw error;

  return (data ?? []).map((r): Meeting => ({
    id: r.id,
    title: r.title,
    leadName: r.lead_name,
    company: r.company,
    start: r.start_at,
    durationMins: r.duration_mins,
    type: r.type,
    location: r.location,
    status: r.status,
    prepNotes: r.prep_notes ?? [],
    attendees: r.attendees ?? [],
  }));
}

export async function getInboxThreads(): Promise<InboxThread[]> {
  const supabase = await createClient();
  const [threadsRes, messagesRes] = await Promise.all([
    supabase.from("inbox_threads").select("*").order("at", { ascending: false }),
    supabase.from("inbox_messages").select("*").order("at", { ascending: true }),
  ]);
  if (threadsRes.error) throw threadsRes.error;

  const messagesByThread = groupBy(messagesRes.data ?? [], (r) => r.thread_id);

  return (threadsRes.data ?? []).map((r): InboxThread => ({
    id: r.id,
    channel: r.channel,
    contactName: r.contact_name,
    company: r.company,
    subject: r.subject,
    preview: r.preview,
    unread: r.unread,
    starred: r.starred,
    labels: r.labels ?? [],
    at: r.at,
    aiReplies: r.ai_replies ?? [],
    messages: (messagesByThread.get(r.id) ?? []).map(
      (m): ConversationMessage => ({
        id: m.id,
        channel: m.channel,
        direction: m.direction,
        body: m.body,
        at: m.at,
      }),
    ),
  }));
}

export interface Profile {
  name: string;
  email: string;
  role: string;
  plan: string;
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("name, email, role, plan")
    .eq("id", user.id)
    .maybeSingle();

  return {
    name: data?.name || user.user_metadata?.name || "",
    email: data?.email || user.email || "",
    role: data?.role || "Member",
    plan: data?.plan || "Free",
  };
}
