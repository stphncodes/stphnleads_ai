"use client";

import * as React from "react";
import {
  User,
  Building2,
  Bell,
  Plug,
  CreditCard,
  Check,
  Upload,
  Sparkles,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/misc";
import { currentUser } from "@/lib/nav";

const tabs = [
  { value: "profile", label: "Profile", icon: <User className="size-4" /> },
  { value: "workspace", label: "Workspace", icon: <Building2 className="size-4" /> },
  { value: "notifications", label: "Notifications", icon: <Bell className="size-4" /> },
  { value: "integrations", label: "Integrations", icon: <Plug className="size-4" /> },
  { value: "billing", label: "Billing", icon: <CreditCard className="size-4" /> },
];

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-faint">{hint}</p>}
    </div>
  );
}

function Section({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/50 ring-glow">
      <div className="border-b border-white/[0.06] p-5 sm:p-6">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        <div className="mt-5 space-y-5">{children}</div>
      </div>
      {footer && (
        <div className="flex justify-end gap-2 bg-white/[0.015] p-4">{footer}</div>
      )}
    </div>
  );
}

export function SettingsView() {
  const [tab, setTab] = React.useState("profile");

  return (
    <div className="space-y-6">
      <Tabs items={tabs} value={tab} onValueChange={setTab} />
      {tab === "profile" && <ProfilePanel />}
      {tab === "workspace" && <WorkspacePanel />}
      {tab === "notifications" && <NotificationsPanel />}
      {tab === "integrations" && <IntegrationsPanel />}
      {tab === "billing" && <BillingPanel />}
    </div>
  );
}

/* ---------------- Profile ---------------- */
function ProfilePanel() {
  return (
    <Section
      title="Profile"
      description="Update your personal details and how you appear to your team."
      footer={
        <>
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save changes</Button>
        </>
      }
    >
      <div className="flex items-center gap-4">
        <Avatar name={currentUser.name} size="lg" ring />
        <div>
          <Button variant="outline" size="sm">
            <Upload className="size-3.5" />
            Upload photo
          </Button>
          <p className="mt-1.5 text-xs text-faint">JPG, PNG or GIF. Max 2MB.</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name">
          <Input defaultValue={currentUser.name} />
        </Field>
        <Field label="Email">
          <Input type="email" defaultValue={currentUser.email} />
        </Field>
        <Field label="Role">
          <Input defaultValue={currentUser.role} />
        </Field>
        <Field label="Timezone">
          <Input defaultValue="(GMT-08:00) Pacific Time" />
        </Field>
      </div>
      <Field label="Bio" hint="Brief description for your profile.">
        <Textarea defaultValue="Founder building the future of AI-powered sales. Helping teams turn prospects into clients." />
      </Field>
    </Section>
  );
}

/* ---------------- Workspace ---------------- */
const members = [
  { name: "Alex Stone", email: "alex@stphnlead.ai", role: "Owner" },
  { name: "Jordan Lee", email: "jordan@stphnlead.ai", role: "Admin" },
  { name: "Sam Rivera", email: "sam@stphnlead.ai", role: "Member" },
];

