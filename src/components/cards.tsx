import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  BadgeIndianRupee,
  CalendarDays,
  CheckCircle2,
  Droplets,
  MapPin,
  Package,
  ShoppingBasket,
  Star,
  Store,
  Timer,
  TrendingUp,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import type { Equipment, Order, Seed, Worker } from "@/data/demo";
import { DemoBadge } from "@/components/DemoBadge";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  to,
  tone = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  to: "/recommendations" | "/marketplace" | "/equipment" | "/workers" | "/benefits" | "/assistant";
  tone?: "primary" | "earth" | "harvest" | "sky";
}) {
  const toneClass = {
    primary: "bg-primary-soft text-primary",
    earth: "bg-earth-soft text-earth",
    harvest: "bg-harvest-soft text-harvest-foreground",
    sky: "bg-sky-soft text-sky",
  }[tone];

  return (
    <Link
      to={to}
      className="card-hover group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
    >
      <span className={cn("grid h-12 w-12 place-items-center rounded-2xl", toneClass)}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold text-card-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-4 text-sm font-bold text-primary transition-transform group-hover:translate-x-1">
        Explore →
      </span>
    </Link>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  hint?: string;
  tone?: "primary" | "earth" | "harvest" | "sky";
}) {
  const toneClass = {
    primary: "bg-primary-soft text-primary",
    earth: "bg-earth-soft text-earth",
    harvest: "bg-harvest-soft text-harvest-foreground",
    sky: "bg-sky-soft text-sky",
  }[tone];

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 text-sm font-semibold text-muted-foreground">{label}</p>
        <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", toneClass)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold text-card-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs font-medium text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-bold text-harvest-foreground">
      <Star className="h-4 w-4 fill-harvest text-harvest" aria-hidden="true" />
      {value.toFixed(1)}
      <span className="text-xs font-medium text-muted-foreground">(demo)</span>
    </span>
  );
}

function StockPill({ availability }: { availability: Seed["availability"] }) {
  const map = {
    "In Stock": "bg-primary-soft text-primary",
    "Low Stock": "bg-harvest-soft text-harvest-foreground",
    "Out of Stock": "bg-muted text-muted-foreground",
  } as const;
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        map[availability],
      )}
    >
      {availability} · demo
    </span>
  );
}

