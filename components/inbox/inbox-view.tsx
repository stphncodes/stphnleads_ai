"use client";

import * as React from "react";
import {
  Star,
  Search,
  ArrowLeft,
  Sparkles,
  Send,
  Archive,
  Paperclip,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { inboxThreads, inboxChannels, labelTones } from "@/data/inbox";
import { formatClock, cn } from "@/lib/utils";
import type { InboxChannel, InboxThread } from "@/types";

export function InboxView() {
  const [channel, setChannel] = React.useState<InboxChannel>("email");
  const [query, setQuery] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [reply, setReply] = React.useState("");
  const [showDetailMobile, setShowDetailMobile] = React.useState(false);

  const threads = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return inboxThreads.filter(
      (t) =>
        t.channel === channel &&
        (!q ||
          t.contactName.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q)),
    );
  }, [channel, query]);

  const active = inboxThreads.find((t) => t.id === activeId) ?? null;

  // keep a valid selection when switching channel
  React.useEffect(() => {
    if (!threads.some((t) => t.id === activeId)) {
      setActiveId(threads[0]?.id ?? null);
    }
  }, [threads, activeId]);

  function unreadCount(ch: InboxChannel) {
    return inboxThreads.filter((t) => t.channel === ch && t.unread).length;
  }

  function openThread(id: string) {
    setActiveId(id);
    setReply("");
    setShowDetailMobile(true);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* channel tabs */}
      <div className="flex items-center gap-1 border-b border-white/[0.06] px-4 sm:px-6">
        {inboxChannels.map((c) => {
          const count = unreadCount(c.value);
          return (
            <button
              key={c.value}
              onClick={() => setChannel(c.value)}
              className={cn(
                "relative flex items-center gap-2 px-3 py-3.5 text-sm font-medium transition-colors",
                channel === c.value
                  ? "text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              <ChannelIcon channel={c.value} className="size-4" />
              {c.label}
              {count > 0 && (
                <span className="grid h-4 min-w-4 place-items-center rounded-full bg-brand-500/20 px-1 text-[10px] font-semibold text-brand-200">
                  {count}
                </span>
              )}
              {channel === c.value && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-400" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* thread list */}
        <div
          className={cn(
            "flex w-full flex-col border-r border-white/[0.06] lg:w-80 lg:shrink-0",
            showDetailMobile && "hidden lg:flex",
          )}
        >
          <div className="border-b border-white/[0.06] p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search messages…"
                className="h-9 w-full rounded-lg border border-white/[0.07] bg-white/[0.03] pl-9 pr-3 text-sm text-foreground placeholder:text-faint focus:border-brand-500/40 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((t) => (
              <ThreadRow
                key={t.id}
                thread={t}
                active={t.id === activeId}
                onClick={() => openThread(t.id)}
              />
            ))}
            {threads.length === 0 && (
              <p className="p-8 text-center text-sm text-faint">
                No conversations here.
              </p>
            )}
          </div>
        </div>

        {/* thread detail */}
        <div
          className={cn(
            "min-w-0 flex-1 flex-col",
            showDetailMobile ? "flex" : "hidden lg:flex",
          )}
        >
          {active ? (
            <ThreadDetail
              key={active.id}
              thread={active}
              reply={reply}
              setReply={setReply}
              onBack={() => setShowDetailMobile(false)}
            />
          ) : (
            <div className="hidden flex-1 place-items-center lg:grid">
              <p className="text-sm text-faint">Select a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ThreadRow({
  thread,
  active,
  onClick,
}: {
  thread: InboxThread;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full gap-3 border-b border-white/[0.04] p-3.5 text-left transition-colors hover:bg-white/[0.025]",
        active && "bg-brand-500/[0.07]",
      )}
    >
      <Avatar name={thread.contactName} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "truncate text-sm",
              thread.unread ? "font-semibold text-foreground" : "text-muted",
            )}
          >
            {thread.contactName}
          </span>
          <span className="shrink-0 text-[11px] text-faint">
            {formatClock(thread.at)}
          </span>
        </div>
        <p className="truncate text-xs text-faint">{thread.subject}</p>
        <p
          className={cn(
            "mt-0.5 truncate text-xs",
            thread.unread ? "text-muted" : "text-faint",
          )}
        >
          {thread.preview}
        </p>
        {thread.labels.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {thread.labels.map((l) => (
              <Badge
                key={l}
                tone={labelTones[l] ?? "neutral"}
                className="px-1.5 py-0 text-[10px]"
              >
                {l}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-1.5">
        {thread.unread && <span className="size-2 rounded-full bg-brand-400" />}
        {thread.starred && (
          <Star className="size-3.5 fill-amber-300 text-amber-300" />
        )}
      </div>
    </button>
  );
}

function ThreadDetail({
  thread,
  reply,
  setReply,
  onBack,
}: {
  thread: InboxThread;
  reply: string;
  setReply: (v: string) => void;
  onBack: () => void;
}) {
  return (
    <>
      {/* header */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] p-3.5 sm:px-5">
        <button
          onClick={onBack}
          className="grid size-9 place-items-center rounded-lg text-muted hover:bg-white/[0.06] hover:text-foreground lg:hidden"
          aria-label="Back"
        >
          <ArrowLeft className="size-4.5" />
        </button>
        <Avatar name={thread.contactName} size="md" ring />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{thread.contactName}</p>
          <p className="truncate text-xs text-faint">
            {thread.company} · {thread.subject}
          </p>
        </div>
        <button className="grid size-9 place-items-center rounded-lg text-muted hover:bg-white/[0.06] hover:text-foreground">
          <Star
            className={cn(
              "size-4.5",
              thread.starred && "fill-amber-300 text-amber-300",
            )}
          />
        </button>
        <button className="hidden size-9 place-items-center rounded-lg text-muted hover:bg-white/[0.06] hover:text-foreground sm:grid">
          <Archive className="size-4.5" />
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {thread.messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex", m.direction === "out" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                m.direction === "out"
                  ? "bg-brand-500/15 text-foreground"
                  : "border border-white/[0.07] bg-surface/70 text-muted",
              )}
            >
              <p>{m.body}</p>
              <p className="mt-1.5 text-[10px] text-faint">
                {formatClock(m.at)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AI suggestions + composer */}
      <div className="border-t border-white/[0.06] bg-bg/40 p-3.5 sm:px-5 sm:py-4">
        <div className="mb-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-brand-300">
            <Sparkles className="size-3" />
            AI replies
          </span>
          {thread.aiReplies.map((s, i) => (
            <button
              key={i}
              onClick={() => setReply(s)}
              className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand-500/30 hover:text-foreground"
            >
              {s.length > 52 ? s.slice(0, 52) + "…" : s}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2 rounded-2xl border border-white/[0.1] bg-surface/80 p-2 focus-within:border-brand-500/40 focus-within:ring-2 focus-within:ring-brand-500/15">
          <button
            className="grid size-9 shrink-0 place-items-center rounded-xl text-faint hover:bg-white/[0.06] hover:text-foreground"
            aria-label="Attach"
          >
            <Paperclip className="size-4.5" />
          </button>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={1}
            placeholder={`Reply to ${thread.contactName.split(" ")[0]}…`}
            className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm text-foreground placeholder:text-faint focus:outline-none"
          />
          <button
            disabled={!reply.trim()}
            onClick={() => setReply("")}
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 text-white transition-all hover:from-brand-300 hover:to-brand-500 disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </>
  );
}
