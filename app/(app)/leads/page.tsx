import type { Metadata } from "next";
import { Plus, Download, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { LeadsTable } from "@/components/leads/leads-table";
import { leads, leadCounts } from "@/data/leads";
import { leadStatusConfig, leadStatusOrder } from "@/lib/lead-status";
import { formatCompact } from "@/lib/utils";

export const metadata: Metadata = { title: "Leads" };

export default function LeadsPage() {
  const summary = [
    { label: "Total leads", value: leads.length, tone: "text-foreground" },
    ...leadStatusOrder.map((s) => ({
      label: leadStatusConfig[s].label,
      value: leadCounts[s] ?? 0,
      tone: "text-foreground",
    })),
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Leads"
        description="Discover, qualify, and manage every prospect in one place."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="secondary" size="sm">
              <Sparkles className="size-4" />
              <span className="hidden sm:inline">Find leads</span>
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              Add lead
            </Button>
          </>
        }
      />

      {/* summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {summary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/[0.07] bg-surface/50 p-4 ring-glow"
          >
            <p className="text-xs text-muted">{item.label}</p>
            <p className={`mt-1 text-2xl font-semibold tracking-tight ${item.tone}`}>
              {formatCompact(item.value)}
            </p>
          </div>
        ))}
      </div>

      <LeadsTable />
    </div>
  );
}
