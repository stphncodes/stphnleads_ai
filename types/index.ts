/* ============================================================
   stphnLead AI — Domain Types
   ============================================================ */

export type LeadStatus =
  | "new"
  | "contacted"
  | "interested"
  | "qualified"
  | "closed";

export type Priority = "low" | "medium" | "high";

export interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  score: number; // 0-100 AI lead score
  status: LeadStatus;
  intent: "low" | "medium" | "high";
  source: LeadSource;
  lastContact: string; // ISO
  createdAt: string; // ISO
  value: number; // potential deal value
  tags: string[];
  notes?: Note[];
  insights?: string[];
  conversation?: ConversationMessage[];
  nextActions?: NextAction[];
}

export type LeadSource =
  | "AI Discovery"
  | "LinkedIn"
  | "Cold Email"
  | "Referral"
  | "Website"
  | "Inbound";

export interface Note {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface NextAction {
  id: string;
  label: string;
  due: string;
  done: boolean;
  type: "email" | "call" | "meeting" | "task";
}

export interface ConversationMessage {
  id: string;
  channel: "email" | "linkedin" | "message";
  direction: "in" | "out";
  body: string;
  at: string;
}

/* ---------- CRM ---------- */
export type DealStage =
  | "new"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface Deal {
  id: string;
  title: string;
  leadName: string;
  company: string;
  contactEmail: string;
  value: number;
  stage: DealStage;
  priority: Priority;
  probability: number; // 0-100
  owner: string;
  closeDate: string;
  aiSuggestion?: string;
}

/* ---------- Campaigns ---------- */
export type CampaignType = "cold-email" | "linkedin" | "follow-up";
export type CampaignStatus = "active" | "paused" | "draft" | "completed";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  sent: number;
  openRate: number;
  replyRate: number;
  meetingsBooked: number;
  sequenceSteps: number;
  updatedAt: string;
}

/* ---------- Meetings ---------- */
export interface Meeting {
  id: string;
  title: string;
  leadName: string;
  company: string;
  start: string; // ISO
  durationMins: number;
  type: "intro" | "demo" | "follow-up" | "closing";
  location: "Zoom" | "Google Meet" | "Phone" | "In person";
  status: "upcoming" | "completed" | "cancelled";
  prepNotes?: string[];
  attendees: string[];
}

/* ---------- Inbox ---------- */
export type InboxChannel = "email" | "linkedin" | "messages";

export interface InboxThread {
  id: string;
  channel: InboxChannel;
  contactName: string;
  company: string;
  subject: string;
  preview: string;
  unread: boolean;
  starred: boolean;
  labels: string[];
  at: string;
  messages: ConversationMessage[];
  aiReplies: string[];
}

/* ---------- AI Agent ---------- */
export interface AgentMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  at: string;
}

/* ---------- Dashboard / Analytics ---------- */
export interface Stat {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  delta: number; // percentage change
  trend: "up" | "down";
  spark?: number[];
  icon: string;
}

export interface ActivityEvent {
  id: string;
  type: "lead" | "meeting" | "campaign" | "deal" | "ai";
  title: string;
  description: string;
  at: string;
  actor?: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  action: string;
}

export interface SourceBreakdown {
  source: string;
  value: number;
  color: string;
}

export interface TimeseriesPoint {
  label: string;
  [key: string]: string | number;
}

export interface FunnelStage {
  stage: string;
  value: number;
}

/* ---------- Landing ---------- */
export interface Feature {
  icon: string;
  title: string;
  description: string;
  accent: "brand" | "accent" | "info";
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}
