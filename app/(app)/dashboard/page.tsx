import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

/**
 * Temporary placeholder — the full dashboard app (sidebar, widgets, charts,
 * leads, CRM, etc.) is built in Phase 2. This keeps the auth flow clickable.
 */
export default function DashboardPlaceholder() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-accent-500 shadow-[0_10px_40px_-10px_rgba(99,133,255,0.8)]">
          <Sparkles className="size-7 text-white" />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          You&apos;re in. Welcome to stphnLead AI.
        </h1>
        <p className="mt-3 text-sm text-muted">
          The full dashboard — overview widgets, leads, CRM pipeline, campaigns,
          the AI agent, analytics, inbox, and meetings — is being built in the
          next phase.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/">
            <Button variant="outline">Back to home</Button>
          </Link>
          <LogoMark />
        </div>
      </div>
    </div>
  );
}