export function SeedCard({ seed }: { seed: Seed }) {
  return (
    <article className="card-hover flex flex-col rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold leading-snug text-card-foreground">
            {seed.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {seed.crop} · {seed.category}
          </p>
        </div>
        <span className="grid shrink-0 place-items-center rounded-2xl bg-gradient-leaf px-3 py-2 text-center">
          <span className="font-display text-lg font-extrabold leading-none text-primary-foreground">
            {seed.score}
          </span>
          <span className="text-[9px] font-bold uppercase text-primary-foreground/90">score</span>
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Best season
          </dt>
          <dd className="mt-0.5 font-semibold text-card-foreground">{seed.season}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Droplets className="h-3.5 w-3.5" aria-hidden="true" /> Water need
          </dt>
          <dd className="mt-0.5 font-semibold text-card-foreground">{seed.water}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-semibold text-muted-foreground">Soil compatibility</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {seed.soil.map((s) => (
              <span
                key={s}
                className="rounded-full bg-earth-soft px-2.5 py-0.5 text-xs font-semibold text-earth"
              >
                {s}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Timer className="h-3.5 w-3.5" aria-hidden="true" /> Duration
          </dt>
          <dd className="mt-0.5 font-semibold text-card-foreground">{seed.duration}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <BadgeIndianRupee className="h-3.5 w-3.5" aria-hidden="true" /> Est. price
          </dt>
          <dd className="mt-0.5 font-semibold text-card-foreground">
            ₹{seed.price} / {seed.unit}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <StockPill availability={seed.availability} />
        <DemoBadge label="Demo score" />
      </div>
    </article>
  );
}

export function ProductCard({
  seed,
  image,
  onAdd,
}: {
  seed: Seed;
  image: string;
  onAdd: () => void;
}) {
  const disabled = seed.availability === "Out of Stock";
  return (
    <article className="card-hover flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={`${seed.crop} seed illustration`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <DemoBadge label="Demo product" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold leading-snug text-card-foreground">
          {seed.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {seed.crop} · {seed.category}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-earth">
          <Store className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{seed.vendor}</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <Rating value={seed.rating} />
          <StockPill availability={seed.availability} />
        </div>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="font-display text-2xl font-extrabold text-card-foreground">
              ₹{seed.price}
            </p>
            <p className="text-xs text-muted-foreground">per {seed.unit}</p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            disabled={disabled}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            <ShoppingBasket className="h-4 w-4" aria-hidden="true" />
            {disabled ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export function EquipmentCard({
  item,
  icon: Icon,
  onRequest,
}: {
  item: Equipment;
  icon: React.ComponentType<{ className?: string }>;
  onRequest: () => void;
}) {
  return (
    <article className="card-hover flex flex-col rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="grid h-32 place-items-center rounded-2xl bg-gradient-soil">
        <Icon className="h-14 w-14 text-earth-foreground" aria-hidden="true" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold leading-snug text-card-foreground">
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.type}</p>
        </div>
        <DemoBadge label="Demo" />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-earth">
        <Store className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{item.provider}</span>
      </p>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{item.location}</span>
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{item.note}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <Rating value={item.rating} />
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase",
            item.available ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground",
          )}
        >
          {item.available ? (
            <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
          ) : (
            <XCircle className="h-3 w-3" aria-hidden="true" />
          )}
          {item.available ? "Available" : "Booked"}
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-4">
        <div>
          <p className="font-display text-2xl font-extrabold text-card-foreground">
            ₹{item.pricePerDay}
          </p>
          <p className="text-xs text-muted-foreground">per day (demo rate)</p>
        </div>
        <button
          type="button"
          onClick={onRequest}
          disabled={!item.available}
          className="rounded-xl bg-earth px-4 py-3 text-sm font-bold text-earth-foreground shadow-soft transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          Request Rental
        </button>
      </div>
    </article>
  );
}

export function WorkerCard({ worker, onRequest }: { worker: Worker; onRequest: () => void }) {
  const initials = worker.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <article className="card-hover flex flex-col rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-leaf font-display text-xl font-extrabold text-primary-foreground">
          {initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-bold text-card-foreground">
            {worker.name}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{worker.location}</span>
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Demo profile · {worker.id}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {worker.skills.map((s) => (
          <span
            key={s}
            className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary"
          >
            {s}
          </span>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs font-semibold text-muted-foreground">Experience</dt>
          <dd className="mt-0.5 font-semibold text-card-foreground">{worker.experience} years</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-muted-foreground">Daily wage (demo)</dt>
          <dd className="mt-0.5 font-semibold text-card-foreground">₹{worker.wage}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-semibold text-muted-foreground">Languages</dt>
          <dd className="mt-0.5 font-semibold text-card-foreground">{worker.languages}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase",
            worker.available ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground",
          )}
        >
          {worker.available ? "Available now" : "Currently engaged"}
        </span>
        <button
          type="button"
          onClick={onRequest}
          disabled={!worker.available}
          className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          Request Worker
        </button>
      </div>
    </article>
  );
}

const statusTone: Record<Order["status"], string> = {
  "Order Placed": "bg-sky-soft text-sky",
  Processing: "bg-accent text-accent-foreground",
  Ready: "bg-harvest-soft text-harvest-foreground",
  "Out for Demo Delivery": "bg-earth-soft text-earth",
  Delivered: "bg-primary-soft text-primary",
};

export function OrderStatusPill({ status }: { status: Order["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
        statusTone[status],
      )}
    >
      {status === "Out for Demo Delivery" ? (
        <Truck className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Package className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {status}
    </span>
  );
}

export function OrderCard({ order }: { order: Order }) {
  return (
    <article className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-card">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Order {order.id} · demo
          </p>
          <h3 className="mt-1 font-display text-base font-bold text-card-foreground">
            {order.product}
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Store className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{order.vendor}</span>
          </p>
        </div>
        <div className="shrink-0 text-right">
          <OrderStatusPill status={order.status} />
          <p className="mt-2 font-display text-lg font-extrabold text-card-foreground">
            ₹{order.amount}
          </p>
          <p className="text-xs text-muted-foreground">{order.date}</p>
        </div>
      </div>
    </article>
  );
}

export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  action,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-card-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-3xl border border-border bg-card p-5 shadow-soft"
        >
          <div className="h-32 rounded-2xl bg-muted" />
          <div className="mt-4 h-4 w-3/4 rounded bg-muted" />
          <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
          <div className="mt-5 h-10 rounded-xl bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function TrendPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
      <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

export function PersonIcon() {
  return <User className="h-5 w-5" aria-hidden="true" />;
}
