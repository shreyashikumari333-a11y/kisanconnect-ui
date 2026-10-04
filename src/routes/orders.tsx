import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Package } from "lucide-react";
import { EmptyState, OrderStatusPill } from "@/components/cards";
import { PageHeader } from "@/components/SiteLayout";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { selectClass } from "@/components/FormField";
import { orderStatuses } from "@/data/demo";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Demo Order Management — KisanSetu" },
      {
        name: "description",
        content:
          "Track prototype orders by ID, product, vendor, date and demo delivery status inside the KisanSetu college project.",
      },
      { property: "og:title", content: "Demo Order Management — KisanSetu" },
      { property: "og:description", content: "Prototype order list with demo delivery statuses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrdersPage,
});

type BackendOrder = {
  id: string;
  items: {
    id: string;
    name: string;
    vendor: string;
    price: number;
    unit: string;
    quantity: number;
  }[];
  total: number;
  status: string;
  created_at?: string | null;
};

function OrdersPage() {
  const [orders, setOrders] = useState<import("@/data/demo").Order[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    setUpdatingId(orderId);

    const response = await fetch(
      `http://localhost:8000/api/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus as import("@/data/demo").OrderStatus,
            }
          : order,
      ),
    );
  } catch (error) {
    console.error("Failed to update order status:", error);
  } finally {
    setUpdatingId(null);
  }
};

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders/");

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data: BackendOrder[] = await response.json();

        const formattedOrders = data.map((order) => {
          const firstItem = order.items[0];

          return {
            id: order.id,
            product: firstItem
              ? `${firstItem.name}${
                  order.items.length > 1
                    ? ` +${order.items.length - 1} more`
                    : ""
                }`
              : "Order",
            vendor: firstItem?.vendor ?? "KisanSetu Demo Vendor",
            date: order.created_at
              ? order.created_at.slice(0, 10)
              : new Date().toISOString().slice(0, 10),
            amount: order.total,
            status: order.status as import("@/data/demo").OrderStatus,
          };
        });

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filtered = useMemo(
    () => orders.filter((o) => !status || o.status === status),
    [orders, status],
  );

  return (
    <>
      <PageHeader
        eyebrow="Order management"
        title="Your orders"
        description="Every order below is a prototype record. Delivery tracking is simulated for demonstration."
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <DisclaimerBanner variant="warn">
          All orders, vendors and delivery statuses are DEMO/PROTOTYPE data. Nothing will be shipped
          and no money is collected.
        </DisclaimerBanner>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <label className="block w-full sm:w-64">
            <span className="block text-sm font-bold">Filter by demo status</span>
            <select
              className={`${selectClass} mt-1.5`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              {orderStatuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <p className="text-sm font-semibold text-muted-foreground">
  {loading
    ? "Loading orders..."
    : `${filtered.length} ${filtered.length === 1 ? "order" : "orders"}`}
</p>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon={Package}
              title="No demo orders here"
              description="Change the status filter, or place a demo order from the marketplace."
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
          <>
            {/* Mobile cards */}
            <div className="mt-6 grid gap-4 lg:hidden">
              {filtered.map((o) => (
                <article key={o.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {o.id} · demo
                  </p>
                  <h2 className="mt-1 font-display text-base font-bold text-card-foreground">
                    {o.product}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {o.vendor} · {o.date}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                   <select
  value={o.status}
  disabled={updatingId === o.id}
  onChange={(e) => updateOrderStatus(o.id, e.target.value)}
  className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold"
>
  <option value="Order Placed">Order Placed</option>
  <option value="Processing">Processing</option>
  <option value="Ready">Ready</option>
  <option value="Out for Demo Delivery">Out for Demo Delivery</option>
  <option value="Delivered">Delivered</option>
</select>
                    <span className="font-display text-lg font-extrabold">₹{o.amount}</span>
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop table */}
            <div className="mt-6 hidden overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary text-xs font-bold uppercase tracking-wide text-secondary-foreground">
                  <tr>
                    <th className="px-5 py-4">Order ID</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Vendor</th>
                    <th className="px-5 py-4">Order date</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Demo status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr key={o.id} className="border-t border-border transition-colors hover:bg-secondary/50">
                      <td className="px-5 py-4 font-bold">{o.id}</td>
                      <td className="px-5 py-4">{o.product}</td>
                      <td className="px-5 py-4 text-muted-foreground">{o.vendor}</td>
                      <td className="px-5 py-4 text-muted-foreground">{o.date}</td>
                      <td className="px-5 py-4 font-bold">₹{o.amount}</td>
                      
 <td className="px-5 py-4">
  <select
    value={o.status}
    disabled={updatingId === o.id}
    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
    className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold"
  >
    <option value="Order Placed">Order Placed</option>
    <option value="Processing">Processing</option>
    <option value="Ready">Ready</option>
    <option value="Out for Demo Delivery">Out for Demo Delivery</option>
    <option value="Delivered">Delivered</option>
  </select>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
