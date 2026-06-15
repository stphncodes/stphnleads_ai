import type { Metadata } from "next";
import { AgentChat } from "@/components/agent/agent-chat";

export const metadata: Metadata = { title: "AI Agent" };

export default function AiAgentPage() {
  return <AgentChat />;
}
