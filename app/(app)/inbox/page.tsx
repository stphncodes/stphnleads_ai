import type { Metadata } from "next";
import { InboxView } from "@/components/inbox/inbox-view";
import { getInboxThreads } from "@/lib/queries";

export const metadata: Metadata = { title: "Inbox" };

export default async function InboxPage() {
  const threads = await getInboxThreads();
  return <InboxView threads={threads} />;
}
