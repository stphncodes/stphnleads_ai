import { cn } from "@/lib/utils";
import { scoreTone } from "@/lib/lead-status";

const toneClasses: Record<string, string> = {
  success: "text-emerald-300",
  brand: "text-brand-300",
  warning: "text-amber-300",
  neutral: "text-faint",
};

export function ScorePill({
  score,
  size = "sm",
}: {
  score: number;
  size?: "sm" | "lg";
}) {
  const tone = scoreTone(score);
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-white/[0.07]",
          size === "lg" ? "h-2 w-24" : "h-1.5 w-14",
        )}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            tone === "success" && "bg-emerald-400",
            tone === "brand" && "bg-brand-400",
            tone === "warning" && "bg-amber-400",
            tone === "neutral" && "bg-faint",
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <span
        className={cn(
          "font-semibold tabular-nums",
          size === "lg" ? "text-sm" : "text-xs",
          toneClasses[tone],
        )}
      >
        {score}
      </span>
    </div>
  );
}
