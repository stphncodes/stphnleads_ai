import type { Metadata } from "next";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <ComingSoon
      icon="ChartSpline"
      title="Analytics"
      phase="Phase 5"
      description="Advanced analytics — conversion funnel, response rate, revenue and meeting trends, plus lead-source and campaign performance charts."
    />
  );
}
