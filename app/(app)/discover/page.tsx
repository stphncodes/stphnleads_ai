import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { DiscoverView } from "@/components/discover/discover-view";

export const metadata: Metadata = { title: "Discover" };

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Discover"
        description="Find highly-rated local businesses with no website — prime web & CRM prospects — straight from Google Maps."
      />
      <DiscoverView />
    </div>
  );
}
