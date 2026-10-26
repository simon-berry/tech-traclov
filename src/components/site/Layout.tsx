import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import mark from "@/assets/mark.png";
import { links, plans, apps, type Plan } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Plans & Pricing" },
  { to: "/wordpress-hosting", label: "WordPress" },
  { to: "/n8n-hosting", label: "n8n" },
  { to: "/app-hosting", label: "App Hosting" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={mark} alt="" className="h-8 w-8 object-contain" />
          <span className="text-lg font-extrabold tracking-wider">TECHTRAC</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
          <a href={links.domains} className="text-muted-foreground hover:text-foreground">Domains & SSL</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href={links.portal} className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:block">Client Portal</a>
          <BuyButton href={links.store} size="sm">Get hosting</BuyButton>
        </div>
      </div>
      <nav className="flex justify-center gap-5 border-t border-border/60 py-2 text-sm md:hidden">
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="text-muted-foreground" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <img src={mark} alt="" className="h-6 w-6 object-contain" />
          <span><strong className="text-foreground">TechTrac LTD</strong> · Getting your tech back on track.</span>
        </div>
        <div className="flex gap-5">
          <a href={links.contact} className="hover:text-foreground">Contact</a>
          <a href={links.legal} className="hover:text-foreground">Legal information</a>
          <a href={links.portal} className="hover:text-foreground">Client Portal</a>
        </div>
      </div>
    </footer>
  );
}

export function BuyButton({ href, children, size = "md", variant = "primary" }: { href: string; children: ReactNode; size?: "sm" | "md"; variant?: "primary" | "ghost" }) {
  const s = size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm";
  const v = variant === "primary"
    ? "bg-brand text-primary-foreground shadow-glow hover:brightness-110"
    : "border border-border bg-surface text-foreground hover:border-primary";
  return <a href={href} className={`inline-flex items-center justify-center rounded-lg font-bold tracking-wide transition ${s} ${v}`}>{children}</a>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{children}</p>;
}

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border bg-card p-7 ${plan.featured ? "border-primary shadow-glow" : "border-border"}`}>
      {plan.featured && <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-bold text-primary-foreground">Most popular</span>}
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{plan.category}</p>
      <h3 className="mt-2 text-xl font-bold">{plan.name}</h3>
      <p className="mt-5"><span className="text-4xl font-extrabold">{plan.price}</span> <span className="text-muted-foreground">GBP / month</span></p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2"><span className="text-primary">✓</span>{f}</li>
        ))}
      </ul>
      <div className="mt-7"><BuyButton href={plan.href} variant={plan.featured ? "primary" : "ghost"}>Configure plan</BuyButton></div>
    </div>
  );
}

export function PlanGrid({ filter }: { filter?: Plan["category"] }) {
  const list = filter ? plans.filter((p) => p.category === filter) : plans;
  return <div className={`grid gap-6 ${list.length > 2 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"}`}>{list.map((p) => <PlanCard key={p.name} plan={p} />)}</div>;
}

export function AppMarquee() {
  const row = [...apps, ...apps];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-5">
      <div className="flex w-max animate-marquee items-center gap-14 pr-14">
        {row.map((a, i) => (
          <div key={i} className="flex shrink-0 flex-col items-center gap-2.5">
            <div title={a.name} className="grid h-14 w-14 place-items-center rounded-xl bg-foreground p-2.5 transition hover:scale-110">
              <img src={a.logo} alt={a.name} loading="lazy" className="h-full w-full object-contain" />
            </div>
            <span className="whitespace-nowrap text-xs font-medium tracking-wide text-muted-foreground">{a.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
