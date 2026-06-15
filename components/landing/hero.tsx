"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./dashboard-preview";
import { heroStats } from "@/data/landing";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* grid + glow backdrop */}
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent-500/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <Sparkles className="size-3.5 text-brand-300" />
              AI lead generation, qualification & outreach
              <span className="text-faint">·</span>
              <span className="text-brand-300">New</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Turn Prospects Into{" "}
            <span className="text-gradient">Clients With AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted"
          >
            stphnLead AI finds leads, qualifies prospects, automates outreach,
            and helps you close more deals — all from one intelligent workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto">
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="#demo" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto"
              >
                <PlayCircle className="size-4 text-brand-300" />
                Book Demo
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 text-xs text-faint"
          >
            No credit card required · 14-day free trial · Cancel anytime
          </motion.p>
        </div>

        {/* dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          style={{ perspective: 1200 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[2rem] bg-gradient-to-b from-brand-500/15 to-transparent blur-2xl" />
          <DashboardPreview />
          {/* fade base */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-2 h-24 bg-gradient-to-t from-bg to-transparent" />
        </motion.div>

        {/* stats */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-bg/40 px-6 py-6 text-center">
              <dd className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
