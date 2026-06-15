import { formatCompact, formatPercent } from "@/lib/utils";
import type { FunnelStage } from "@/types";

const colors = [
  "#6385ff",
  "#7c8dff",
  "#8b5cf6",
  "#a78bfa",
  "#38bdf8",
  "#34d399",
];

export function Funnel({ stages }: { stages: FunnelStage[] }) {
  const top = stages[0]?.value || 1;

  return (
    <div className="space-y-2.5">
      {stages.map((stage, i) => {
        const widthPct = (stage.value / top) * 100;
        const fromPrev =
          i === 0 ? 100 : (stage.value / stages[i - 1].value) * 100;
        return (
          <div key={stage.stage}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted">{stage.stage}</span>
              <span className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {formatCompact(stage.value)}
                </span>
                {i > 0 && (
                  <span className="text-[11px] text-faint">
                    {formatPercent(fromPrev, 0)}
                  </span>
                )}
              </span>
            </div>
            <div className="h-8 overflow-hidden rounded-lg bg-white/[0.03]">
              <div
                className="flex h-full items-center rounded-lg bg-gradient-to-r px-3 transition-all duration-700"
                style={{
                  width: `${Math.max(widthPct, 8)}%`,
                  backgroundImage: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}aa)`,
                }}
              >
                <span className="text-[11px] font-medium text-white/90">
                  {formatPercent((stage.value / top) * 100, 0)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
