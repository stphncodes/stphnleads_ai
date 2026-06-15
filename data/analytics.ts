import type { FunnelStage, TimeseriesPoint } from "@/types";
import { CHART_COLORS } from "@/components/charts";

export const analyticsKpis = [
  { label: "Total leads", value: "12,480", delta: 18.2, trend: "up" as const },
  { label: "Response rate", value: "13.6%", delta: 2.4, trend: "up" as const },
  { label: "Meetings booked", value: "486", delta: 27.3, trend: "up" as const },
  { label: "Revenue won", value: "$842k", delta: 11.5, trend: "up" as const },
];

export const conversionFunnel: FunnelStage[] = [
  { stage: "Leads sourced", value: 12480 },
  { stage: "Contacted", value: 8240 },
  { stage: "Replied", value: 1680 },
  { stage: "Qualified", value: 920 },
  { stage: "Meeting booked", value: 486 },
  { stage: "Won", value: 196 },
];

export const responseRateTrend: TimeseriesPoint[] = [
  { label: "Jan", rate: 8.2 },
  { label: "Feb", rate: 9.1 },
  { label: "Mar", rate: 10.4 },
  { label: "Apr", rate: 11.2 },
  { label: "May", rate: 12.6 },
  { label: "Jun", rate: 13.6 },
];

export const revenueByMonth: TimeseriesPoint[] = [
  { label: "Jan", revenue: 320, target: 300 },
  { label: "Feb", revenue: 410, target: 360 },
  { label: "Mar", revenue: 480, target: 420 },
  { label: "Apr", revenue: 560, target: 500 },
  { label: "May", revenue: 720, target: 620 },
  { label: "Jun", revenue: 842, target: 740 },
];

export const meetingTrend: TimeseriesPoint[] = [
  { label: "W7", meetings: 22 },
  { label: "W8", meetings: 25 },
  { label: "W9", meetings: 28 },
  { label: "W10", meetings: 33 },
  { label: "W11", meetings: 38 },
  { label: "W12", meetings: 42 },
];

export interface SourcePerf {
  source: string;
  leads: number;
  meetings: number;
  conversion: number;
  color: string;
}

export const sourcePerformance: SourcePerf[] = [
  { source: "AI Discovery", leads: 4820, meetings: 214, conversion: 4.4, color: CHART_COLORS.brand },
  { source: "LinkedIn", leads: 3180, meetings: 132, conversion: 4.2, color: CHART_COLORS.accent },
  { source: "Referral", leads: 1260, meetings: 78, conversion: 6.2, color: CHART_COLORS.emerald },
  { source: "Cold Email", leads: 2240, meetings: 54, conversion: 2.4, color: CHART_COLORS.sky },
  { source: "Inbound", leads: 980, meetings: 38, conversion: 3.9, color: CHART_COLORS.amber },
];

export interface CampaignPerf {
  name: string;
  type: string;
  replyRate: number;
  meetings: number;
}

export const campaignPerformance: CampaignPerf[] = [
  { name: "Warm Intros — Referrals", type: "Follow Ups", replyRate: 34.1, meetings: 22 },
  { name: "Demo No-Shows — Win Back", type: "Follow Ups", replyRate: 22.4, meetings: 19 },
  { name: "Enterprise RevOps Leaders", type: "LinkedIn", replyRate: 18.7, meetings: 27 },
  { name: "Agency Partnerships", type: "LinkedIn", replyRate: 16.2, meetings: 15 },
  { name: "Q3 SaaS Founders", type: "Cold Email", replyRate: 14.1, meetings: 38 },
];
