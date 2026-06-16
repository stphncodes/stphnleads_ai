import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { MeetingsView } from "@/components/meetings/meetings-view";
import { getMeetings } from "@/lib/queries";

export const metadata: Metadata = { title: "Meetings" };

export default async function MeetingsPage() {
  const meetings = await getMeetings();
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Meetings"
        description="Your schedule with AI prep notes for every call."
        actions={
          <Button size="sm">
            <Plus className="size-4" />
            Schedule
          </Button>
        }
      />
      <MeetingsView meetings={meetings} />
    </div>
  );
}
