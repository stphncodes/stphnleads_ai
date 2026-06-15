import type { Metadata } from "next";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const metadata: Metadata = { title: "Inbox" };

export default function InboxPage() {
  return (
    <ComingSoon
      icon="Inbox"
      title="Unified Inbox"
      phase="Phase 4"
      description="One inbox for Email, LinkedIn, and Messages — with threads, replies, labels, and AI-generated reply suggestions."
    />
  );
}
