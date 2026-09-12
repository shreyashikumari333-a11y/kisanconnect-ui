import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sprout } from "lucide-react";
import { CardSkeleton, EmptyState, SeedCard } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { Field, selectClass } from "@/components/FormField";
import {
  crops,
  districts,
  recommendSeeds,
  seasons,
  soilTypes,
  waterLevels,
  type RecommendationInput,
  type Seed,
} from "@/data/demo";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "Personalized Seed Recommendations — KisanSetu Demo" },
      {
        name: "description",
        content:
          "Enter your crop, soil type, season, farm size and water availability to get prototype seed recommendations with a demo suitability score.",
      },
      { property: "og:title", content: "Personalized Seed Recommendations — KisanSetu Demo" },
      {
        property: "og:description",
        content:
          "Prototype seed recommendation tool from the KisanSetu college mini-project. Educational demo suggestions only.",
      },
    ],
  }),
  component: Recommendations,
});

const farmSizes = ["Under 1 acre", "1 – 2 acres", "2 – 5 acres", "Above 5 acres"];

function Recommendations() {
  const [form, setForm] = useState<RecommendationInput>({
    crop: "",
    soil: "",
    season: "",
    farmSize: "",
    water: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Seed[] | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof RecommendationInput) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e: Record<string, string> = {};
    (Object.keys(form) as (keyof RecommendationInput)[]).forEach((k) => {
      if (!form[k]) e[k] = "This field is required.";
    });
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(recommendSeeds(form));
      setLoading(false);
    }, 800);
  }

  return (
    <>
      <PageHeader
        eyebrow="Seed Recommendations"
        title="Find the right seed for your field"
        description="Tell us about your land and season. KisanSetu will suggest seed varieties with a demo suitability score."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          Recommendations shown are prototype/demo suggestions for educational purposes. Always
          consult your local agriculture officer before buying seed.
        </DisclaimerBanner>

        <form
          onSubmit={submit}
          noValidate
          className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
        >
          <h2 className="flex items-center gap-2 font-display text-xl font-extrabold">
            <Sprout className="h-5 w-5 text-primary" aria-hidden="true" /> Your farming details
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Select Crop" error={errors["crop"]}>
              <select className={selectClass} value={form.crop} onChange={set("crop")}>
                <option value="">Choose a crop</option>
                {crops.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Soil Type" error={errors["soil"]}>
              <select className={selectClass} value={form.soil} onChange={set("soil")}>
                <option value="">Choose soil type</option>
                {soilTypes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Season" error={errors["season"]}>
              <select className={selectClass} value={form.season} onChange={set("season")}>
                <option value="">Choose season</option>
                {seasons.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Farm Size" error={errors["farmSize"]}>
              <select className={selectClass} value={form.farmSize} onChange={set("farmSize")}>
                <option value="">Choose farm size</option>
                {farmSizes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Water Availability" error={errors["water"]}>
              <select className={selectClass} value={form.water} onChange={set("water")}>
                <option value="">Choose water availability</option>
                {waterLevels.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Location" error={errors["location"]}>
              <select className={selectClass} value={form.location} onChange={set("location")}>
                <option value="">Choose your district</option>
                {districts.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90 disabled:opacity-70 sm:w-auto"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            {loading ? "Finding seeds…" : "Get Recommendations"}
          </button>
        </form>

        <section className="mt-12">
          {loading && (
            <>
              <h2 className="font-display text-2xl font-extrabold">Matching seeds…</h2>
              <div className="mt-6">
                <CardSkeleton count={3} />
              </div>
            </>
          )}

          {!loading && results && results.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-extrabold">
                {results.length} recommended {results.length === 1 ? "seed" : "seeds"} for{" "}
                {form.crop}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ranked by demo recommendation score for {form.soil} soil in the {form.season} season.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((s) => (
                  <SeedCard key={s.id} seed={s} />
                ))}
              </div>
            </>
          )}

          {!loading && results && results.length === 0 && (
            <EmptyState
              icon={Sprout}
              title="No demo match found"
              description="Try a different soil type or season — the prototype catalogue only covers six crops."
            />
          )}

          {!loading && !results && (
            <EmptyState
              icon={Sprout}
              title="Your recommendations will appear here"
              description="Fill in the six fields above and press Get Recommendations to see suggested seed varieties."
            />
          )}
        </section>
      </div>
    </>
  );
}
