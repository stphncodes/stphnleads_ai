"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaFooter() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center sm:px-12 sm:py-20"
      >
        {/* aurora backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-600/25 via-accent-600/15 to-transparent" />
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[120px]" />

        <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Start closing more deals with{" "}
          <span className="text-gradient">AI today</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted sm:text-lg">
          Join thousands of teams using stphnLead AI to fill their pipeline,
          automate outreach, and book more meetings — on autopilot.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/sign-up" className="w-full sm:w-auto">
            <Button size="lg" className="group w-full sm:w-auto">
              Get Started Free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/sign-in" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Talk to sales
            </Button>
          </Link>
        </div>
        <p className="mt-5 text-xs text-faint">
          14-day free trial · No credit card required
        </p>
      </motion.div>
    </section>
  );
}
