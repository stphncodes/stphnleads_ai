import * as React from "react";
import { cn } from "@/lib/utils";

type Tone =
  | "brand"
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

const tones: Record<Tone, string> = {
  brand: "bg-brand-500/12 text-brand-300 border-brand-500/25",
  accent: "bg-accent-500/12 text-accent-300 border-accent-500/25",
  neutral: "bg-white/[0.05] text-muted border-white/10",
  success: "bg-emerald-500/12 text-emerald-300 border-emerald-500/25",
  warning: "bg-amber-500/12 text-amber-300 border-amber-500/25",
  danger: "bg-rose-500/12 text-rose-300 border-rose-500/25",
  info: "bg-sky-500/12 text-sky-300 border-sky-500/25",
};

export function Badge({
  className,
  tone = "neutral",
  dot,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <span className="size-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
      )}
      {props.children}
    </span>
  );
}
