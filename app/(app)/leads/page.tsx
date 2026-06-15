import type { Metadata } from "next";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const metadata: Metadata = { title: "Leads" };

export default function LeadsPage() {
  return (
    <ComingSoon
      icon="Users"
      title="Leads"
      phase="Phase 3"
      description="Advanced leads management — table with search, filters, sorting, pagination, bulk actions, and a rich lead-details drawer with AI insights."
    />
  );
}
