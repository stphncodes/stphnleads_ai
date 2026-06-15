"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Sparkles, Plus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import {
  promptSuggestions,
  capabilities,
  generateAgentReply,
} from "@/data/agent";
import { currentUser } from "@/lib/nav";
import { cn } from "@/lib/utils";
import type { AgentMessage } from "@/types";

let idCounter = 0;
const nextId = () => `m-${++idCounter}`;

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

function AgentBubble({ message }: { message: AgentMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      {isUser ? (
        <Avatar name={currentUser.name} size="sm" />
      ) : (
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-500">
          <Sparkles className="size-4 text-white" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]",
          isUser
            ? "bg-brand-500/15 text-foreground"
            : "border border-white/[0.07] bg-surface/70 text-muted",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

export function AgentChat() {
  const [messages, setMessages] = React.useState<AgentMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [streaming, setStreaming] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  React.useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, typing]);

  React.useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const busy = typing || streaming;

  function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;

    const userMsg: AgentMessage = {
      id: nextId(),
      role: "user",
      content,
      at: "now",
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    const reply = generateAgentReply(content);

    // simulate "thinking", then stream word by word
    const t1 = setTimeout(() => {
      setTyping(false);
      setStreaming(true);
      const assistantId = nextId();
      setMessages((m) => [
        ...m,
        { id: assistantId, role: "assistant", content: "", at: "now" },
      ]);

      const words = reply.split(" ");
      let i = 0;
      const step = () => {
        i++;
        setMessages((m) =>
          m.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: words.slice(0, i).join(" ") }
              : msg,
          ),
        );
        if (i < words.length) {
          const t = setTimeout(step, 22);
          timers.current.push(t);
        } else {
          setStreaming(false);
        }
      };
      step();
    }, 650);
    timers.current.push(t1);
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* messages / empty state */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      >
        <div className="mx-auto max-w-3xl">
          {empty ? (
            <div className="flex flex-col items-center pt-10 text-center sm:pt-16">
              <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-500 shadow-[0_12px_40px_-10px_rgba(99,133,255,0.8)]">
                <Sparkles className="size-8 text-white" />
              </span>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                Hi, I'm stphnAgent
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted">
                Your autonomous sales co-pilot. I can find leads, analyze your
                CRM, suggest outreach, and summarize your pipeline.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {capabilities.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-muted"
                  >
                    <Icon name={c.icon} className="size-3.5 text-brand-300" />
                    {c.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid w-full gap-2.5 sm:grid-cols-2">
                {promptSuggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => send(s.prompt)}
                    className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-surface/50 p-3.5 text-left transition-colors hover:border-white/15 hover:bg-surface/80"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-brand-300 ring-1 ring-white/[0.06]">
                      <Icon name={s.icon} className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {s.label}
                      </p>
                      <p className="truncate text-xs text-faint">{s.prompt}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AgentBubble message={m} />
                  </motion.div>
                ))}
              </AnimatePresence>
              {typing && (
                <div className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-accent-500">
                    <Sparkles className="size-4 text-white" />
                  </span>
                  <div className="rounded-2xl border border-white/[0.07] bg-surface/70">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* composer */}
      <div className="border-t border-white/[0.06] bg-bg/60 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto max-w-3xl">
          {!empty && (
            <div className="mb-2.5 flex flex-wrap gap-2">
              {promptSuggestions.slice(0, 3).map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.prompt)}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-muted transition-colors hover:border-white/15 hover:text-foreground disabled:opacity-40"
                >
                  <Icon name={s.icon} className="size-3 text-brand-300" />
                  {s.label}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 rounded-2xl border border-white/[0.1] bg-surface/80 p-2 focus-within:border-brand-500/40 focus-within:ring-2 focus-within:ring-brand-500/15"
          >
            <button
              type="button"
              className="grid size-9 shrink-0 place-items-center rounded-xl text-faint hover:bg-white/[0.06] hover:text-foreground"
              aria-label="Attach"
            >
              <Plus className="size-4.5" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder="Ask stphnAgent anything…"
              className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm text-foreground placeholder:text-faint focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 text-white transition-all hover:from-brand-300 hover:to-brand-500 disabled:opacity-40"
              aria-label="Send"
            >
              <ArrowUp className="size-4.5" />
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] text-faint">
            stphnAgent can make mistakes. Verify important details.
          </p>
        </div>
      </div>
    </div>
  );
}
