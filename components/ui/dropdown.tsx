"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Align = "start" | "end";

interface DropdownContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export function Dropdown({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(DropdownContext)!;
  return (
    <button
      type="button"
      className={className}
      onClick={() => ctx.setOpen(!ctx.open)}
      aria-haspopup="menu"
      aria-expanded={ctx.open}
    >
      {children}
    </button>
  );
}

export function DropdownMenu({
  children,
  align = "end",
  className,
  width = "w-60",
}: {
  children: React.ReactNode;
  align?: Align;
  className?: string;
  width?: string;
}) {
  const ctx = React.useContext(DropdownContext)!;
  return (
    <AnimatePresence>
      {ctx.open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          role="menu"
          className={cn(
            "glass-strong absolute z-50 mt-2 overflow-hidden rounded-xl p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]",
            align === "end" ? "right-0" : "left-0",
            width,
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownItem({
  children,
  className,
  onSelect,
  destructive,
}: {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
  destructive?: boolean;
}) {
  const ctx = React.useContext(DropdownContext)!;
  return (
    <button
      type="button"
      role="menuitem"
      onClick={() => {
        onSelect?.();
        ctx.setOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
        destructive
          ? "text-rose-300 hover:bg-rose-500/10"
          : "text-muted hover:bg-white/[0.06] hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function DropdownLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-faint">
      {children}
    </div>
  );
}

export function DropdownSeparator() {
  return <div className="my-1.5 h-px bg-white/[0.07]" />;
}
