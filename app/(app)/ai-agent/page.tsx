import type { Metadata } from "next";
import { AgentChat } from "@/components/agent/agent-chat";
import { getProfile } from "@/lib/queries";
import { currentUser } from "@/lib/nav";

export const metadata: Metadata = { title: "AI Agent" };

export default async function AiAgentPage() {
  const profile = (await getProfile()) ?? currentUser;
  return <AgentChat userName={profile.name} />;
}
