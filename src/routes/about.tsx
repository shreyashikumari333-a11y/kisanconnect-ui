import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Sprout, Store, Tractor, Users, Wifi } from "lucide-react";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the KisanSetu Project" },
      {
        name: "description",
        content:
          "KisanSetu is a college academic prototype that bridges the gap between farmers and essential agricultural services through one simple digital platform.",
      },
      { property: "og:title", content: "About the KisanSetu Project" },
      {
        property: "og:description",
        content: "Mission, scope and academic disclaimer for the KisanSetu mini-project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const goals = [
  { icon: Store, title: "Connect local vendors", text: "Bring nearby seed sellers onto one simple, searchable list." },
  { icon: Sprout, title: "Discover suitable seeds", text: "Suggest seed varieties that match soil, season and water supply." },
  { icon: Tractor, title: "Access equipment", text: "Show how tractors, tillers and pumps could be rented by the day." },
  { icon: Users, title: "Find farm workers", text: "Help farmers reach skilled workers for sowing and harvesting." },
  { icon: Wifi, title: "Show digital impact", text: "Demonstrate how digital systems improve agricultural accessibility." },
  { icon: GraduationCap, title: "Academic learning", text: "Practise modern web design, state management and data visualisation." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the project"
        title="Our mission"
        description="KisanSetu aims to bridge the gap between farmers and essential agricultural services through a simple digital platform."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          KisanSetu is a college academic prototype. It is not affiliated with the Indian Government,
          Aadhaar, any real subsidy scheme, any payment gateway or any delivery service.
        </DisclaimerBanner>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((g) => (
            <article
              key={g.title}
              className="card-hover rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                <g.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-card-foreground">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-border bg-gradient-soft p-8 text-center shadow-soft">
          <h2 className="font-display text-2xl font-extrabold text-foreground">
            Explore the prototype
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Every page uses fictional demo data so you can walk through the whole farmer journey
            safely.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/recommendations"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
            >
              Get seed recommendation
            </Link>
            <Link
              to="/admin"
              className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-foreground hover:bg-secondary"
            >
              View demo analytics
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
