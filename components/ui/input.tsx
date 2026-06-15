import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-foreground",
        "placeholder:text-faint transition-colors",
        "focus:border-brand-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-brand-500/20 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-24 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-foreground",
        "placeholder:text-faint transition-colors resize-none",
        "focus:border-brand-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-brand-500/20 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-[13px] font-medium text-muted select-none",
        className,
      )}
      {...props}
    />
  );
}
