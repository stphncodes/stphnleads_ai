"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeft, Sparkles } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { Icon } from "@/components/ui/icon";
import { navItems, navFooterItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: (typeof navItems)[number];
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        collapsed && "justify-center px-0",
        active
          ? "text-foreground"
          : "text-muted hover:bg-white/[0.05] hover:text-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 -z-10 rounded-xl border border-brand-500/25 bg-brand-500/12"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <Icon
        name={item.icon}
        className={cn(
          "size-[18px] shrink-0",
          active && "text-brand-300",
        )}
      />
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
      {!collapsed && item.badge != null && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-500/20 px-1.5 text-[11px] font-semibold text-brand-200">
          {item.badge}
        </span>
      )}
      {collapsed && item.badge != null && (
        <span className="absolute right-2 top-2 size-2 rounded-full bg-brand-400" />
      )}
    </Link>
  );
}

export function SidebarContent({
  collapsed,
  onToggle,
  onNavigate,
}: {
  collapsed: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* brand + collapse */}
      <div
        className={cn(
          "flex h-16 items-center px-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        {collapsed ? <LogoMark /> : <Logo />}
        {onToggle && (
          <button
            onClick={onToggle}
            className={cn(
              "hidden size-8 place-items-center rounded-lg text-faint hover:bg-white/[0.06] hover:text-foreground lg:grid",
              collapsed && "absolute -right-3 top-5 size-6 rounded-full border border-white/10 bg-elevated",
            )}
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <PanelLeft className="size-3.5" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </button>
        )}
      </div>

      {/* nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2 no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* upgrade card */}
      {!collapsed && (
        <div className="mx-3 mb-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-brand-500/15 to-accent-500/10 p-4">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-500">
              <Sparkles className="size-3.5 text-white" />
            </span>
            <p className="text-sm font-semibold">Upgrade to Scale</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Unlock unlimited AI lead discovery and advanced automations.
          </p>
          <Link
            href="/settings"
            className="mt-3 block rounded-lg bg-white/10 py-2 text-center text-xs font-medium text-foreground transition-colors hover:bg-white/15"
          >
            View plans
          </Link>
        </div>
      )}

      {/* footer nav */}
      <div className="space-y-1 border-t border-white/[0.06] px-3 py-3">
        {navFooterItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}
