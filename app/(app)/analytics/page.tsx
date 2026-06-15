import type { Metadata } from "next";
import { Calendar, Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { AnalyticsView } from "@/components/analytics/analytics-view";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Analytics"
        description="Track conversion, response rates, revenue, and what's driving meetings."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Calendar className="size-4" />
              Last 6 months
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="size-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </>
        }
      />
      <AnalyticsView />
    </div>
  );
}
