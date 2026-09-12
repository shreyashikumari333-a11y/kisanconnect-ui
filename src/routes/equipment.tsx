import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Droplets, SprayCan, Tractor, Wheat, Wrench } from "lucide-react";
import { toast } from "sonner";
import { CardSkeleton, EmptyState, EquipmentCard } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { selectClass } from "@/components/FormField";
import { useApp } from "@/context/AppContext";
import { districts, equipmentList, equipmentTypes } from "@/data/demo";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment Rental — KisanSetu Demo" },
      {
        name: "description",
        content:
          "Browse demo tractors, power tillers, water pumps, sprayers and harvesters with prototype daily rental rates and provider details.",
      },
      { property: "og:title", content: "Equipment Rental — KisanSetu Demo" },
      {
        property: "og:description",
        content: "Prototype agricultural equipment rental listings with demo rates and providers.",
      },
    ],
  }),
  component: EquipmentPage,
});

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  Tractor: Tractor,
  "Power Tiller": Wrench,
  "Water Pump": Droplets,
  Sprayer: SprayCan,
  Harvester: Wheat,
};

function EquipmentPage() {
  const { addToCart } = useApp();
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState(4500);
  const [loading] = useState(false);

  const results = useMemo(
    () =>
      equipmentList.filter(
        (e) =>
          (!type || e.type === type) &&
          (!location || e.location === location) &&
          e.pricePerDay <= maxPrice,
      ),
    [type, location, maxPrice],
  );

  return (
    <>
      <PageHeader
        eyebrow="Equipment Rental"
        title="Rent farm equipment near you"
        description="Tractors, tillers, pumps, sprayers and harvesters offered by prototype providers with demo daily rates."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          All rental prices, providers, availability and ratings are prototype/demo data. No real
          booking, payment or machinery is involved.
        </DisclaimerBanner>

        <div className="mt-8 grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <label className="block">
            <span className="block text-sm font-bold">Equipment Type</span>
            <select
              className={`${selectClass} mt-1.5`}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All types</option>
              {equipmentTypes.map((t) => (
                <option key={t}>{t}</option>
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
          <label className="block sm:col-span-2">
            <span className="flex items-center justify-between text-sm font-bold">
              Max price per day <span className="text-primary">₹{maxPrice}</span>
            </span>
            <input
              type="range"
              min={150}
              max={4500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-4 w-full accent-primary"
            />
          </label>
        </div>

        <p className="mt-6 text-sm font-semibold text-muted-foreground">
          {results.length} demo equipment listings
        </p>

        <div className="mt-5">
          {loading ? (
            <CardSkeleton count={6} />
          ) : results.length === 0 ? (
            <EmptyState
              icon={Tractor}
              title="No demo equipment matches"
              description="Try another equipment type, location, or raise the maximum daily price."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((e) => (
                <EquipmentCard
                  key={e.id}
                  item={e}
                  icon={iconFor[e.type] ?? Tractor}
                  onRequest={() => {
                    addToCart({
                      id: e.id,
                      name: `${e.name} (1 day rental)`,
                      vendor: e.provider,
                      price: e.pricePerDay,
                      unit: "day",
                      kind: "equipment",
                    });
                    toast.success(`Demo rental request added for ${e.name}`);
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
