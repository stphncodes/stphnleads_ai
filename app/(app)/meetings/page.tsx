import type { Metadata } from "next";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const metadata: Metadata = { title: "Meetings" };

export default function MeetingsPage() {
  return (
    <ComingSoon
      icon="CalendarCheck"
      title="Meetings"
      phase="Phase 5"
      description="A calendar of upcoming and past meetings with AI prep notes, attendees, and per-meeting context cards."
    />
  );
}
