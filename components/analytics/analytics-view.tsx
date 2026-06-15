"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, BarChart, CHART_COLORS } from "@/components/charts";
import { Funnel } from "./funnel";
import {
  analyticsKpis,
  conversionFunnel,
  responseRateTrend,
  revenueByMonth,
  meetingTrend,
  sourcePerformance,
  campaignPerformance,
} from "@/data/analytics";
import { formatCompact, formatPercent, cn } from "@/lib/utils";

function CardHead({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function AnalyticsView() {
  return (
    <div className="space-y-4">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {analyticsKpis.map((kpi) => {
          const up = kpi.trend === "up";
          return (
            <div
              key={kpi.label}
              className="rounded-2xl border border-white/[0.07] bg-surface/50 p-4 ring-glow"
            >
              <p className="text-xs text-muted">{kpi.label}</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-2xl font-semibold tracking-tight">
                  {kpi.value}
                </p>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-xs font-medium",
                    up ? "text-emerald-300" : "text-rose-300",
                  )}
                >
                  {up ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {Math.abs(kpi.delta)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* funnel + response rate */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <CardHead
            title="Conversion funnel"
            subtitle="Lead → won, last 30 days"
            right={<Badge tone="brand">1.6% win</Badge>}
          />
          <Funnel stages={conversionFunnel} />
        </Card>

        <Card className="p-5 sm:p-6">
          <CardHead
            title="Response rate"
            subtitle="Reply rate over time"
            right={<Badge tone="success">+2.4%</Badge>}
          />
          <AreaChart
            data={responseRateTrend}
            series={[{ key: "rate", color: CHART_COLORS.accent, label: "Reply rate" }]}
            formatter={(v) => `${v}%`}
            height={240}
          />
        </Card>
      </div>

      {/* revenue + meetings */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <CardHead
            title="Revenue trend"
            subtitle="Won revenue vs. target ($k)"
            right={
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="size-2.5 rounded-full bg-brand-400" /> Revenue
                </span>
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="size-2.5 rounded-full bg-accent-400" /> Target
                </span>
              </div>
            }
          />
          <AreaChart
            data={revenueByMonth}
            series={[
              { key: "revenue", color: CHART_COLORS.brand, label: "Revenue" },
              { key: "target", color: CHART_COLORS.accent, label: "Target" },
            ]}
            formatter={(v) => `$${v}k`}
            height={240}
          />
        </Card>

        <Card className="p-5 sm:p-6">
          <CardHead
            title="Meeting trend"
            subtitle="Meetings booked per week"
            right={<Badge tone="success">+91%</Badge>}
          />
          <BarChart
            data={meetingTrend}
            dataKey="meetings"
            color={CHART_COLORS.sky}
            height={240}
          />
        </Card>
      </div>

      {/* source + campaign performance */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <CardHead title="Lead source performance" subtitle="Conversion by source" />
          <div className="space-y-4">
            {sourcePerformance.map((s) => {
              const max = Math.max(...sourcePerformance.map((x) => x.conversion));
              return (
                <div key={s.source}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-foreground">{s.source}</span>
                    </span>
                    <span className="text-muted">
                      {formatCompact(s.leads)} leads ·{" "}
                      <span className="font-medium text-foreground">
                        {s.meetings}
                      </span>{" "}
                      meetings
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(s.conversion / max) * 100}%`,
                          backgroundColor: s.color,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-medium text-muted">
                      {formatPercent(s.conversion, 1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <CardHead title="Campaign performance" subtitle="Top campaigns by reply rate" />
          <div className="space-y-3">
            {campaignPerformance.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {c.name}
                  </p>
                  <p className="text-[11px] text-faint">{c.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {formatPercent(c.replyRate, 1)}
                  </p>
                  <p className="text-[11px] text-faint">reply</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-brand-300">
                    {c.meetings}
                  </p>
                  <p className="text-[11px] text-faint">mtgs</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
