import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-brand-400 to-accent-500 shadow-[0_6px_20px_-6px_rgba(99,133,255,0.8)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5 text-white"
        aria-hidden
      >
        <path
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  href = "/",
  showWord = true,
}: {
  className?: string;
  href?: string;
  showWord?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      {showWord && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          stphn<span className="text-gradient-brand">Lead</span>
          <span className="ml-1 text-muted">AI</span>
        </span>
      )}
    </Link>
  );
}
