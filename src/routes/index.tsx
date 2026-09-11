import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgePercent,
  Bot,
  ClipboardList,
  Handshake,
  Leaf,
  Sprout,
  Store,
  Tractor,
  Users,
  Wheat,
} from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import { FeatureCard } from "@/components/cards";
import { DemoBadge, DisclaimerBanner } from "@/components/DemoBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KisanSetu — Connecting Farmers to Everything They Need" },
      {
        name: "description",
        content:
          "A student prototype platform where farmers find seed recommendations, demo vendors, equipment rentals, farm workers and an AI farming assistant.",
      },
      { property: "og:title", content: "KisanSetu — Connecting Farmers to Everything They Need" },
      {
        property: "og:description",
        content:
          "College mini-project prototype for digital agricultural support: seeds, equipment, workers and an AI assistant, using demo data.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: Sprout,
    title: "Personalized Seed Recommendations",
    description:
      "Answer six simple questions about your soil, season and water, and get seed suggestions ranked by a demo score.",
    to: "/recommendations" as const,
    tone: "primary" as const,
  },
  {
    icon: Store,
    title: "Local Seed Vendors",
    description:
      "Browse a demo marketplace of nearby seed shops with prices, ratings and stock availability.",
    to: "/marketplace" as const,
    tone: "earth" as const,
  },
  {
    icon: Tractor,
    title: "Agricultural Equipment",
    description:
      "Find tractors, tillers, pumps, sprayers and harvesters listed with demo daily rental rates.",
    to: "/equipment" as const,
    tone: "harvest" as const,
  },
  {
    icon: Users,
    title: "Farm Workers",
    description:
      "Connect with demo worker profiles by skill, experience, location and daily wage.",
    to: "/workers" as const,
    tone: "sky" as const,
  },
  {
    icon: BadgePercent,
    title: "Demo Subsidy & Discounts",
    description:
      "See how a benefit system could work. These are prototype discounts, not government schemes.",
    to: "/benefits" as const,
    tone: "harvest" as const,
  },
  {
    icon: Bot,
    title: "AI Farmer Assistant",
    description:
      "Ask simple farming questions and get friendly, educational sample answers in a chat window.",
    to: "/assistant" as const,
    tone: "primary" as const,
  },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Select your farming needs",
    text: "Tell KisanSetu your crop, soil type, season and farm size.",
  },
  {
    icon: Leaf,
    title: "Get recommendations",
    text: "See seeds matched to your conditions with a demo suitability score.",
  },
  {
    icon: Handshake,
    title: "Connect with vendors or workers",
    text: "Reach demo seed shops, equipment providers and skilled farm workers.",
  },
  {
    icon: ClipboardList,
    title: "Manage your demo orders",
    text: "Track every prototype order from placed to delivered in one place.",
  },
];

const stats = [
  { value: "500+", label: "Demo Farmers", icon: Users },
  { value: "50+", label: "Demo Vendors", icon: Store },
  { value: "100+", label: "Demo Products", icon: Wheat },
  { value: "25+", label: "Demo Workers", icon: Handshake },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Illustration of an Indian farmer using a tablet beside green fields and a tractor"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-[0.82]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:py-32">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground ring-1 ring-primary-foreground/30">
            <Sprout className="h-4 w-4" aria-hidden="true" />
            College Mini-Project Prototype
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
            Empowering Farmers Through Digital Connectivity
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            KisanSetu is a digital agricultural support platform for small and marginal farmers. It
            brings seed recommendations, local vendors, equipment rentals, skilled workers, demo
            benefits and an AI assistant into one friendly place — all using prototype data.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-2xl bg-background px-7 py-4 text-base font-bold text-primary shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Explore Services
            </Link>
            <Link
              to="/recommendations"
              className="inline-flex items-center gap-2 rounded-2xl bg-harvest px-7 py-4 text-base font-bold text-harvest-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <Sprout className="h-5 w-5" aria-hidden="true" />
              Get Seed Recommendation
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-10 max-w-7xl px-4">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-2xl font-extrabold text-card-foreground md:text-3xl">
                    {s.value}
                  </p>
                  <p className="truncate text-sm font-semibold text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            All figures above are prototype data created for this academic project.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            What KisanSetu offers
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
            Everything a farmer needs, in one simple app
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Six services designed to be easy to use, even for someone opening a smartphone app for
            the first time.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              How KisanSetu Works
            </h2>
            <DemoBadge label="Prototype flow" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="card-hover relative rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="absolute -top-4 left-6 grid h-9 w-9 place-items-center rounded-xl bg-gradient-leaf font-display text-sm font-extrabold text-primary-foreground">
                  {i + 1}
                </span>
                <s.icon className="mt-3 h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + disclaimer */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div className="rounded-3xl bg-gradient-hero p-8 shadow-card md:p-12">
            <h2 className="font-display text-3xl font-extrabold text-primary-foreground">
              Ready to try the prototype?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-foreground/90">
              Continue as a demo farmer — no real details needed — and explore the full experience
              from seed recommendation to demo order tracking.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="rounded-2xl bg-background px-6 py-3.5 text-base font-bold text-primary shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Continue as Demo Farmer
              </Link>
              <Link
                to="/assistant"
                className="rounded-2xl border border-primary-foreground/40 px-6 py-3.5 text-base font-bold text-primary-foreground transition-colors hover:bg-background/15"
              >
                Ask the AI Assistant
              </Link>
            </div>
          </div>
          <DisclaimerBanner variant="warn">
            <strong className="font-bold">Important:</strong> KisanSetu is an academic mini-project.
            It is not connected to the Indian Government, Aadhaar, real subsidy schemes, real payment
            gateways or any delivery service. Every vendor, price, benefit and delivery update you
            see is demo data.
          </DisclaimerBanner>
        </div>
      </section>
    </>
  );
}
