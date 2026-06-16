"use client";

import * as React from "react";
import { Send, MousePointerClick, Reply, CalendarCheck } from "lucide-react";
import { CampaignCard } from "./campaign-card";
import { campaignTypeConfig } from "@/data/campaigns";
import { formatCompact, formatPercent, cn } from "@/lib/utils";
import type { Campaign, CampaignType } from "@/types";

const filters: { value: CampaignType | "all"; label: string }[] = [
  { value: "all", label: "All campaigns" },
  { value: "cold-email", label: "Cold Email" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "follow-up", label: "Follow Ups" },
];

export function CampaignsView({ campaigns }: { campaigns: Campaign[] }) {
  const [filter, setFilter] = React.useState<CampaignType | "all">("all");

  const visible =
    filter === "all"
      ? campaigns
      : campaigns.filter((c) => c.type === filter);

  // aggregate stats (weighted where relevant)
  const active = campaigns.filter((c) => c.status === "active");
  const totalSent = campaigns.reduce((s, c) => s + c.sent, 0);
  const totalMeetings = campaigns.reduce((s, c) => s + c.meetingsBooked, 0);
  const sentCampaigns = campaigns.filter((c) => c.sent > 0);
  const avgOpen =
    sentCampaigns.reduce((s, c) => s + c.openRate, 0) /
    (sentCampaigns.length || 1);
  const avgReply =
    sentCampaigns.reduce((s, c) => s + c.replyRate, 0) /
    (sentCampaigns.length || 1);

  const summary = [
    { icon: Send, label: "Messages sent", value: formatCompact(totalSent), sub: `${active.length} active` },
    { icon: MousePointerClick, label: "Avg. open rate", value: formatPercent(avgOpen, 1), sub: "across sent" },
    { icon: Reply, label: "Avg. reply rate", value: formatPercent(avgReply, 1), sub: "across sent" },
    { icon: CalendarCheck, label: "Meetings booked", value: String(totalMeetings), sub: "from campaigns" },
  ];

  return (
    <div className="space-y-6">
      {/* summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/[0.07] bg-surface/50 p-4 ring-glow"
          >
            <div className="flex items-center gap-2 text-muted">
              <s.icon className="size-4 text-brand-300" />
              <span className="text-xs">{s.label}</span>
            </div>
            <p className="mt-2 text-xl font-semibold tracking-tight">{s.value}</p>
            <p className="mt-0.5 text-[11px] text-faint">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "h-9 whitespace-nowrap rounded-lg px-3.5 text-sm font-medium transition-colors",
              filter === f.value
                ? "bg-brand-500/15 text-brand-200 ring-1 ring-brand-500/30"
                : "text-muted hover:bg-white/[0.05] hover:text-foreground",
            )}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1.5 text-faint">
                {campaigns.filter((c) => c.type === f.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          No {campaignTypeConfig[filter as CampaignType]?.label} campaigns yet.
        </p>
      )}
    </div>
  );
}
