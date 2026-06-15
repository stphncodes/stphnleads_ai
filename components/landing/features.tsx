"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "./section-heading";
import { features } from "@/data/landing";
import { cn } from "@/lib/utils";

const accentRing: Record<string, string> = {
  brand: "from-brand-400/30 to-brand-600/10 text-brand-300",
  accent: "from-accent-400/30 to-accent-600/10 text-accent-300",
  info: "from-sky-400/30 to-sky-600/10 text-sky-300",
};

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform"
          title={
            <>
              Everything you need to{" "}
              <span className="text-gradient-brand">turn leads into revenue</span>
            </>
          }
          description="One AI-native workspace that replaces your prospecting tools, your CRM, and your SDR busywork."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 p-6 ring-glow transition-colors hover:border-white/15"
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                  accentRing[feature.accent],
                )}
              />
              <div
                className={cn(
                  "grid size-12 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-white/10",
                  accentRing[feature.accent],
                )}
              >
                <Icon name={feature.icon} className="size-5.5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
