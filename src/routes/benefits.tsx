import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgePercent, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/SiteLayout";
import { DemoBadge, DisclaimerBanner } from "@/components/DemoBadge";
import { benefits } from "@/data/demo";

export const Route = createFileRoute("/benefits")({
  head: () => ({
    meta: [
      { title: "Demo Farmer Benefits & Discounts — KisanSetu" },
      {
        name: "description",
        content:
          "Prototype farmer benefit and discount cards with demo eligibility rules, created for a college mini-project. Not a government scheme.",
      },
      { property: "og:title", content: "Demo Farmer Benefits & Discounts — KisanSetu" },
      {
        property: "og:description",
        content: "Educational prototype discount cards — not connected to any real subsidy scheme.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BenefitsPage,
});

const statusTone: Record<string, string> = {
  "Active – Demo": "bg-primary-soft text-primary",
  Prototype: "bg-sky-soft text-sky",
  "Expiring – Demo": "bg-harvest-soft text-harvest-foreground",
};

function BenefitsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prototype benefits"
        title="Demo Farmer Benefits & Discounts"
        description="Sample discount cards that show how a benefit system could work inside KisanSetu."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          This section is a prototype created for educational purposes. It is not connected to any
          Indian Government subsidy scheme or official benefit program.
        </DisclaimerBanner>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {benefits.map((b) => (
            <article
              key={b.id}
              className="card-hover flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <BadgePercent className="h-6 w-6" aria-hidden="true" />
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${statusTone[b.status] ?? "bg-muted text-muted-foreground"}`}
                >
                  {b.status}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-card-foreground">{b.name}</h2>
              <p className="mt-1 font-display text-3xl font-extrabold text-primary">{b.discount}</p>
              <p className="mt-2 text-sm text-muted-foreground">Applies to: {b.appliesTo}</p>

              <h3 className="mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Demo eligibility
              </h3>
              <ul className="mt-2 space-y-2">
                {b.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-card-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {e}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <DemoBadge label="Demo benefit" />
                <Link
                  to="/marketplace"
                  className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
                >
                  Use in demo cart
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
