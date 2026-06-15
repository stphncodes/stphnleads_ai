"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { SortableDealCard, DealCardBody } from "./deal-card";
import { dealStageConfig, dealStageOrder } from "@/lib/lead-status";
import { formatCurrency } from "@/lib/utils";
import type { Deal, DealStage } from "@/types";

type Columns = Record<DealStage, Deal[]>;

function groupByStage(deals: Deal[]): Columns {
  const cols = {} as Columns;
  dealStageOrder.forEach((s) => (cols[s] = []));
  deals.forEach((d) => cols[d.stage].push(d));
  return cols;
}

function Column({
  stage,
  deals,
}: {
  stage: DealStage;
  deals: Deal[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const config = dealStageConfig[stage];
  const total = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex w-[280px] shrink-0 flex-col">
      {/* column header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: config.accent }}
          />
          <span className="text-sm font-semibold">{config.label}</span>
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white/[0.06] px-1.5 text-[11px] font-medium text-muted">
            {deals.length}
          </span>
        </div>
        <span className="text-xs text-faint">{formatCurrency(total)}</span>
      </div>

      {/* droppable list */}
      <div
        ref={setNodeRef}
        className={`flex-1 space-y-2.5 rounded-2xl border p-2.5 transition-colors ${
          isOver
            ? "border-brand-500/40 bg-brand-500/[0.05]"
            : "border-white/[0.06] bg-white/[0.015]"
        }`}
      >
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {deals.map((deal) => (
            <SortableDealCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>

        {deals.length === 0 && (
          <div className="grid place-items-center rounded-xl border border-dashed border-white/[0.1] py-8 text-xs text-faint">
            Drop deals here
          </div>
        )}

        <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/[0.1] py-2.5 text-xs text-faint transition-colors hover:border-white/20 hover:text-muted">
          <Plus className="size-3.5" />
          Add deal
        </button>
      </div>
    </div>
  );
}

export function KanbanBoard({ initialDeals }: { initialDeals: Deal[] }) {
  const [columns, setColumns] = React.useState<Columns>(() =>
    groupByStage(initialDeals),
  );
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const dealById = React.useMemo(() => {
    const map = new Map<string, Deal>();
    Object.values(columns)
      .flat()
      .forEach((d) => map.set(d.id, d));
    return map;
  }, [columns]);

  function findContainer(id: string): DealStage | undefined {
    if (id in columns) return id as DealStage;
    return dealStageOrder.find((stage) =>
      columns[stage].some((d) => d.id === id),
    );
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    )
      return;

    setColumns((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeDeal = activeItems.find((d) => d.id === active.id);
      if (!activeDeal) return prev;

      const overIndex = overItems.findIndex((d) => d.id === over.id);
      const insertAt = overIndex >= 0 ? overIndex : overItems.length;

      return {
        ...prev,
        [activeContainer]: activeItems.filter((d) => d.id !== active.id),
        [overContainer]: [
          ...overItems.slice(0, insertAt),
          { ...activeDeal, stage: overContainer },
          ...overItems.slice(insertAt),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const container = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);
    if (!container || container !== overContainer) return;

    const items = columns[container];
    const oldIndex = items.findIndex((d) => d.id === active.id);
    const newIndex = items.findIndex((d) => d.id === over.id);
    if (oldIndex !== newIndex && newIndex >= 0) {
      setColumns((prev) => ({
        ...prev,
        [container]: arrayMove(prev[container], oldIndex, newIndex),
      }));
    }
  }

  const activeDeal = activeId ? dealById.get(activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {dealStageOrder.map((stage) => (
          <Column key={stage} stage={stage} deals={columns[stage]} />
        ))}
      </div>

      <DragOverlay>
        {activeDeal ? (
          <div className="w-[256px] rotate-2">
            <DealCardBody deal={activeDeal} dragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
