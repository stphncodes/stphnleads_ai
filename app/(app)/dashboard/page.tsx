import type { Metadata } from "next";
import { Calendar, Download, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  RevenueCard,
  LeadSourceCard,
  ActivityFeed,
  RecommendationsPanel,
} from "@/components/dashboard/widgets";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { stats } from "@/data/dashboard";
import { currentUser } from "@/lib/nav";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title={`Welcome back, ${currentUser.name.split(" ")[0]}`}
        description="Here's what's happening across your pipeline today."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Calendar className="size-4" />
              Last 30 days
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="size-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm">
              <Sparkles className="size-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </Button>
          </>
        }
      />

      {/* stat grid */}
      <RevealGroup
        className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6"
        stagger={0.05}
      >
        {stats.map((stat) => (
          <RevealItem key={stat.id}>
            <StatCard stat={stat} />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueCard />
        </div>
        <LeadSourceCard />
      </div>

      {/* activity + recommendations */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <RecommendationsPanel />
      </div>
    </div>
  );
}
