import { AppShell } from "@/components/dashboard/app-shell";
import { getProfile } from "@/lib/queries";
import { currentUser } from "@/lib/nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = (await getProfile()) ?? currentUser;
  return <AppShell user={profile}>{children}</AppShell>;
}
