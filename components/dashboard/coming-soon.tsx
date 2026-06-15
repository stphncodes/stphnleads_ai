import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

export function ComingSoon({
  icon,
  title,
  description,
  phase,
}: {
  icon: string;
  title: string;
  description: string;
  phase: string;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid flex-1 place-items-center py-20">
        <div className="max-w-md text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl border border-white/[0.08] bg-surface/60 text-brand-300 ring-glow">
            <Icon name={icon} className="size-7" />
          </span>
          <div className="mt-6 flex justify-center">
            <Badge tone="brand" dot>
              {phase}
            </Badge>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
