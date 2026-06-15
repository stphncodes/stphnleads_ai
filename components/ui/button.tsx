"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "subtle"
  | "danger";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-[0_8px_24px_-8px_rgba(79,124,255,0.7)] hover:from-brand-300 hover:to-brand-500 hover:shadow-[0_10px_30px_-8px_rgba(79,124,255,0.85)] active:translate-y-px",
  secondary:
    "bg-surface-2 text-foreground border border-white/10 hover:bg-elevated hover:border-white/20",
  outline:
    "border border-white/15 text-foreground bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25",
  ghost: "text-muted hover:text-foreground hover:bg-white/[0.06]",
  subtle: "bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
  danger:
    "bg-gradient-to-b from-rose-400 to-rose-600 text-white hover:from-rose-300 hover:to-rose-500",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-[15px] gap-2 rounded-xl",
  icon: "h-10 w-10 rounded-xl",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex select-none items-center justify-center font-medium whitespace-nowrap transition-all duration-200 outline-none",
          "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
