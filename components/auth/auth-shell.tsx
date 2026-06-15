import Link from "next/link";
import { Star, Check } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";

const perks = [
  "AI-sourced leads in seconds",
  "Auto-personalized outreach",
  "Self-updating CRM pipeline",
];

/** Split-screen auth frame: brand showcase (left) + form slot (right). */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden border-r border-white/[0.06] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />
        <div className="pointer-events-none absolute -left-20 top-10 -z-10 size-96 rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 -z-10 size-96 rounded-full bg-accent-500/15 blur-[120px]" />

        <Logo />

        <div className="max-w-md">
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight">
            Turn prospects into clients{" "}
            <span className="text-gradient">with AI</span>
          </h2>
          <ul className="mt-8 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <span className="grid size-5 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-sm text-muted">{perk}</span>
              </li>
            ))}
          </ul>

          <figure className="glass-strong mt-10 rounded-2xl p-5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">
              “We replaced three tools and a part-time SDR. Booked meetings are
              up 3.2x.”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5">
              <Avatar name="Marcus Bennett" size="sm" ring />
              <div>
                <p className="text-xs font-semibold">Marcus Bennett</p>
                <p className="text-[11px] text-faint">VP of Sales, Northwind</p>
              </div>
            </figcaption>
          </figure>
        </div>

        <p className="text-xs text-faint">
          © {new Date().getFullYear()} stphnLead AI
        </p>
      </aside>

      {/* Form panel */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-500/[0.06] to-transparent lg:hidden" />
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <div className="w-full max-w-sm">{children}</div>
        <Link
          href="/"
          className="mt-8 text-xs text-faint transition-colors hover:text-foreground"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
