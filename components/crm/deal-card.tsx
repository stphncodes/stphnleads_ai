"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Sparkles, GripVertical } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { priorityConfig } from "@/lib/lead-status";
import { formatCurrency, cn } from "@/lib/utils";
import type { Deal } from "@/types";

export function DealCardBody({
  deal,
  dragging,
  handleProps,
}: {
  deal: Deal;
  dragging?: boolean;
  handleProps?: React.HTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-white/[0.08] bg-elevated/90 p-3.5 transition-shadow",
        dragging
          ? "shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-brand-500/40"
          : "hover:border-white/15",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium leading-snug text-foreground">
          {deal.leadName}
        </p>
        <button
          {...handleProps}
          className="-mr-1 -mt-1 cursor-grab touch-none rounded p-1 text-faint opacity-0 transition-opacity hover:text-muted group-hover:opacity-100 active:cursor-grabbing"
          aria-label="Drag"
        >
          <GripVertical className="size-4" />
        </button>
      </div>
      <p className="mt-0.5 text-xs text-faint">{deal.company}</p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-semibold text-foreground">
          {formatCurrency(deal.value)}
        </span>
        <Badge tone={priorityConfig[deal.priority].tone}>
          {priorityConfig[deal.priority].label}
        </Badge>
      </div>

      {deal.aiSuggestion && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-brand-500/15 bg-brand-500/[0.06] p-2">
          <Sparkles className="mt-0.5 size-3 shrink-0 text-brand-300" />
          <p className="text-[11px] leading-snug text-muted">
            {deal.aiSuggestion}
          </p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
        <div className="flex items-center gap-1.5">
          <Avatar name={deal.owner} size="xs" />
          <span className="text-[11px] text-faint">{deal.probability}%</span>
        </div>
        <span className="text-[11px] text-faint">{deal.closeDate}</span>
      </div>
    </div>
  );
}

export function SortableDealCard({ deal }: { deal: Deal }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
      }}
      {...attributes}
    >
      <DealCardBody deal={deal} handleProps={listeners as never} />
    </div>
  );
}
