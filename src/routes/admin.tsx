import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sprout, Store, Tractor, Users } from "lucide-react";
import { StatCard } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { selectClass } from "@/components/FormField";
import { useApp } from "@/context/AppContext";
import {
  crops,
  districts,
  farmerActivityData,
  monthlyOrdersData,
  popularCropsData,
  seedCategories,
  seedCategoryData,
  demoOrders,
} from "@/data/demo";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "KisanSetu Admin Analytics – DEMO" },
      {
        name: "description",
        content:
          "Prototype analytics dashboard with demo charts for farmers, vendors, orders, popular crops and seed categories. Not a government dashboard.",
      },
      { property: "og:title", content: "KisanSetu Admin Analytics – DEMO" },
      {
        property: "og:description",
        content: "Prototype analytics built with demo data for a college mini-project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

const pieColors = ["#2f7d32", "#8a5a2b", "#d9a12a", "#3a86a8"];

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <h2 className="font-display text-base font-bold text-card-foreground">{title}</h2>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {subtitle}
      </p>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function AdminPage() {
  const { orders } = useApp();
  const totalDemoOrders = 635 + Math.max(0, orders.length - demoOrders.length);
  const [range, setRange] = useState("Last 6 months");
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("");
  const [category, setCategory] = useState("");

  const cropData = useMemo(
    () => (crop ? popularCropsData.filter((c) => c.crop === crop) : popularCropsData),
    [crop],
  );
  const categoryData = useMemo(
    () => (category ? seedCategoryData.filter((c) => c.name === category) : seedCategoryData),
    [category],
  );

  return (
    <>
      <PageHeader
        eyebrow="Prototype analytics"
        title="KisanSetu Admin Analytics – DEMO"
        description="A dashboard mock-up showing how platform-wide activity could be monitored."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          All analytics displayed are generated using prototype/demo data for this college project.
          This dashboard is not affiliated with the Indian Government.
        </DisclaimerBanner>

        <div className="mt-8 grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="block text-sm font-bold">Date range</span>
            <select
              className={`${selectClass} mt-1.5`}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>This month</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-bold">Location</span>
            <select
              className={`${selectClass} mt-1.5`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All demo districts</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-bold">Crop</span>
            <select
              className={`${selectClass} mt-1.5`}
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
            >
              <option value="">All crops</option>
              {crops.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-bold">Category</span>
            <select
              className={`${selectClass} mt-1.5`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {seedCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Total Demo Farmers" value="512" hint="Prototype count" />
          <StatCard icon={Store} label="Total Demo Vendors" value="54" hint="Prototype count" tone="earth" />
          <StatCard icon={Sprout} label="Total Demo Orders" value={String(totalDemoOrders)} hint="All demo channels" tone="harvest" />
          <StatCard icon={Tractor} label="Equipment Requests" value="187" hint="Demo rentals" tone="sky" />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Worker Requests" value="143" hint="Demo bookings" tone="sky" />
          <StatCard icon={Sprout} label="Seed Sales (Demo)" value="₹4.8L" hint="Prototype revenue" />
          <StatCard icon={Store} label="Active Demo Listings" value="102" hint="Seeds + equipment" tone="earth" />
          <StatCard icon={Sprout} label="Repeat Demo Farmers" value="38%" hint="Prototype metric" tone="harvest" />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <ChartCard title="Popular crops" subtitle="Demo orders per crop">
            <BarChart data={cropData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="crop" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#2f7d32" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Seed categories" subtitle="Share of demo sales">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
              >
                {categoryData.map((entry, i) => (
                  <Cell key={entry.name} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ChartCard>

          <ChartCard title="Demo orders & requests" subtitle={`Trend · ${range}`}>
            <LineChart data={monthlyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#2f7d32" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="requests" stroke="#8a5a2b" strokeWidth={3} dot={false} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Farmer activity" subtitle="Weekly active demo farmers">
            <AreaChart data={farmerActivityData}>
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2f7d32" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#2f7d32" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#2f7d32"
                strokeWidth={3}
                fill="url(#activityFill)"
              />
            </AreaChart>
          </ChartCard>
        </div>

        {location && (
          <p className="mt-6 text-sm font-semibold text-muted-foreground">
            Showing demo figures filtered for {location}. Prototype data is identical across
            districts.
          </p>
        )}
      </div>
    </>
  );
}
