"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Plus,
  Menu,
  Sparkles,
  UserPlus,
  Send,
  CalendarPlus,
  Settings,
  LogOut,
  CreditCard,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Kbd } from "@/components/ui/misc";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "@/components/ui/dropdown";
import { currentUser } from "@/lib/nav";

const notifications = [
  {
    title: "12 new high-intent leads",
    desc: "stphnAgent found leads in your SaaS niche.",
    time: "2m ago",
    unread: true,
  },
  {
    title: "Meeting confirmed",
    desc: "Demo with Quanta Labs at 2:00 PM.",
    time: "1h ago",
    unread: true,
  },
  {
    title: "Reply from Acme Inc.",
    desc: "“This looks great — can we talk Thursday?”",
    time: "3h ago",
    unread: false,
  },
];

const quickActions = [
  { icon: UserPlus, label: "Add lead" },
  { icon: Send, label: "New campaign" },
  { icon: CalendarPlus, label: "Book meeting" },
  { icon: Sparkles, label: "Ask stphnAgent" },
];

export function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/[0.06] bg-bg/70 px-4 backdrop-blur-xl sm:px-6">
      {/* mobile menu */}
      <button
        onClick={onOpenSidebar}
        className="grid size-9 place-items-center rounded-lg text-muted hover:bg-white/[0.06] hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      {/* search */}
      <div className="relative hidden flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          placeholder="Search leads, deals, campaigns…"
          className="h-10 w-full max-w-md rounded-xl border border-white/[0.07] bg-white/[0.03] pl-9 pr-16 text-sm text-foreground placeholder:text-faint focus:border-brand-500/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-brand-500/15"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 md:flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
        {/* quick actions */}
        <Dropdown>
          <DropdownTrigger className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 px-3.5 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(79,124,255,0.7)] transition-all hover:from-brand-300 hover:to-brand-500">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Quick actions</span>
          </DropdownTrigger>
          <DropdownMenu align="end">
            <DropdownLabel>Create</DropdownLabel>
            {quickActions.map((a) => (
              <DropdownItem key={a.label}>
                <a.icon className="size-4" />
                {a.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* notifications */}
        <Dropdown>
          <DropdownTrigger className="relative grid size-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-muted transition-colors hover:border-white/15 hover:text-foreground">
            <Bell className="size-[18px]" />
            {unread > 0 && (
              <span className="absolute right-2 top-2 size-2 rounded-full bg-brand-400 shadow-[0_0_8px] shadow-brand-400" />
            )}
          </DropdownTrigger>
          <DropdownMenu align="end" width="w-80">
            <div className="flex items-center justify-between px-2.5 py-1.5">
              <span className="text-sm font-semibold">Notifications</span>
              <span className="text-[11px] text-brand-300">
                {unread} new
              </span>
            </div>
            <DropdownSeparator />
            {notifications.map((n) => (
              <DropdownItem key={n.title} className="items-start py-2.5">
                <span
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${n.unread ? "bg-brand-400" : "bg-white/20"}`}
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground">
                    {n.title}
                  </span>
                  <span className="block truncate text-xs text-faint">
                    {n.desc}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-faint">
                    {n.time}
                  </span>
                </span>
              </DropdownItem>
            ))}
            <DropdownSeparator />
            <DropdownItem className="justify-center text-brand-300 hover:text-brand-200">
              View all
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* user */}
        <Dropdown>
          <DropdownTrigger className="flex items-center gap-2 rounded-xl p-0.5 transition-colors hover:bg-white/[0.05]">
            <Avatar name={currentUser.name} size="md" ring />
          </DropdownTrigger>
          <DropdownMenu align="end">
            <div className="flex items-center gap-3 px-2.5 py-2">
              <Avatar name={currentUser.name} size="md" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {currentUser.name}
                </p>
                <p className="truncate text-xs text-faint">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <DropdownSeparator />
            <Link href="/settings">
              <DropdownItem>
                <Settings className="size-4" />
                Settings
              </DropdownItem>
            </Link>
            <Link href="/settings">
              <DropdownItem>
                <CreditCard className="size-4" />
                Billing
                <span className="ml-auto rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-medium text-brand-200">
                  {currentUser.plan}
                </span>
              </DropdownItem>
            </Link>
            <DropdownSeparator />
            <Link href="/">
              <DropdownItem destructive>
                <LogOut className="size-4" />
                Log out
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
