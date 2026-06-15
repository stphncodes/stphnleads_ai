import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------- Separator ---------- */
export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      role="separator"
      className={cn(
        "bg-white/[0.07]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}

/* ---------- Progress ---------- */
export function Progress({
  value,
  className,
  tone = "brand",
}: {
  value: number;
  className?: string;
  tone?: "brand" | "accent" | "success" | "warning" | "danger";
}) {
  const tones = {
    brand: "from-brand-400 to-brand-600",
    accent: "from-accent-400 to-accent-600",
    success: "from-emerald-400 to-emerald-600",
    warning: "from-amber-400 to-amber-600",
    danger: "from-rose-400 to-rose-600",
  };
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-white/[0.06]",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-[width] duration-700 ease-out",
          tones[tone],
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ---------- Skeleton ---------- */
export function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "shimmer rounded-lg bg-white/[0.05]",
        className,
      )}
    />
  );
}

/* ---------- Kbd ---------- */
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-white/10 bg-white/[0.05] px-1.5 font-mono text-[10px] text-faint">
      {children}
    </kbd>
  );
}

/* ---------- Ring stat (mini radial) ---------- */
export function RingStat({
  value,
  size = 44,
  stroke = 4,
  tone = "#6385ff",
  label,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: string;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, value) / 100) * c;
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <span className="absolute text-[11px] font-semibold text-foreground">
        {label ?? value}
      </span>
    </div>
  );
}
