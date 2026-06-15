import type { IconName } from "@/components/ui/icon";

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  badge?: string | number;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Leads", href: "/leads", icon: "Users" },
  { label: "CRM", href: "/crm", icon: "Columns3" },
  { label: "Campaigns", href: "/campaigns", icon: "Send" },
  { label: "AI Agent", href: "/ai-agent", icon: "Sparkles" },
  { label: "Analytics", href: "/analytics", icon: "ChartSpline" },
  { label: "Inbox", href: "/inbox", icon: "Inbox", badge: 5 },
  { label: "Meetings", href: "/meetings", icon: "CalendarCheck" },
];

export const navFooterItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: "Settings" },
];

/** Current signed-in user (mock). */
export const currentUser = {
  name: "Alex Stone",
  email: "alex@stphnlead.ai",
  role: "Founder & CEO",
  plan: "Pro",
};
