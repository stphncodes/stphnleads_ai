"use client";

import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Sparkles,
  Check,
  Calendar,
  Send,
  MessageSquare,
  Plus,
} from "lucide-react";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScorePill } from "./score-pill";
import { leadStatusConfig } from "@/lib/lead-status";
import { formatClock, formatCurrency } from "@/lib/utils";
import type { Lead, NextAction } from "@/types";

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="size-4 text-brand-300" />
      {children}
    </div>
  );
}

const actionIcon: Record<NextAction["type"], React.ComponentType<{ className?: string }>> = {
  email: Mail,
  call: Phone,
  meeting: Calendar,
  task: Check,
};

export function LeadDrawer({
  lead,
  onClose,
}: {
  lead: Lead | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!lead} onClose={onClose}>
      {lead && (
        <>
          {/* header */}
          <div className="border-b border-white/[0.07] p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={lead.name} size="lg" ring />
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {lead.name}
                  </h2>
                  <p className="text-sm text-muted">
                    {lead.title} · {lead.company}
                  </p>
                </div>
              </div>
              <SheetClose onClose={onClose} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge tone={leadStatusConfig[lead.status].tone} dot>
                {leadStatusConfig[lead.status].label}
              </Badge>
              <Badge tone="neutral">{lead.source}</Badge>
              {lead.tags.map((t) => (
                <Badge key={t} tone="neutral">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* scroll body */}
          <div className="flex-1 space-y-7 overflow-y-auto p-5 sm:p-6">
            {/* key facts */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                <p className="text-xs text-faint">Lead score</p>
                <div className="mt-2">
                  <ScorePill score={lead.score} size="lg" />
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                <p className="text-xs text-faint">Potential value</p>
                <p className="mt-1.5 text-lg font-semibold text-foreground">
                  {formatCurrency(lead.value)}
                </p>
              </div>
            </div>

            {/* contact */}
            <div className="space-y-2.5">
              {[
                { icon: Mail, value: lead.email },
                { icon: Phone, value: lead.phone },
                { icon: Building2, value: `${lead.company} · ${lead.industry}` },
                { icon: MapPin, value: lead.location },
              ].map((row) => (
                <div
                  key={row.value}
                  className="flex items-center gap-3 text-sm text-muted"
                >
                  <row.icon className="size-4 shrink-0 text-faint" />
                  <span className="truncate">{row.value}</span>
                </div>
              ))}
            </div>

            {/* AI insights */}
            <div className="rounded-xl border border-brand-500/20 bg-brand-500/[0.06] p-4">
              <SectionTitle icon={Sparkles}>AI insights</SectionTitle>
              <ul className="mt-3 space-y-2">
                {lead.insights?.map((insight) => (
                  <li key={insight} className="flex gap-2.5 text-sm text-muted">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            {/* next actions */}
            <div className="space-y-3">
              <SectionTitle icon={Check}>Next actions</SectionTitle>
              <div className="space-y-2">
                {lead.nextActions?.map((action) => {
                  const Icon = actionIcon[action.type];
                  return (
                    <div
                      key={action.id}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"
                    >
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-lg ${action.done ? "bg-emerald-500/12 text-emerald-300" : "bg-white/[0.05] text-muted"}`}
                      >
                        <Icon className="size-3.5" />
                      </span>
                      <span
                        className={`flex-1 text-sm ${action.done ? "text-faint line-through" : "text-foreground"}`}
                      >
                        {action.label}
                      </span>
                      <span className="text-xs text-faint">{action.due}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* conversation */}
            <div className="space-y-3">
              <SectionTitle icon={MessageSquare}>
                Conversation history
              </SectionTitle>
              {lead.conversation && lead.conversation.length > 0 ? (
                <div className="space-y-3">
                  {lead.conversation.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.direction === "out" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                          msg.direction === "out"
                            ? "bg-brand-500/15 text-foreground"
                            : "border border-white/[0.07] bg-white/[0.02] text-muted"
                        }`}
                      >
                        <p>{msg.body}</p>
                        <p className="mt-1 text-[10px] text-faint">
                          {msg.channel} · {formatClock(msg.at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-white/[0.1] p-4 text-center text-sm text-faint">
                  No messages yet — start the conversation.
                </p>
              )}
            </div>

            {/* notes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SectionTitle icon={MessageSquare}>Notes</SectionTitle>
                <button className="inline-flex items-center gap-1 text-xs text-brand-300 hover:text-brand-200">
                  <Plus className="size-3" />
                  Add note
                </button>
              </div>
              {lead.notes && lead.notes.length > 0 ? (
                lead.notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5"
                  >
                    <p className="text-sm text-muted">{note.body}</p>
                    <p className="mt-2 text-[11px] text-faint">
                      {note.author} · {formatClock(note.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-dashed border-white/[0.1] p-4 text-center text-sm text-faint">
                  No notes yet.
                </p>
              )}
            </div>
          </div>

          {/* footer actions */}
          <div className="flex items-center gap-2 border-t border-white/[0.07] p-4">
            <Button className="flex-1">
              <Send className="size-4" />
              Send email
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="size-4" />
              Book meeting
            </Button>
          </div>
        </>
      )}
    </Sheet>
  );
}
