import type { Campaign, CampaignType, CampaignStatus } from "@/types";

type Tone = "success" | "warning" | "neutral" | "info";

export const campaignTypeConfig: Record<
  CampaignType,
  { label: string; accent: string }
> = {
  "cold-email": { label: "Cold Email", accent: "#6385ff" },
  linkedin: { label: "LinkedIn Outreach", accent: "#a78bfa" },
  "follow-up": { label: "Follow Ups", accent: "#38bdf8" },
};

export const campaignStatusConfig: Record<
  CampaignStatus,
  { label: string; tone: Tone }
> = {
  active: { label: "Active", tone: "success" },
  paused: { label: "Paused", tone: "warning" },
  draft: { label: "Draft", tone: "neutral" },
  completed: { label: "Completed", tone: "info" },
};

export const campaigns: Campaign[] = [
  {
    id: "cmp-1",
    name: "Q3 SaaS Founders",
    type: "cold-email",
    status: "active",
    sent: 1840,
    openRate: 62.4,
    replyRate: 14.1,
    meetingsBooked: 38,
    sequenceSteps: 4,
    updatedAt: "2026-06-15T09:00:00Z",
  },
  {
    id: "cmp-2",
    name: "Enterprise RevOps Leaders",
    type: "linkedin",
    status: "active",
    sent: 920,
    openRate: 71.8,
    replyRate: 18.7,
    meetingsBooked: 27,
    sequenceSteps: 3,
    updatedAt: "2026-06-14T16:30:00Z",
  },
  {
    id: "cmp-3",
    name: "Demo No-Shows — Win Back",
    type: "follow-up",
    status: "active",
    sent: 410,
    openRate: 58.2,
    replyRate: 22.4,
    meetingsBooked: 19,
    sequenceSteps: 5,
    updatedAt: "2026-06-15T08:10:00Z",
  },
  {
    id: "cmp-4",
    name: "Fintech Growth Teams",
    type: "cold-email",
    status: "paused",
    sent: 2210,
    openRate: 54.9,
    replyRate: 9.8,
    meetingsBooked: 24,
    sequenceSteps: 4,
    updatedAt: "2026-06-12T11:45:00Z",
  },
  {
    id: "cmp-5",
    name: "Agency Partnerships",
    type: "linkedin",
    status: "active",
    sent: 640,
    openRate: 68.1,
    replyRate: 16.2,
    meetingsBooked: 15,
    sequenceSteps: 3,
    updatedAt: "2026-06-13T14:20:00Z",
  },
  {
    id: "cmp-6",
    name: "Trial Expiring — Upgrade Nudge",
    type: "follow-up",
    status: "completed",
    sent: 1180,
    openRate: 64.7,
    replyRate: 12.9,
    meetingsBooked: 31,
    sequenceSteps: 4,
    updatedAt: "2026-06-08T10:00:00Z",
  },
  {
    id: "cmp-7",
    name: "Cybersecurity ICP — Wave 2",
    type: "cold-email",
    status: "draft",
    sent: 0,
    openRate: 0,
    replyRate: 0,
    meetingsBooked: 0,
    sequenceSteps: 4,
    updatedAt: "2026-06-15T07:30:00Z",
  },
  {
    id: "cmp-8",
    name: "Warm Intros — Referrals",
    type: "follow-up",
    status: "active",
    sent: 220,
    openRate: 79.5,
    replyRate: 34.1,
    meetingsBooked: 22,
    sequenceSteps: 2,
    updatedAt: "2026-06-15T06:00:00Z",
  },
];
