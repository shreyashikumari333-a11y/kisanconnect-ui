import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";
import seedImage from "@/assets/seeds.jpg";
import { CardSkeleton, EmptyState, ProductCard } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { inputClass, selectClass } from "@/components/FormField";
import { useApp } from "@/context/AppContext";
import { crops, seedCategories, vendors } from "@/data/demo";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Seed Marketplace — KisanSetu Demo" },
      {
        name: "description",
        content:
          "Browse demo seed products from prototype local vendors: filter by crop, category, vendor and price, then add to your demo cart.",
      },
      { property: "og:title", content: "Seed Marketplace — KisanSetu Demo" },
      {
        property: "og:description",
        content: "Prototype seed marketplace with demo vendors, prices and stock availability.",
      },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const { addToCart } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [crop, setCrop] = useState("");
  const [vendor, setVendor] = useState("");
  const [maxPrice, setMaxPrice] = useState(800);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/marketplace/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      const formattedProducts = data.map((product: any) => ({
        id: product.id,
        name: product.name,
        crop: product.name,
        category: product.category,
        vendor: product.vendor,
        price: product.price,
        unit: product.unit,
        rating: 4.5,
        availability:
          product.stock > 0
            ? product.stock < 10
              ? "Low Stock"
              : "In Stock"
            : "Out of Stock",
      }));

      setProducts(formattedProducts);
      console.log("Firestore products:", formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Unable to load products from server");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  const results = useMemo(
  () =>
    products.filter(
      (s) =>
        (!query ||
          `${s.name} ${s.crop} ${s.vendor}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (!category || s.category.toLowerCase() === category.toLowerCase()) &&
        (!crop || s.crop.toLowerCase() === crop.toLowerCase()) &&
        (!vendor || s.vendor.toLowerCase() === vendor.toLowerCase()) &&
        Number(s.price) <= maxPrice,
    ),
  [products, query, category, crop, vendor, maxPrice],
);
  const reset = () => {
    setQuery("");
    setCategory("");
    setCrop("");
    setVendor("");
    setMaxPrice(800);
  };

  return (
    <>
      <PageHeader
        eyebrow="Seed Marketplace"
        title="Seeds from local demo vendors"
        description="Compare prototype seed listings by crop, category, vendor and price, then add them to your demo cart."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner>
          Demo Product Data — every product, vendor, price, rating and stock count on this page is
          fictional and created for a college mini-project.
        </DisclaimerBanner>

        <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="h-fit rounded-3xl border border-border bg-card p-5 shadow-soft lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-extrabold">Filters</h2>

            <label className="mt-4 block">
              <span className="block text-sm font-bold">Search</span>
              <div className="relative mt-1.5">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  className={`${inputClass} pl-10`}
                  placeholder="Wheat, tomato, vendor…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </label>

            <label className="mt-4 block">
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

            <label className="mt-4 block">
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

            <label className="mt-4 block">
              <span className="block text-sm font-bold">Vendor</span>
              <select
                className={`${selectClass} mt-1.5`}
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              >
                <option value="">All demo vendors</option>
                {vendors.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>

            <label className="mt-5 block">
              <span className="flex items-center justify-between text-sm font-bold">
                Max price <span className="text-primary">₹{maxPrice}</span>
              </span>
              <input
                type="range"
                min={150}
                max={800}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
            </label>

            <button
              type="button"
              onClick={reset}
              className="mt-6 w-full rounded-xl border border-border py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              Clear filters
            </button>
          </aside>

          <section>
            <p className="text-sm font-semibold text-muted-foreground">
              Showing {results.length} of {products.length} products
            </p>
            <div className="mt-5">
              {loading ? (
                <CardSkeleton count={6} />
              ) : results.length === 0 ? (
                <EmptyState
                  icon={ShoppingBasket}
                  title="No demo products match"
                  description="Try clearing a filter or raising the maximum price."
                  action={
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
                    >
                      Clear filters
                    </button>
                  }
                />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((s) => (
                    <ProductCard
                      key={s.id}
                      seed={s}
                      image={seedImage}
                      onAdd={() => {
                        addToCart({
                          id: s.id,
                          name: s.name,
                          vendor: s.vendor,
                          price: s.price,
                          unit: s.unit,
                          kind: "seed",
                        });
                        toast.success(`${s.name} added to your demo cart`);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
