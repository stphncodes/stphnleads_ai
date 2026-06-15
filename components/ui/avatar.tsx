import * as React from "react";
import { cn, initials } from "@/lib/utils";

const gradients = [
  "from-brand-400 to-accent-500",
  "from-accent-400 to-pink-500",
  "from-sky-400 to-brand-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-violet-400 to-fuchsia-500",
];

function gradientFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + hash * 31;
  return gradients[Math.abs(hash) % gradients.length];
}

const sizes = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

export function Avatar({
  name,
  src,
  size = "md",
  className,
  ring,
}: {
  name: string;
  src?: string;
  size?: keyof typeof sizes;
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        `bg-gradient-to-br ${gradientFor(name)}`,
        ring && "ring-2 ring-white/10 ring-offset-2 ring-offset-bg",
        sizes[size],
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="size-full rounded-full object-cover"
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}
