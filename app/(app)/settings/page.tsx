import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsView } from "@/components/settings/settings-view";
import { getProfile } from "@/lib/queries";
import { currentUser } from "@/lib/nav";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const profile = (await getProfile()) ?? currentUser;
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <PageHeader
        title="Settings"
        description="Manage your profile, workspace, notifications, integrations, and billing."
      />
      <SettingsView user={profile} />
    </div>
  );
}
