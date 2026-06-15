import type { Metadata } from "next";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const metadata: Metadata = { title: "Campaigns" };

export default function CampaignsPage() {
  return (
    <ComingSoon
      icon="Send"
      title="Campaigns"
      phase="Phase 4"
      description="Manage cold email, LinkedIn outreach, and follow-up campaigns with open rates, reply rates, meetings booked, and a create-campaign flow."
    />
  );
}
