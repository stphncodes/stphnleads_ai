"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { AreaChart, DonutChart, CHART_COLORS } from "@/components/charts";
import { formatClock, formatCompact } from "@/lib/utils";
import {
  revenueTrend,
  leadSources,
  activity,
  recommendations,
} from "@/data/dashboard";

/* ---------- Revenue trend ---------- */
export function RevenueCard() {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold">Revenue pipeline</h3>
          <p className="mt-0.5 text-sm text-muted">
            Pipeline vs. closed-won, last 12 weeks
          </p>
        </div>
        <Badge tone="success" dot>
          <TrendingUp className="size-3" />
          +24%
        </Badge>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5 text-muted">
          <span className="size-2.5 rounded-full bg-brand-400" /> Pipeline
        </span>
        <span className="flex items-center gap-1.5 text-muted">
          <span className="size-2.5 rounded-full bg-accent-400" /> Closed
        </span>
      </div>
      <div className="mt-2">
        <AreaChart
          data={revenueTrend}
          series={[
            { key: "pipeline", color: CHART_COLORS.brand, label: "Pipeline" },
            { key: "closed", color: CHART_COLORS.accent, label: "Closed" },
          ]}
          formatter={(v) => `$${v}k`}
        />
      </div>
    </Card>
  );
}

/* ---------- Lead source breakdown ---------- */
export function LeadSourceCard() {
  const total = leadSources.reduce((sum, s) => sum + s.value, 0);
  return (
    <Card className="p-5 sm:p-6">
      <h3 className="text-base font-semibold">Lead sources</h3>
      <p className="mt-0.5 text-sm text-muted">Where your leads come from</p>

      <div className="relative mt-4">
        <DonutChart
          data={leadSources.map((s) => ({
            name: s.source,
            value: s.value,
            color: s.color,
          }))}
          formatter={(v) => formatCompact(v)}
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold">{formatCompact(total)}</span>
          <span className="text-xs text-faint">total leads</span>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {leadSources.map((s) => (
          <div key={s.source} className="flex items-center gap-2.5 text-sm">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="flex-1 text-muted">{s.source}</span>
            <span className="font-medium text-foreground">
              {formatCompact(s.value)}
            </span>
            <span className="w-10 text-right text-xs text-faint">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- Activity feed ---------- */
const activityIcon: Record<string, { icon: string; tone: string }> = {
  ai: { icon: "Sparkles", tone: "text-brand-300 bg-brand-500/12" },
  meeting: { icon: "CalendarCheck", tone: "text-sky-300 bg-sky-500/12" },
  deal: { icon: "DollarSign", tone: "text-emerald-300 bg-emerald-500/12" },
  campaign: { icon: "Send", tone: "text-accent-300 bg-accent-500/12" },
  lead: { icon: "UserPlus", tone: "text-amber-300 bg-amber-500/12" },
};

export function ActivityFeed() {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Recent activity</h3>
        <Link
          href="/inbox"
          className="text-xs text-brand-300 hover:text-brand-200"
        >
          View all
        </Link>
      </div>
      <div className="mt-5 space-y-1">
        {activity.map((event, i) => {
          const meta = activityIcon[event.type] ?? activityIcon.lead;
          return (
            <div key={event.id} className="relative flex gap-3.5 pb-5 last:pb-0">
              {i < activity.length - 1 && (
                <span className="absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-px bg-white/[0.07]" />
              )}
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-lg ${meta.tone}`}
              >
                <Icon name={meta.icon} className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {event.title}
                </p>
                <p className="truncate text-xs text-muted">
                  {event.description}
                </p>
                <p className="mt-0.5 text-[11px] text-faint">
                  {event.actor ? `${event.actor} · ` : ""}
                  {formatClock(event.at)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ---------- AI recommendations ---------- */
const impactTone = {
  high: "danger" as const,
  medium: "warning" as const,
  low: "neutral" as const,
};

export function RecommendationsPanel() {
  return (
    <Card className="relative overflow-hidden p-5 sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-500 shadow-[0_8px_24px_-8px_rgba(99,133,255,0.8)]">
          <Sparkles className="size-4.5 text-white" />
        </span>
        <div>
          <h3 className="text-base font-semibold">AI recommendations</h3>
          <p className="text-xs text-faint">Suggested by stphnAgent</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-white/15"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{rec.title}</p>
              <Badge tone={impactTone[rec.impact]} className="shrink-0">
                {rec.impact}
              </Badge>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              {rec.description}
            </p>
            <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-300 transition-colors hover:text-brand-200">
              {rec.action}
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
