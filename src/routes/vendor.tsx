import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeIndianRupee, MessageSquare, Package, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { StatCard } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { Field, inputClass } from "@/components/FormField";
import { vendorProducts, vendorRequests } from "@/data/demo";

export const Route = createFileRoute("/vendor")({
  head: () => ({
    meta: [
      { title: "Vendor Dashboard — KisanSetu Demo" },
      {
        name: "description",
        content:
          "Prototype vendor dashboard to add demo products, edit prices, manage demo orders and update availability for a college mini-project.",
      },
      { property: "og:title", content: "Vendor Dashboard — KisanSetu Demo" },
      { property: "og:description", content: "Prototype vendor tools with demo products and orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VendorPage,
});

type Row = { id: string; name: string; stock: number; price: number; status: string };

const statusTone: Record<string, string> = {
  Active: "bg-primary-soft text-primary",
  "Low Stock": "bg-harvest-soft text-harvest-foreground",
  Paused: "bg-muted text-muted-foreground",
};

function VendorPage() {
  const [rows, setRows] = useState<Row[]>(vendorProducts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 3) next['name'] = "Enter a product name";
    if (!/^\d+$/.test(price.trim()) || Number(price) <= 0) next['price'] = "Enter a valid price";
    if (!/^\d+$/.test(stock.trim())) next['stock'] = "Enter stock quantity";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const qty = Number(stock);
    setRows((prev) => [
      {
        id: `SD-${200 + prev.length}`,
        name: name.trim(),
        price: Number(price),
        stock: qty,
        status: qty === 0 ? "Paused" : qty < 10 ? "Low Stock" : "Active",
      },
      ...prev,
    ]);
    setName("");
    setPrice("");
    setStock("");
    toast.success("Demo product added to your listing");
  };

  const toggleStatus = (id: string) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Paused" ? (r.stock < 10 ? "Low Stock" : "Active") : "Paused" }
          : r,
      ),
    );
  };

  const adjustPrice = (id: string, delta: number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, price: Math.max(10, r.price + delta) } : r)),
    );
  };

  const revenue = rows.reduce((s, r) => s + r.price * Math.max(1, r.stock), 0);

  return (
    <>
      <PageHeader
        eyebrow="Vendor tools"
        title="Vendor Dashboard – Demo"
        description="Manage demo seed listings, prices, availability and incoming farmer requests."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          This vendor workspace uses demo listings, demo orders and demo revenue figures. No real
          store, stock or money is involved.
        </DisclaimerBanner>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Package} label="Total Products" value={rows.length} hint="Demo listings" />
          <StatCard icon={ShoppingBag} label="Demo Orders" value="46" hint="This demo month" tone="earth" />
          <StatCard
            icon={BadgeIndianRupee}
            label="Revenue (Demo)"
            value={`₹${revenue.toLocaleString("en-IN")}`}
            hint="Prototype estimate"
            tone="harvest"
          />
          <StatCard
            icon={MessageSquare}
            label="Customer Requests"
            value={vendorRequests.length}
            hint="Awaiting demo reply"
            tone="sky"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="flex items-center justify-between gap-3 border-b border-border p-5">
              <h2 className="font-display text-lg font-bold text-card-foreground">
                Manage demo products
              </h2>
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {rows.length} listings
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-secondary text-xs font-bold uppercase tracking-wide text-secondary-foreground">
                  <tr>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Stock</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-border hover:bg-secondary/50">
                      <td className="px-5 py-4">
                        <span className="block font-bold text-card-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground">{r.id}</span>
                      </td>
                      <td className="px-5 py-4 font-semibold">{r.stock}</td>
                      <td className="px-5 py-4 font-semibold">₹{r.price}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${statusTone[r.status] ?? "bg-muted text-muted-foreground"}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => adjustPrice(r.id, 10)}
                            className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-bold hover:bg-secondary"
                          >
                            Price +10
                          </button>
                          <button
                            type="button"
                            onClick={() => adjustPrice(r.id, -10)}
                            className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-bold hover:bg-secondary"
                          >
                            Price −10
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleStatus(r.id)}
                            className="rounded-lg bg-primary px-2.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                          >
                            {r.status === "Paused" ? "Resume" : "Pause"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-6">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-card-foreground">
                Add demo product
              </h2>
              <form className="mt-4 grid gap-4" onSubmit={addProduct}>
                <Field label="Product name" error={errors['name']}>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Hybrid Onion Seed"
                  />
                </Field>
                <Field label="Price (₹)" error={errors['price']}>
                  <input
                    className={inputClass}
                    inputMode="numeric"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="350"
                  />
                </Field>
                <Field label="Stock quantity" error={errors['stock']}>
                  <input
                    className={inputClass}
                    inputMode="numeric"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="25"
                  />
                </Field>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                  Add demo product
                </button>
              </form>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-card-foreground">
                Customer requests (demo)
              </h2>
              <ul className="mt-4 space-y-4">
                {vendorRequests.map((r) => (
                  <li key={r.id} className="rounded-2xl bg-secondary/60 p-4">
                    <p className="font-bold text-secondary-foreground">{r.farmer}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{r.item}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.note}</p>
                    <button
                      type="button"
                      onClick={() => toast.success(`Demo reply sent to ${r.farmer}`)}
                      className="mt-3 rounded-lg bg-earth px-3 py-2 text-xs font-bold text-earth-foreground hover:opacity-90"
                    >
                      Send demo reply
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
