import { createFileRoute, Link } from "@tanstack/react-router";
import { AppMarquee, BuyButton, Eyebrow, PlanGrid } from "@/components/site/Layout";
import { links } from "@/lib/site";

export const Route = createFileRoute("/app-hosting")({
  head: () => ({
    meta: [
      { title: "App Hosting — Deploy your stack | TechTrac LTD" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "description", content: "Host n8n, WordPress, BookStack, Chatwoot and 95+ applications with TechTrac App Hosting from £3/month." },
      { property: "og:title", content: "App Hosting — Deploy your stack | TechTrac LTD" },
      { property: "og:description", content: "Choose from 95+ applications and deploy on TechTrac App Hosting." },
    ],
  }),
  component: AppHosting,
});

const points = [
  { t: "Discover what you can run", d: "Search the offered catalogue, read application descriptions and choose a suitable hosting product." },
  { t: "Know your resource allocation", d: "Compare the listed CPU, memory, storage and application limits. Ask us about any requirements not stated in your plan." },
  { t: "Plan for your application data", d: "Check storage capacity, persistence, backup scope and restore options in the selected product." },
  { t: "Connect your domain", d: "Review the domain and certificate options supported by your product. Contact us for help with routing or SSL." },
];

const featured = [
  { n: "n8n", d: "Workflow automation — open source alternative to Zapier/Make." },
  { n: "OpenLiteSpeed WordPress", d: "Production-ready WordPress with LSCache and Redis object caching." },
  { n: "Watchtower", d: "Automatically update running Docker containers. Set it and forget it." },
  { n: "AdGuard Home", d: "Network-wide ad and tracker blocking DNS server with encrypted DNS." },
  { n: "BookStack", d: "Simple, self-hosted platform for organising and storing information." },
  { n: "Chatwoot", d: "Open-source customer engagement and support inbox." },
];

function AppHosting() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20">
          <Eyebrow>Application Hosting / TechTrac LTD</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Deploy your stack. <span className="text-brand">Find your next starting point.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Browse 95+ applications, compare hosting resources and configure a service for your project.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BuyButton href={links.store}>Start from £3/mo</BuyButton>
            <Link to="/pricing" className="inline-flex items-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-bold hover:border-primary">View hosting plans</Link>
          </div>
        </div>
      </section>
      <AppMarquee />

      <section className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-3xl font-extrabold md:text-4xl">A clearer path to application hosting.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {points.map((p) => (
            <div key={p.t} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <Eyebrow>Catalogue</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Popular applications</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a) => (
            <div key={a.n} className="rounded-xl border border-border bg-surface p-5 transition hover:border-primary">
              <p className="font-mono text-sm font-bold text-primary">{a.n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Availability depends on your selected plan.</p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <h2 className="mb-8 text-3xl font-extrabold md:text-4xl">App Hosting plans</h2>
        <PlanGrid filter="App Hosting" />
      </section>
    </>
  );
}
