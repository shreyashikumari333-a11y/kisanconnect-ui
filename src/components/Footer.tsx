import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Sprout } from "lucide-react";

const quickLinks = [
  { to: "/recommendations", label: "Seed Recommendations" },
  { to: "/marketplace", label: "Seed Marketplace" },
  { to: "/equipment", label: "Equipment Rental" },
  { to: "/workers", label: "Worker Connect" },
] as const;

const projectLinks = [
  { to: "/about", label: "About Project" },
  { to: "/benefits", label: "Demo Benefits" },
  { to: "/admin", label: "Admin Analytics (Demo)" },
  { to: "/vendor", label: "Vendor Dashboard" },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-leaf">
                <Sprout className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-extrabold">KisanSetu</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Connecting farmers to seeds, equipment, workers and knowledge through one simple
              digital platform.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Project</h3>
            <ul className="mt-4 space-y-2.5">
              {projectLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                team@kisansetu.demo (demo address)
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Department of Computer Science, College Mini-Project
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Privacy: no real personal data is collected by this prototype.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-harvest bg-harvest-soft p-5">
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-harvest-foreground">
            Disclaimer
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-harvest-foreground">
            KisanSetu is an academic mini-project prototype created for educational purposes. All
            vendors, products, subsidies, payments, analytics, and delivery information shown may use
            demo data and are not official services. This project is not affiliated with the Indian
            Government, Aadhaar, any real subsidy scheme, any payment gateway, or any delivery
            company.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} KisanSetu — student prototype. Built for demonstration only.
        </p>
      </div>
    </footer>
  );
}
