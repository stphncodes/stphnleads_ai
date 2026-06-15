import type { Metadata } from "next";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <ComingSoon
      icon="Settings"
      title="Settings"
      phase="Phase 5"
      description="Profile, workspace, notifications, integrations, and billing — all in a clean tabbed settings experience."
    />
  );
}
