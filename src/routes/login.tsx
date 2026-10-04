import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Sprout, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { Field, inputClass } from "@/components/FormField";
import { DisclaimerBanner } from "@/components/DemoBadge";
import { useApp } from "@/context/AppContext";
import { auth } from "@/lib/firebase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Farmer Login & Register — KisanSetu Demo" },
      {
        name: "description",
        content:
          "Create a demo farmer account or continue as a demo farmer to explore the KisanSetu prototype.",
      },
      {
        property: "og:title",
        content: "Farmer Login & Register — KisanSetu Demo",
      },
      {
        property: "og:description",
        content:
          "Prototype login screen for the KisanSetu college mini-project. No real data used.",
      },
    ],
  }),
  component: LoginPage,
});

type Errors = Partial<
  Record<"name" | "mobile" | "email" | "password" | "village", string>
>;

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [mode, setMode] = useState<"login" | "register">("register");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    village: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate(): boolean {
    const e: Errors = {};

    if (mode === "register") {
      if (form.name.trim().length < 2) {
        e.name = "Please enter your name.";
      }

      if (!/^\d{10}$/.test(form.mobile.trim())) {
        e.mobile = "Enter a 10 digit mobile number.";
      }

      if (form.village.trim().length < 2) {
        e.village = "Please enter your village or town.";
      }
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      e.email = "Enter a valid email address.";
    }

    if (form.password.length < 6) {
      e.password = "Password must be at least 6 characters.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      let userCredential;

      if (mode === "register") {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );
      }

      const firebaseUser = userCredential.user;

      login({
        name: form.name.trim() || "Demo Farmer",
        mobile: form.mobile || "90000 00000",
        email: firebaseUser.email || form.email.trim(),
        village: form.village.trim() || "Demo Village",
        isDemo: false,
      });

      toast.success(
        mode === "register"
          ? "Account created successfully"
          : "Logged in successfully"
      );

      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Authentication error:", error);

      toast.error(
        mode === "register"
          ? "Registration failed. Email may already be registered."
          : "Login failed. Check your email and password."
      );
    } finally {
      setLoading(false);
    }
  }

  function demoLogin() {
    login({
      name: "Demo Farmer",
      mobile: "90000 00000",
      email: "demo@kisansetu.demo",
      village: "Rampur, Demo District",
      isDemo: true,
    });

    toast.success("Signed in as Demo Farmer");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <Sprout className="h-4 w-4" aria-hidden="true" />
          Farmer Access
        </span>

        <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight">
          Welcome to KisanSetu
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          Register once and get seed recommendations, nearby demo vendors,
          equipment rentals and worker contacts tailored to your village.
        </p>

        <DisclaimerBanner className="mt-8" variant="warn">
          This is a college project prototype. Demo accounts and data are used
          for demonstration purposes. Please do not enter real passwords,
          Aadhaar numbers or bank details.
        </DisclaimerBanner>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-secondary p-1">
          {(["register", "login"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setErrors({});
              }}
              className={
                mode === m
                  ? "rounded-xl bg-card py-2.5 text-sm font-bold text-primary shadow-soft"
                  : "rounded-xl py-2.5 text-sm font-bold text-muted-foreground"
              }
            >
              {m === "register" ? "Register" : "Login"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} noValidate className="mt-6 grid gap-4">
          {mode === "register" && (
            <Field label="Name" error={errors.name}>
              <input
                className={inputClass}
                value={form.name}
                onChange={set("name")}
                placeholder="Ramesh Yadav"
                autoComplete="name"
              />
            </Field>
          )}

          {mode === "register" && (
            <Field label="Mobile Number" error={errors.mobile}>
              <input
                className={inputClass}
                value={form.mobile}
                onChange={set("mobile")}
                inputMode="numeric"
                placeholder="9876543210"
                autoComplete="tel"
              />
            </Field>
          )}

          <Field label="Email" error={errors.email}>
            <input
              className={inputClass}
              value={form.email}
              onChange={set("email")}
              type="email"
              placeholder="farmer@example.com"
              autoComplete="email"
            />
          </Field>

          <Field
            label="Password"
            error={errors.password}
            hint="Minimum 6 characters (demo only)."
          >
            <input
              className={inputClass}
              value={form.password}
              onChange={set("password")}
              type="password"
              placeholder="••••••"
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
            />
          </Field>

          {mode === "register" && (
            <Field label="Village / Location" error={errors.village}>
              <input
                className={inputClass}
                value={form.village}
                onChange={set("village")}
                placeholder="Rampur, Nashik"
              />
            </Field>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90 disabled:opacity-70"
          >
            {loading
              ? "Please wait…"
              : mode === "register"
                ? "Register"
                : "Login"}
          </button>

          <div className="relative py-2 text-center">
            <span className="relative z-10 bg-card px-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              or
            </span>
            <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>

          <button
            type="button"
            onClick={demoLogin}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-primary-soft py-4 text-base font-bold text-primary transition-colors hover:bg-secondary"
          >
            <UserCheck className="h-5 w-5" aria-hidden="true" />
            Continue as Demo Farmer
          </button>
        </form>
      </div>
    </div>
  );
}