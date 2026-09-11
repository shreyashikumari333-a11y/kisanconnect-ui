import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="block text-sm font-bold text-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      {error && (
        <span role="alert" className="mt-1 block text-xs font-semibold text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30";

export const selectClass = inputClass;
