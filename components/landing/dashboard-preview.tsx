import {
  LayoutDashboard,
  Users,
  Columns3,
  Send,
  Sparkles,
  TrendingUp,
  Search,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const sideItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Leads" },
  { icon: Columns3, label: "CRM" },
  { icon: Send, label: "Campaigns" },
  { icon: Sparkles, label: "AI Agent" },
];

const stats = [
  { label: "Total Leads", value: "12,480", delta: "+18%" },
  { label: "Qualified", value: "3,210", delta: "+12%" },
  { label: "Meetings", value: "486", delta: "+27%" },
];

const bars = [42, 58, 47, 70, 63, 88, 76, 95, 82, 100, 91, 78];

const pipeline = [
  { name: "Acme Inc.", value: "$48k", tone: "from-brand-400 to-brand-600" },
  { name: "Quanta Labs", value: "$32k", tone: "from-accent-400 to-accent-600" },
  { name: "Helio Co.", value: "$26k", tone: "from-sky-400 to-sky-600" },
];

/** Premium static mock of the in-app dashboard, used on the landing hero. */
export function DashboardPreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "glass-strong overflow-hidden rounded-2xl ring-glow",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="size-3 rounded-full bg-rose-400/80" />
        <span className="size-3 rounded-full bg-amber-400/80" />
        <span className="size-3 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex h-7 flex-1 items-center gap-2 rounded-lg bg-white/[0.04] px-3 text-[11px] text-faint">
          <Search className="size-3" />
          app.stphnlead.ai/dashboard
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-white/[0.06] p-3 sm:flex">
          <div className="mb-2 flex items-center gap-2 px-1">
            <LogoMark className="size-7" />
            <span className="text-xs font-semibold">stphnLead</span>
          </div>
          {sideItems.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px]",
                item.active
                  ? "bg-brand-500/15 text-brand-200"
                  : "text-faint",
              )}
            >
              <item.icon className="size-3.5" />
              {item.label}
            </div>
          ))}
        </aside>

        {/* main */}
        <div className="min-w-0 flex-1 space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-faint">Welcome back</p>
              <p className="text-sm font-semibold">Sales Overview</p>
            </div>
            <Avatar name="Alex Stone" size="sm" />
          </div>

          {/* stat row */}
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5"
              >
                <p className="truncate text-[10px] text-faint">{s.label}</p>
                <p className="mt-1 text-sm font-semibold">{s.value}</p>
                <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-300">
                  <TrendingUp className="size-2.5" />
                  {s.delta}
                </span>
              </div>
            ))}
          </div>

          {/* chart */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-medium text-muted">
                Revenue pipeline
              </p>
              <span className="text-[10px] text-faint">Last 12 weeks</span>
            </div>
            <div className="flex h-20 items-end gap-1.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-brand-500/30 to-brand-400"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* pipeline list */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="mb-2 text-[11px] font-medium text-muted">
              Top deals
            </p>
            <div className="space-y-2">
              {pipeline.map((p) => (
                <div key={p.name} className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "size-6 shrink-0 rounded-md bg-gradient-to-br",
                      p.tone,
                    )}
                  />
                  <span className="flex-1 truncate text-[11px] text-foreground">
                    {p.name}
                  </span>
                  <span className="text-[11px] font-semibold text-muted">
                    {p.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI insight bar */}
      <div className="flex items-center gap-2.5 border-t border-white/[0.06] bg-brand-500/[0.06] px-4 py-3">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-500">
          <Sparkles className="size-3.5 text-white" />
        </span>
        <p className="truncate text-[11px] text-muted">
          <span className="font-medium text-foreground">stphnAgent:</span> Found
          34 high-intent SaaS leads — 12 ready to contact now.
        </p>
      </div>
    </div>
  );
}
