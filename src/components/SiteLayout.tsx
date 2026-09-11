import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DemoBadge } from "@/components/DemoBadge";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-gradient-leaf px-4 py-2 text-center text-xs font-semibold text-primary-foreground">
        College mini-project prototype — all vendors, prices, payments and analytics use demo data.
      </div>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  badge = true,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
                {title}
              </h1>
              {badge && <DemoBadge />}
            </div>
            {description && (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </div>
    </section>
  );
}
