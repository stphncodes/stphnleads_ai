import type { Metadata } from "next";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const metadata: Metadata = { title: "AI Agent" };

export default function AiAgentPage() {
  return (
    <ComingSoon
      icon="Sparkles"
      title="stphnAgent"
      phase="Phase 4"
      description="An AI chat workspace that finds leads, analyzes your CRM, suggests outreach, and summarizes your pipeline — with prompt suggestions and a typing animation."
    />
  );
}
