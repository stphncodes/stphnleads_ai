import { TrendingUp, Wallet, Target, Trophy } from "lucide-react";
import { dealStageConfig, dealStageOrder } from "@/lib/lead-status";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { Deal } from "@/types";

export function PipelineSummary({ deals }: { deals: Deal[] }) {
  const open = deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
  const won = deals.filter((d) => d.stage === "won");
  const lost = deals.filter((d) => d.stage === "lost");

  const totalPipeline = open.reduce((s, d) => s + d.value, 0);
  const weighted = open.reduce((s, d) => s + d.value * (d.probability / 100), 0);
  const winRate =
    won.length + lost.length > 0
      ? (won.length / (won.length + lost.length)) * 100
      : 0;
  const avgDeal = deals.length
    ? deals.reduce((s, d) => s + d.value, 0) / deals.length
    : 0;

  const cards = [
    {
      icon: Wallet,
      label: "Open pipeline",
      value: formatCurrency(totalPipeline),
      sub: `${open.length} active deals`,
    },
    {
      icon: TrendingUp,
      label: "Weighted forecast",
      value: formatCurrency(weighted),
      sub: "probability-adjusted",
    },
    {
      icon: Trophy,
      label: "Win rate",
      value: formatPercent(winRate, 0),
      sub: `${won.length} won · ${lost.length} lost`,
    },
    {
      icon: Target,
      label: "Avg. deal size",
      value: formatCurrency(avgDeal),
      sub: "across all stages",
    },
  ];

  // stage distribution (exclude lost from the bar)
  const distStages = dealStageOrder.filter((s) => s !== "lost");
  const distTotal =
    deals.filter((d) => d.stage !== "lost").reduce((s, d) => s + d.value, 0) ||
    1;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/[0.07] bg-surface/50 p-4 ring-glow"
          >
            <div className="flex items-center gap-2 text-muted">
              <card.icon className="size-4 text-brand-300" />
              <span className="text-xs">{card.label}</span>
            </div>
            <p className="mt-2 text-xl font-semibold tracking-tight">
              {card.value}
            </p>
            <p className="mt-0.5 text-[11px] text-faint">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* stage distribution bar */}
      <div className="rounded-2xl border border-white/[0.07] bg-surface/50 p-4 ring-glow">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium">Pipeline by stage</span>
          <span className="text-xs text-faint">{formatCurrency(distTotal)}</span>
        </div>
        <div className="flex h-2.5 overflow-hidden rounded-full bg-white/[0.05]">
          {distStages.map((stage) => {
            const value = deals
              .filter((d) => d.stage === stage)
              .reduce((s, d) => s + d.value, 0);
            const pct = (value / distTotal) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={stage}
                style={{
                  width: `${pct}%`,
                  backgroundColor: dealStageConfig[stage].accent,
                }}
                title={`${dealStageConfig[stage].label}: ${formatCurrency(value)}`}
              />
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {distStages.map((stage) => (
            <span
              key={stage}
              className="flex items-center gap-1.5 text-[11px] text-muted"
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: dealStageConfig[stage].accent }}
              />
              {dealStageConfig[stage].label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
