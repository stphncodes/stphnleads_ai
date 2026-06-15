"use client";

import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  indeterminate,
  onChange,
  className,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  "aria-label"?: string;
}) {
  const active = checked || indeterminate;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={cn(
        "grid size-[18px] shrink-0 place-items-center rounded-[6px] border transition-colors",
        active
          ? "border-brand-500 bg-brand-500 text-white"
          : "border-white/20 bg-white/[0.03] hover:border-white/40",
        className,
      )}
    >
      {indeterminate ? (
        <Minus className="size-3" strokeWidth={3} />
      ) : checked ? (
        <Check className="size-3" strokeWidth={3} />
      ) : null}
    </button>
  );
}
