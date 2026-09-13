import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Banknote, CreditCard, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { Field, inputClass } from "@/components/FormField";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Demo Checkout — KisanSetu" },
      {
        name: "description",
        content:
          "Prototype checkout with demo delivery address, order summary and demo payment options. No real payment gateway is used.",
      },
      { property: "og:title", content: "Demo Checkout — KisanSetu" },
      { property: "og:description", content: "Prototype checkout for a college mini-project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const paymentOptions = [
  { id: "Demo UPI", icon: Smartphone, note: "Simulated UPI confirmation" },
  { id: "Demo Cash on Delivery", icon: Banknote, note: "Pay nothing — demo only" },
  { id: "Prototype Payment", icon: CreditCard, note: "Placeholder payment step" },
] as const;

function CheckoutPage() {
  const { cart, subtotal, discount, total, placeOrder, user } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [mobile, setMobile] = useState(user?.mobile ?? "");
  const [address, setAddress] = useState("");
  const [village, setVillage] = useState(user?.village ?? "");
  const [payment, setPayment] = useState<string>("Demo UPI");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  if (cart.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Step 2 of 2" title="Demo checkout" />
        <div className="mx-auto max-w-7xl px-4 py-10">
          <EmptyState
            title="Nothing to check out"
            description="Add demo items to your cart first, then return to this prototype checkout."
            action={
              <Link
                to="/marketplace"
                className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                Browse demo marketplace
              </Link>
            }
          />
        </div>
      </>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next['name'] = "Please enter your name";
    if (!/^[0-9]{10}$/.test(mobile.trim())) next['mobile'] = "Enter a 10-digit mobile number";
    if (address.trim().length < 6) next['address'] = "Please enter a delivery address";
    if (village.trim().length < 2) next['village'] = "Please enter your village or town";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    setTimeout(() => {
      const id = placeOrder(payment);
      setBusy(false);
      toast.success(`Demo order ${id} placed`);
      void navigate({ to: "/orders" });
    }, 800);
  };

  return (
    <>
      <PageHeader
        eyebrow="Step 2 of 2"
        title="Demo checkout"
        description="Fill in a demo delivery address and pick a prototype payment method."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          No real payment gateway is connected. Choosing any option only creates a demo order record
          inside this prototype.
        </DisclaimerBanner>

        <form
          onSubmit={submit}
          className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start"
        >
          <div className="grid gap-6">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-card-foreground">
                Demo delivery address
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" error={errors['name']}>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Farmer name"
                  />
                </Field>
                <Field label="Mobile number" error={errors['mobile']} hint="Demo number, not verified">
                  <input
                    className={inputClass}
                    inputMode="numeric"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit number"
                  />
                </Field>
                <Field label="Address" error={errors['address']} className="sm:col-span-2">
                  <textarea
                    className={`${inputClass} min-h-24`}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House, landmark, post office"
                  />
                </Field>
                <Field label="Village / Town" error={errors['village']}>
                  <input
                    className={inputClass}
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Sinnar"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-card-foreground">
                Demo payment method
              </h2>
              <div className="mt-4 grid gap-3">
                {paymentOptions.map((p) => {
                  const active = payment === p.id;
                  return (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${
                        active
                          ? "border-primary bg-primary-soft"
                          : "border-border bg-background hover:bg-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="h-5 w-5 accent-primary"
                        checked={active}
                        onChange={() => setPayment(p.id)}
                      />
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-card text-primary">
                        <p.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold text-foreground">{p.id}</span>
                        <span className="block text-sm text-muted-foreground">{p.note}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24">
            <h2 className="font-display text-lg font-bold text-card-foreground">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {cart.map((c) => (
                <li key={c.id} className="flex justify-between gap-3 text-sm">
                  <span className="min-w-0 text-muted-foreground">
                    {c.name} × {c.qty}
                  </span>
                  <span className="shrink-0 font-bold">₹{c.price * c.qty}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-bold">₹{subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Demo discount (15%)</dt>
                <dd className="font-bold text-primary">−₹{discount}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="font-bold">Demo total</dt>
                <dd className="font-display text-2xl font-extrabold">₹{total}</dd>
              </div>
            </dl>
            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full rounded-xl bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              {busy ? "Placing demo order…" : "Place demo order"}
            </button>
          </aside>
        </form>
      </div>
    </>
  );
}
