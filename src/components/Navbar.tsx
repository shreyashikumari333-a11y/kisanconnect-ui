import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingCart, Sprout, X, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/recommendations", label: "Seed Recommendations" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/equipment", label: "Equipment" },
  { to: "/workers", label: "Workers" },
  { to: "/orders", label: "Orders" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, user, logout } = useApp();

  function handleLogout() {
    logout();
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex lg:justify-between">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-leaf shadow-soft">
            <Sprout
              className="h-5 w-5 text-primary-foreground"
              aria-hidden="true"
            />
          </span>

          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-extrabold leading-none text-foreground">
              KisanSetu
            </span>
            <span className="block truncate text-[11px] font-medium text-muted-foreground">
              Connecting Farmers to Everything They Need
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            aria-label="Demo cart"
          >
            <ShoppingCart
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            />

            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-harvest px-1 text-[11px] font-bold text-harvest-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90 sm:inline-flex"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90 sm:inline-flex"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-card transition-all lg:hidden",
          open ? "max-h-[32rem]" : "max-h-0 border-t-0",
        )}
      >
        <nav className="grid gap-1 p-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
            >
              {l.label}
            </Link>
          ))}

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-center text-base font-bold text-primary-foreground"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-primary px-4 py-3 text-center text-base font-bold text-primary-foreground"
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}