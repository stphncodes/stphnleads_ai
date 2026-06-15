import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsView } from "@/components/settings/settings-view";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Settings"
        description="Manage your profile, workspace, notifications, integrations, and billing."
      />
      <SettingsView />
    </div>
  );
}
