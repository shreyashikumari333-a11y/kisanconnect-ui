import { Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoBadge({ label = "DEMO DATA", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-harvest-soft px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-harvest-foreground",
        className,
      )}
    >
      <Info className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  );
}

export function DisclaimerBanner({
  children,
  variant = "info",
  className,
}: {
  children: React.ReactNode;
  variant?: "info" | "warn";
  className?: string;
}) {
  const Icon = variant === "warn" ? TriangleAlert : Info;
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed",
        variant === "warn"
          ? "border-harvest bg-harvest-soft text-harvest-foreground"
          : "border-border bg-secondary text-secondary-foreground",
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="min-w-0">{children}</p>
    </div>
  );
}
