import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Demo Cart — KisanSetu" },
      {
        name: "description",
        content:
          "Review demo seed, equipment and worker requests, adjust quantities and see the prototype discount before demo checkout.",
      },
      { property: "og:title", content: "Demo Cart — KisanSetu" },
      { property: "og:description", content: "Prototype shopping cart with demo pricing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart, subtotal, discount, total } = useApp();

  return (
    <>
      <PageHeader
        eyebrow="Step 1 of 2"
        title="Your demo cart"
        description="Seeds, equipment rentals and worker requests you added while exploring the prototype."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner>
          All prices, discounts and totals are demo values. No payment is ever collected by this
          college project.
        </DisclaimerBanner>

        {cart.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              icon={ShoppingCart}
              title="Your demo cart is empty"
              description="Add demo seeds from the marketplace, or request demo equipment and workers."
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
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div className="grid gap-4">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-border bg-card p-5 shadow-soft"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="font-display text-base font-bold text-card-foreground">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{item.vendor}</p>
                      <p className="mt-1 text-sm font-semibold text-card-foreground">
                        ₹{item.price} / {item.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center font-display font-extrabold">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground hover:bg-secondary hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="justify-self-start rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-muted-foreground hover:bg-secondary"
              >
                Clear demo cart
              </button>
            </div>

            <aside className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold text-card-foreground">Demo summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
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
              <Link
                to="/checkout"
                className="mt-6 block rounded-xl bg-primary px-5 py-3.5 text-center text-base font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
              >
                Continue to demo checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
