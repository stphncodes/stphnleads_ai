"use client";

import {
  Play,
  Pause,
  MoreHorizontal,
  CalendarCheck,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { campaignTypeConfig, campaignStatusConfig } from "@/data/campaigns";
import { formatCompact, formatPercent } from "@/lib/utils";
import type { Campaign } from "@/types";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const type = campaignTypeConfig[campaign.type];
  const status = campaignStatusConfig[campaign.status];
  const isDraft = campaign.status === "draft";

  const metrics = [
    { label: "Open rate", value: isDraft ? "—" : formatPercent(campaign.openRate, 1) },
    { label: "Reply rate", value: isDraft ? "—" : formatPercent(campaign.replyRate, 1) },
    {
      label: "Meetings",
      value: isDraft ? "—" : String(campaign.meetingsBooked),
    },
  ];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 p-5 ring-glow transition-colors hover:border-white/15">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: `${type.accent}22` }}
      />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 place-items-center rounded-xl ring-1 ring-white/10"
            style={{ backgroundColor: `${type.accent}1f`, color: type.accent }}
          >
            <ChannelIcon channel={campaign.type} className="size-5" />
          </span>
          <div>
            <p className="font-semibold leading-tight">{campaign.name}</p>
            <p className="text-xs text-faint">{type.label}</p>
          </div>
        </div>
        <button className="grid size-8 place-items-center rounded-lg text-faint opacity-0 transition-opacity hover:bg-white/[0.06] hover:text-foreground group-hover:opacity-100">
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Badge tone={status.tone} dot={campaign.status === "active"}>
          {status.label}
        </Badge>
        <span className="inline-flex items-center gap-1 text-[11px] text-faint">
          <Layers className="size-3" />
          {campaign.sequenceSteps} steps
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-faint">
          {formatCompact(campaign.sent)} sent
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="text-[11px] text-faint">{m.label}</p>
            <p className="mt-0.5 text-base font-semibold tracking-tight">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        {campaign.status === "active" ? (
          <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/[0.05] text-[13px] font-medium text-foreground transition-colors hover:bg-white/[0.08]">
            <Pause className="size-3.5" />
            Pause
          </button>
        ) : (
          <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-500/15 text-[13px] font-medium text-brand-200 transition-colors hover:bg-brand-500/25">
            <Play className="size-3.5" />
            {isDraft ? "Launch" : "Resume"}
          </button>
        )}
        <button className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/[0.05] text-[13px] font-medium text-muted transition-colors hover:bg-white/[0.08] hover:text-foreground">
          <CalendarCheck className="size-3.5" />
          Report
        </button>
      </div>
    </div>
  );
}
