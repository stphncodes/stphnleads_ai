import type { Metadata } from "next";
import { Plus, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { PipelineSummary } from "@/components/crm/pipeline-summary";
import { KanbanBoard } from "@/components/crm/kanban-board";
import { getDeals } from "@/lib/queries";

export const metadata: Metadata = { title: "CRM" };

export default async function CrmPage() {
  const deals = await getDeals();
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="CRM Pipeline"
        description="Drag deals across stages — forecasts and win rate update as you go."
        actions={
          <>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="size-4" />
              <span className="hidden sm:inline">Customize</span>
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              New deal
            </Button>
          </>
        }
      />

      <PipelineSummary deals={deals} />

      <KanbanBoard initialDeals={deals} />
    </div>
  );
}
