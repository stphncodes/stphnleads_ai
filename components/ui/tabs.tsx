"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

export function Tabs({
  items,
  value,
  onValueChange,
  layoutId = "tab-underline",
  className,
}: {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  layoutId?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 overflow-x-auto border-b border-white/[0.07] no-scrollbar",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "relative flex items-center gap-2 whitespace-nowrap px-3.5 py-3 text-sm font-medium transition-colors",
              active ? "text-foreground" : "text-muted hover:text-foreground",
            )}
          >
            {item.icon}
            {item.label}
            {item.count != null && (
              <span
                className={cn(
                  "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-semibold",
                  active
                    ? "bg-brand-500/20 text-brand-200"
                    : "bg-white/[0.06] text-faint",
                )}
              >
                {item.count}
              </span>
            )}
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-400"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
