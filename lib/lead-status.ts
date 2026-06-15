import type { LeadStatus, DealStage, Priority } from "@/types";

type Tone = "brand" | "accent" | "neutral" | "success" | "warning" | "danger" | "info";

export const leadStatusConfig: Record<
  LeadStatus,
  { label: string; tone: Tone }
> = {
  new: { label: "New", tone: "neutral" },
  contacted: { label: "Contacted", tone: "info" },
  interested: { label: "Interested", tone: "accent" },
  qualified: { label: "Qualified", tone: "brand" },
  closed: { label: "Closed", tone: "success" },
};

export const leadStatusOrder: LeadStatus[] = [
  "new",
  "contacted",
  "interested",
  "qualified",
  "closed",
];

export const dealStageConfig: Record<
  DealStage,
  { label: string; tone: Tone; accent: string }
> = {
  new: { label: "New Leads", tone: "neutral", accent: "#6b7191" },
  qualified: { label: "Qualified", tone: "brand", accent: "#6385ff" },
  proposal: { label: "Proposal Sent", tone: "accent", accent: "#a78bfa" },
  negotiation: { label: "Negotiation", tone: "warning", accent: "#fbbf24" },
  won: { label: "Won", tone: "success", accent: "#34d399" },
  lost: { label: "Lost", tone: "danger", accent: "#fb7185" },
};

export const dealStageOrder: DealStage[] = [
  "new",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

export const priorityConfig: Record<Priority, { label: string; tone: Tone }> = {
  high: { label: "High", tone: "danger" },
  medium: { label: "Medium", tone: "warning" },
  low: { label: "Low", tone: "neutral" },
};

/** Score → tone for the score pill. */
export function scoreTone(score: number): Tone {
  if (score >= 80) return "success";
  if (score >= 60) return "brand";
  if (score >= 40) return "warning";
  return "neutral";
}
