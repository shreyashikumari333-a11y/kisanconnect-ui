import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgePercent,
  Bell,
  Bot,
  Package,
  Sprout,
  Store,
  Tractor,
  Users,
} from "lucide-react";
import { OrderCard, StatCard, EmptyState } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { useApp } from "@/context/AppContext";
import { benefits, notifications, seedCatalog } from "@/data/demo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — KisanSetu Demo" },
      {
        name: "description",
        content:
          "Demo farmer dashboard with order totals, prototype discounts, nearby demo vendors and seed recommendations.",
      },
      {
        property: "og:title",
        content: "Farmer Dashboard — KisanSetu Demo",
      },
      {
        property: "og:description",
        content:
          "Prototype farmer dashboard from the KisanSetu college mini-project.",
      },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  {
    to: "/recommendations" as const,
    label: "Find Seeds",
    icon: Sprout,
  },
  {
    to: "/equipment" as const,
    label: "Rent Equipment",
    icon: Tractor,
  },
  {
    to: "/workers" as const,
    label: "Find Workers",
    icon: Users,
  },
  {
    to: "/assistant" as const,
    label: "Ask AI Assistant",
    icon: Bot,
  },
];

const toneMap = {
  primary: "bg-primary-soft text-primary",
  earth: "bg-earth-soft text-earth",
  harvest: "bg-harvest-soft text-harvest-foreground",
} as const;

function Dashboard() {
  const { user, orders } = useApp();
  const recent = orders.slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Farmer Dashboard"
        title="Namaste, Farmer!"
        description={
          user
            ? `Signed in as ${user.name} · ${user.village}. Everything below is prototype data.`
            : "You are browsing as a guest. Sign in as a demo farmer to personalise this view."
        }
      >
        {!user && (
          <Link
            to="/login"
            className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
          >
            Continue as Demo Farmer
          </Link>
        )}
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Package}
            label="Total Orders"
            value={orders.length}
            hint="Demo orders"
          />

          <StatCard
            icon={BadgePercent}
            label="Available Discounts"
            value={benefits.length}
            hint="DEMO benefits only"
            tone="harvest"
          />

          <StatCard
            icon={Store}
            label="Nearby Vendors"
            value={12}
            hint="DEMO vendor listings"
            tone="earth"
          />

          <StatCard
            icon={Sprout}
            label="Recommended Seeds"
            value={seedCatalog.length}
            hint="Prototype suggestions"
            tone="sky"
          />
        </div>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-extrabold">
            Quick actions
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="card-hover flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-leaf text-primary-foreground">
                  <a.icon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>

                <span className="min-w-0 truncate text-base font-bold">
                  {a.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-extrabold">
                Recent orders
              </h2>

              <Link
                to="/orders"
                className="text-sm font-bold text-primary hover:underline"
              >
                View all orders →
              </Link>
            </div>

            <div className="mt-4 grid gap-4">
              {recent.length === 0 ? (
                <EmptyState
                  title="No demo orders yet"
                  description="Add a seed from the marketplace to see a prototype order appear here."
                  action={
                    <Link
                      to="/marketplace"
                      className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                    >
                      Browse marketplace
                    </Link>
                  }
                />
              ) : (
                recent.map((o) => (
                  <OrderCard key={o.id} order={o} />
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold">
              <Bell
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
              Notifications
            </h2>

            <div className="mt-4 grid gap-3">
              {notifications.map((n) => (
                <article
                  key={n.id}
                  className="rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${toneMap[n.tone]}`}
                    >
                      <Bell
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-card-foreground">
                        {n.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {n.detail}
                      </p>

                      <p className="mt-1.5 text-xs font-semibold uppercase text-muted-foreground">
                        {n.time}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <DisclaimerBanner className="mt-5">
              Orders, vendors and notifications on this dashboard are demo
              records created for a college project.
            </DisclaimerBanner>
          </section>
        </div>
      </div>
    </>
  );
}