"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { SectionHeading } from "./section-heading";
import { testimonials } from "@/data/landing";

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customers"
          title={
            <>
              Loved by teams that{" "}
              <span className="text-gradient-brand">live in their pipeline</span>
            </>
          }
          description="From solo founders to 200-person sales orgs, stphnLead AI is how modern teams hit quota."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: (i % 2) * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 p-6 ring-glow sm:p-8"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="size-4 fill-amber-300 text-amber-300"
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-pretty text-base leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar name={t.name} size="md" ring />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
