import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Sparkline, CHART_COLORS } from "@/components/charts";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types";

export function StatCard({ stat }: { stat: Stat }) {
  const up = stat.trend === "up";
  const color = up ? CHART_COLORS.brand : CHART_COLORS.rose;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 p-5 ring-glow transition-colors hover:border-white/15">
      <div className="flex items-start justify-between">
        <div className="grid size-10 place-items-center rounded-xl bg-white/[0.04] text-brand-300 ring-1 ring-white/[0.06]">
          <Icon name={stat.icon} className="size-5" />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
            up
              ? "bg-emerald-500/12 text-emerald-300"
              : "bg-rose-500/12 text-rose-300",
          )}
        >
          {up ? (
            <ArrowUpRight className="size-3" />
          ) : (
            <ArrowDownRight className="size-3" />
          )}
          {Math.abs(stat.delta)}%
        </span>
      </div>

      <p className="mt-4 text-sm text-muted">{stat.label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</p>

      {stat.spark && (
        <div className="mt-3 -mx-1 h-10 opacity-80">
          <Sparkline data={stat.spark} color={color} />
        </div>
      )}
    </div>
  );
}
