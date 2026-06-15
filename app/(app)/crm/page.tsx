import type { Metadata } from "next";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const metadata: Metadata = { title: "CRM" };

export default function CrmPage() {
  return (
    <ComingSoon
      icon="Columns3"
      title="CRM Pipeline"
      phase="Phase 3"
      description="A drag-and-drop Kanban pipeline with deal cards, values, AI suggestions, pipeline summary, forecast, and win-rate widgets."
    />
  );
}