function WorkspacePanel() {
  return (
    <div className="space-y-6">
      <Section
        title="Workspace"
        description="Manage your workspace settings and branding."
        footer={<Button size="sm">Save changes</Button>}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Workspace name">
            <Input defaultValue="stphnLead AI" />
          </Field>
          <Field label="Workspace URL">
            <Input defaultValue="app.stphnlead.ai" />
          </Field>
          <Field label="Default sender">
            <Input defaultValue="Alex Stone <alex@stphnlead.ai>" />
          </Field>
          <Field label="Industry">
            <Input defaultValue="SaaS / B2B" />
          </Field>
        </div>
      </Section>

      <Section
        title="Team members"
        description="Invite teammates and manage their access."
        footer={<Button size="sm">Invite member</Button>}
      >
        <div className="divide-y divide-white/[0.05]">
          {members.map((m) => (
            <div key={m.email} className="flex items-center gap-3 py-3 first:pt-0">
              <Avatar name={m.name} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-faint">{m.email}</p>
              </div>
              <Badge tone={m.role === "Owner" ? "brand" : "neutral"}>
                {m.role}
              </Badge>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ---------------- Notifications ---------------- */
const notificationGroups = [
  {
    title: "Email notifications",
    items: [
      { label: "New high-intent leads", desc: "When stphnAgent finds hot leads", on: true },
      { label: "Replies & responses", desc: "When a prospect replies to outreach", on: true },
      { label: "Meeting reminders", desc: "Before scheduled meetings", on: true },
      { label: "Weekly digest", desc: "A summary of your pipeline each Monday", on: false },
    ],
  },
  {
    title: "Push notifications",
    items: [
      { label: "Deal stage changes", desc: "When deals move in your pipeline", on: true },
      { label: "AI recommendations", desc: "When the agent suggests an action", on: true },
      { label: "Campaign milestones", desc: "When campaigns hit key metrics", on: false },
    ],
  },
];

function NotificationsPanel() {
  const [state, setState] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      notificationGroups.flatMap((g) =>
        g.items.map((i) => [`${g.title}:${i.label}`, i.on]),
      ),
    ),
  );

  return (
    <div className="space-y-6">
      {notificationGroups.map((group) => (
        <Section key={group.title} title={group.title}>
          <div className="divide-y divide-white/[0.05]">
            {group.items.map((item) => {
              const key = `${group.title}:${item.label}`;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 py-3.5 first:pt-0"
                >
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-faint">{item.desc}</p>
                  </div>
                  <Switch
                    checked={state[key]}
                    onChange={(v) => setState((s) => ({ ...s, [key]: v }))}
                    aria-label={item.label}
                  />
                </div>
              );
            })}
          </div>
        </Section>
      ))}
    </div>
  );
}

/* ---------------- Integrations ---------------- */
const integrations = [
  { name: "Gmail", desc: "Send & sync email outreach", color: "#ea4335", connected: true },
  { name: "Google Calendar", desc: "Auto-book meetings", color: "#4285f4", connected: true },
  { name: "Slack", desc: "Get alerts in your channels", color: "#611f69", connected: true },
  { name: "LinkedIn", desc: "Run LinkedIn outreach", color: "#0a66c2", connected: false },
  { name: "Salesforce", desc: "Two-way CRM sync", color: "#00a1e0", connected: false },
  { name: "HubSpot", desc: "Two-way CRM sync", color: "#ff7a59", connected: false },
];

function IntegrationsPanel() {
  const [state, setState] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(integrations.map((i) => [i.name, i.connected])),
  );

  return (
    <Section
      title="Integrations"
      description="Connect your tools so stphnLead AI works where you do."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {integrations.map((it) => {
          const on = state[it.name];
          return (
            <div
              key={it.name}
              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5"
            >
              <span
                className="grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: it.color }}
              >
                {it.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{it.name}</p>
                  {on && (
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-emerald-300">
                      <Check className="size-3" />
                      Connected
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-faint">{it.desc}</p>
              </div>
              <Button
                variant={on ? "subtle" : "outline"}
                size="sm"
                onClick={() => setState((s) => ({ ...s, [it.name]: !on }))}
              >
                {on ? "Disconnect" : "Connect"}
              </Button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- Billing ---------------- */
const invoices = [
  { id: "INV-0042", date: "Jun 1, 2026", amount: "$199.00", status: "Paid" },
  { id: "INV-0041", date: "May 1, 2026", amount: "$199.00", status: "Paid" },
  { id: "INV-0040", date: "Apr 1, 2026", amount: "$199.00", status: "Paid" },
];

function BillingPanel() {
  return (
    <div className="space-y-6">
      {/* current plan */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-500/25 bg-gradient-to-br from-brand-500/12 to-accent-500/8 p-5 ring-glow sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-500">
                <Sparkles className="size-4 text-white" />
              </span>
              <h3 className="text-lg font-semibold">Pro plan</h3>
              <Badge tone="brand" dot>
                Active
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted">
              $199/month · renews Jul 1, 2026
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Change plan
            </Button>
            <Button size="sm">Manage</Button>
          </div>
        </div>

        {/* usage */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "AI lead credits", used: 7400, total: 10000 },
            { label: "Active campaigns", used: 6, total: 10 },
            { label: "Team seats", used: 3, total: 5 },
          ].map((u) => (
            <div key={u.label}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted">{u.label}</span>
                <span className="text-faint">
                  {u.used.toLocaleString()} / {u.total.toLocaleString()}
                </span>
              </div>
              <Progress value={(u.used / u.total) * 100} />
            </div>
          ))}
        </div>
      </div>

      {/* payment method */}
      <Section
        title="Payment method"
        footer={<Button variant="outline" size="sm">Update</Button>}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-12 place-items-center rounded-lg bg-white/[0.06] text-xs font-bold tracking-wider">
            VISA
          </span>
          <div>
            <p className="text-sm font-medium">•••• •••• •••• 4242</p>
            <p className="text-xs text-faint">Expires 08/2028</p>
          </div>
        </div>
      </Section>

      {/* invoices */}
      <Section title="Billing history">
        <div className="divide-y divide-white/[0.05]">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="flex items-center gap-4 py-3 text-sm first:pt-0"
            >
              <span className="font-medium">{inv.id}</span>
              <span className="text-faint">{inv.date}</span>
              <span className="ml-auto text-muted">{inv.amount}</span>
              <Badge tone="success">{inv.status}</Badge>
              <button className="text-xs text-brand-300 hover:text-brand-200">
                Download
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
