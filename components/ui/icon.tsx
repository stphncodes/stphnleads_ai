import { icons, type LucideProps } from "lucide-react";

export type IconName = keyof typeof icons;

/** Render a lucide icon by name. Falls back to Circle if not found. */
export function Icon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const LucideIcon = icons[name as IconName] ?? icons.Circle;
  return <LucideIcon {...props} />;
}
