import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { CampaignsView } from "@/components/campaigns/campaigns-view";

export const metadata: Metadata = { title: "Campaigns" };

export default function CampaignsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Campaigns"
        description="Run multi-channel outreach across cold email, LinkedIn, and follow-ups."
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            Create campaign
          </Button>
        }
      />
      <CampaignsView />
    </div>
  );
}
