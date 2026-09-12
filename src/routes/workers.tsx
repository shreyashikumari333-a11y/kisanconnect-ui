import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { toast } from "sonner";
import { EmptyState, WorkerCard } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { inputClass, selectClass } from "@/components/FormField";
import { useApp } from "@/context/AppContext";
import { districts, workerSkills, workers } from "@/data/demo";

export const Route = createFileRoute("/workers")({
  head: () => ({
    meta: [
      { title: "Farm Worker Connect — KisanSetu Demo" },
      {
        name: "description",
        content:
          "Search demo farm worker profiles by skill, location, experience and daily wage for harvesting, sowing, irrigation and equipment handling.",
      },
      { property: "og:title", content: "Farm Worker Connect — KisanSetu Demo" },
      {
        property: "og:description",
        content: "Prototype farm worker directory with demo profiles and wages.",
      },
    ],
  }),
  component: WorkersPage,
});

function WorkersPage() {
  const { addToCart } = useApp();
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const results = useMemo(
    () =>
      workers.filter(
        (w) =>
          (!query || w.name.toLowerCase().includes(query.toLowerCase())) &&
          (!skill || w.skills.includes(skill)) &&
          (!location || w.location === location) &&
          (!onlyAvailable || w.available),
      ),
    [query, skill, location, onlyAvailable],
  );

  return (
    <>
      <PageHeader
        eyebrow="Worker Connect"
        title="Find skilled farm workers"
        description="Demo profiles of agricultural workers with their skills, experience, location and daily wage."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          Every worker profile shown here is a demo profile created for this college project. Names,
          wages and availability are fictional and no real person can be contacted.
        </DisclaimerBanner>

        <div className="mt-8 grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <label className="block">
            <span className="block text-sm font-bold">Search by name</span>
            <div className="relative mt-1.5">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                className={`${inputClass} pl-10`}
                placeholder="e.g. Ramesh"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </label>
          <label className="block">
            <span className="block text-sm font-bold">Skill</span>
            <select
              className={`${selectClass} mt-1.5`}
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            >
              <option value="">All skills</option>
              {workerSkills.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-bold">Location</span>
            <select
              className={`${selectClass} mt-1.5`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All demo locations</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3.5">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="h-5 w-5 accent-primary"
            />
            <span className="text-sm font-bold text-secondary-foreground">Available only</span>
          </label>
        </div>

        <p className="mt-6 text-sm font-semibold text-muted-foreground">
          {results.length} demo worker {results.length === 1 ? "profile" : "profiles"}
        </p>

        <div className="mt-5">
          {results.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No demo workers match"
              description="Try a different skill or location, or turn off the availability filter."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((w) => (
                <WorkerCard
                  key={w.id}
                  worker={w}
                  onRequest={() => {
                    addToCart({
                      id: w.id,
                      name: `Worker request – ${w.name} (1 day)`,
                      vendor: "KisanSetu Worker Connect",
                      price: w.wage,
                      unit: "day",
                      kind: "worker",
                    });
                    toast.success(`Demo request added for ${w.name}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
