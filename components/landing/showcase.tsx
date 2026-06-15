"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardPreview } from "./dashboard-preview";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const productPoints = [
  "Source net-new leads from a natural-language ICP description",
  "Auto-enrich emails, titles, and firmographics on every record",
  "Real-time intent scoring so reps always work the hottest accounts",
  "Native email + LinkedIn sequencing in your own voice",
];

const kanbanColumns = [
  {
    title: "Qualified",
    tone: "text-brand-300",
    cards: [
      { name: "Acme Inc.", value: "$48k", p: "high" as const },
      { name: "Lumen", value: "$22k", p: "medium" as const },
    ],
  },
  {
    title: "Proposal",
    tone: "text-accent-300",
    cards: [{ name: "Quanta", value: "$32k", p: "high" as const }],
  },
  {
    title: "Won",
    tone: "text-emerald-300",
    cards: [{ name: "Helio Co.", value: "$26k", p: "medium" as const }],
  },
];

const priorityTone = {
  high: "danger" as const,
  medium: "warning" as const,
  low: "neutral" as const,
};

export function Showcase() {
  return (
    <>
      {/* Product */}
      <section id="product" className="scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The product"
              title={
                <>
                  Your entire pipeline,{" "}
                  <span className="text-gradient-brand">on autopilot</span>
                </>
              }
              description="From first touch to closed-won, stphnLead AI keeps your funnel full and your reps focused on conversations that close."
            />
            <ul className="mt-8 space-y-3">
              {productPoints.map((point, i) => (
                <Reveal key={point} delay={i * 0.06}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-muted">{point}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-8">
              <Link href="/sign-up">
                <Button className="group">
                  Start free
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </Reveal>
          </div>

          <Reveal y={36}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/15 to-accent-500/10 blur-2xl" />
              <DashboardPreview />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CRM */}
      <section id="crm" className="scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal y={36} className="order-2 lg:order-1">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-500/15 to-brand-500/10 blur-2xl" />
              <div className="glass-strong rounded-2xl p-4 ring-glow">
                <div className="mb-3 flex items-center justify-between px-1">
                  <p className="text-sm font-semibold">Sales pipeline</p>
                  <Badge tone="brand" dot>
                    $128k forecast
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {kanbanColumns.map((col) => (
                    <div key={col.title} className="space-y-2">
                      <p
                        className={cn(
                          "px-1 text-[11px] font-medium",
                          col.tone,
                        )}
                      >
                        {col.title}
                      </p>
                      {col.cards.map((card) => (
                        <motion.div
                          key={card.name}
                          whileHover={{ y: -2 }}
                          className="cursor-grab rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate text-[11px] font-medium">
                              {card.name}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-brand-300">
                              {card.value}
                            </span>
                            <Badge
                              tone={priorityTone[card.p]}
                              className="px-1.5 py-0 text-[9px]"
                            >
                              {card.p}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="CRM pipeline"
              title={
                <>
                  A CRM that{" "}
                  <span className="text-gradient-brand">manages itself</span>
                </>
              }
              description="Drag deals across stages and watch forecasts, win rates, and next-best-actions update instantly. The AI flags at-risk deals before they slip."
            />
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { k: "Win rate", v: "32%" },
                { k: "Avg. deal", v: "$28k" },
                { k: "Cycle", v: "21 days" },
              ].map((s) => (
                <Reveal key={s.k}>
                  <div className="rounded-xl border border-white/[0.07] bg-surface/60 p-4">
                    <p className="text-xl font-semibold tracking-tight">
                      {s.v}
                    </p>
                    <p className="mt-1 text-xs text-muted">{s.k}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="border-gradient relative overflow-hidden rounded-3xl bg-surface/70 p-8 ring-glow sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand-500/20 blur-[100px]" />
              <div className="relative grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <Badge tone="accent" dot>
                    Live product demo
                  </Badge>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    See stphnLead AI book a meeting in real time
                  </h2>
                  <p className="mt-4 text-muted">
                    Watch the agent source leads, score intent, write the
                    outreach, and schedule the call — end to end, in under three
                    minutes.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link href="/sign-up">
                      <Button size="lg" className="group w-full sm:w-auto">
                        Book a demo
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        Explore the dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-bg/50 p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-accent-500">
                      <Sparkles className="size-4.5 text-white" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">stphnAgent</p>
                      <p className="text-[11px] text-faint">
                        Autonomous sales agent
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2.5 text-sm">
                    {[
                      "Sourced 34 high-intent SaaS leads",
                      "Drafted 34 personalized sequences",
                      "Booked 5 meetings this week",
                    ].map((line) => (
                      <div
                        key={line}
                        className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] px-3 py-2.5"
                      >
                        <span className="grid size-4 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                        <span className="text-muted">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
