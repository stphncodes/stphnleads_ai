import type {
  Stat,
  ActivityEvent,
  AIRecommendation,
  SourceBreakdown,
  TimeseriesPoint,
} from "@/types";
import { CHART_COLORS } from "@/components/charts";

export const stats: Stat[] = [
  {
    id: "total-leads",
    label: "Total Leads",
    value: "12,480",
    rawValue: 12480,
    delta: 18.2,
    trend: "up",
    icon: "Users",
    spark: [40, 52, 49, 63, 58, 72, 80, 76, 91, 88, 99, 112],
  },
  {
    id: "qualified-leads",
    label: "Qualified Leads",
    value: "3,210",
    rawValue: 3210,
    delta: 12.4,
    trend: "up",
    icon: "BadgeCheck",
    spark: [20, 28, 24, 30, 34, 31, 38, 42, 40, 47, 51, 55],
  },
  {
    id: "outreach-sent",
    label: "Outreach Sent",
    value: "48,920",
    rawValue: 48920,
    delta: 9.1,
    trend: "up",
    icon: "Send",
    spark: [120, 140, 135, 160, 158, 175, 190, 188, 210, 230, 245, 260],
  },
  {
    id: "meetings-booked",
    label: "Meetings Booked",
    value: "486",
    rawValue: 486,
    delta: 27.3,
    trend: "up",
    icon: "CalendarCheck",
    spark: [8, 12, 10, 15, 18, 16, 22, 25, 28, 33, 38, 42],
  },
  {
    id: "conversion-rate",
    label: "Conversion Rate",
    value: "24.8%",
    rawValue: 24.8,
    delta: 3.6,
    trend: "up",
    icon: "Target",
    spark: [18, 19, 20, 19, 21, 22, 21, 23, 23, 24, 24, 25],
  },
  {
    id: "revenue-pipeline",
    label: "Revenue Pipeline",
    value: "$1.28M",
    rawValue: 1280000,
    delta: -2.1,
    trend: "down",
    icon: "DollarSign",
    spark: [90, 110, 105, 130, 125, 140, 135, 150, 145, 138, 132, 128],
  },
];

/** Revenue + meetings over the last 12 weeks. */
export const revenueTrend: TimeseriesPoint[] = [
  { label: "W1", pipeline: 420, closed: 180 },
  { label: "W2", pipeline: 480, closed: 210 },
  { label: "W3", pipeline: 460, closed: 200 },
  { label: "W4", pipeline: 540, closed: 260 },
  { label: "W5", pipeline: 600, closed: 280 },
  { label: "W6", pipeline: 580, closed: 300 },
  { label: "W7", pipeline: 680, closed: 340 },
  { label: "W8", pipeline: 720, closed: 380 },
  { label: "W9", pipeline: 760, closed: 360 },
  { label: "W10", pipeline: 880, closed: 440 },
  { label: "W11", pipeline: 920, closed: 480 },
  { label: "W12", pipeline: 1040, closed: 560 },
];

export const leadSources: SourceBreakdown[] = [
  { source: "AI Discovery", value: 4820, color: CHART_COLORS.brand },
  { source: "LinkedIn", value: 3180, color: CHART_COLORS.accent },
  { source: "Cold Email", value: 2240, color: CHART_COLORS.sky },
  { source: "Referral", value: 1260, color: CHART_COLORS.emerald },
  { source: "Inbound", value: 980, color: CHART_COLORS.amber },
];

export const activity: ActivityEvent[] = [
  {
    id: "a1",
    type: "ai",
    title: "stphnAgent found 34 new leads",
    description: "High-intent SaaS prospects in your target niche.",
    at: "2026-06-15T13:40:00Z",
    actor: "stphnAgent",
  },
  {
    id: "a2",
    type: "meeting",
    title: "Demo booked with Quanta Labs",
    description: "Today at 2:00 PM · Google Meet",
    at: "2026-06-15T12:10:00Z",
    actor: "Priya Nair",
  },
  {
    id: "a3",
    type: "deal",
    title: "Acme Inc. moved to Negotiation",
    description: "Deal value $48,000 · 75% probability",
    at: "2026-06-15T10:25:00Z",
    actor: "Alex Stone",
  },
  {
    id: "a4",
    type: "campaign",
    title: "“Q3 SaaS Founders” hit 14% reply rate",
    description: "+3% above your account average.",
    at: "2026-06-15T08:50:00Z",
  },
  {
    id: "a5",
    type: "lead",
    title: "Marcus Bennett replied",
    description: "“This looks great — can we talk Thursday?”",
    at: "2026-06-14T17:30:00Z",
    actor: "Marcus Bennett",
  },
  {
    id: "a6",
    type: "deal",
    title: "Helio Co. marked Won",
    description: "Closed at $26,000 · 21-day cycle",
    at: "2026-06-14T15:05:00Z",
    actor: "Sara Whitfield",
  },
];

export const recommendations: AIRecommendation[] = [
  {
    id: "r1",
    title: "Follow up with 8 warm leads",
    description:
      "These prospects opened your last email 3+ times but haven't replied. A nudge today could convert them.",
    impact: "high",
    action: "Send follow-ups",
  },
  {
    id: "r2",
    title: "Acme Inc. deal is at risk",
    description:
      "No activity in 6 days on a $48k negotiation. Schedule a check-in before it goes cold.",
    impact: "high",
    action: "Book a call",
  },
  {
    id: "r3",
    title: "Double down on AI Discovery",
    description:
      "Leads from AI Discovery convert 2.3x better than Cold Email. Reallocate outreach time here.",
    impact: "medium",
    action: "View source report",
  },
];
