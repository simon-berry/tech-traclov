import { createFileRoute, Link } from "@tanstack/react-router";
import { AppMarquee, BuyButton, Eyebrow, PlanGrid } from "@/components/site/Layout";
import { links } from "@/lib/site";
import { AutomationPlanner } from "@/components/site/AutomationPlanner";

export const Route = createFileRoute("/n8n-hosting")({
  head: () => ({
    meta: [
      { title: "n8n Hosting on Your Own Domain | TechTrac LTD" },
      { name: "description", content: "Run n8n, the open-source workflow automation tool, on a TechTrac App Hosting plan with your own domain and certificate. From £3/month." },
      { property: "og:title", content: "n8n Hosting on Your Own Domain | TechTrac LTD" },
      { property: "og:description", content: "Deploy n8n on a TechTrac App Hosting plan from £3/month — workflows on your own domain, with memory, storage and bandwidth you can read before ordering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: N8nHosting,
});

const includes = [
  {
    t: "n8n, ready to build",
    d: "Choose n8n during configuration and the service comes up with it installed. Open the editor in a browser and start building workflows.",
  },
  {
    t: "Your own domain",
    d: "Point a domain at the service and add a certificate, so webhook calls and shared links carry your address instead of a borrowed one.",
  },
  {
    t: "Resources you can read",
    d: "Every plan lists its memory, processor, storage and bandwidth. Workflows that poll APIs, process files or run on a tight schedule are the ones worth checking against those figures.",
  },
  {
    t: "A plan per project",
    d: "App Hosting plans are sold per service and each includes one website. Separating client automations, or splitting a busy workflow set from the rest, needs a plan that supports it.",
  },
];

const useCases = [
  { n: "Lead capture and CRM", d: "Form submissions and webhook calls that create or update records without anyone copying them by hand." },
  { n: "Scheduled syncs", d: "Jobs that move files or export records between services on a timer, overnight or hourly." },
  { n: "Alerts and notifications", d: "Monitoring events, queue messages or spreadsheet changes pushed out to Slack, email or Telegram." },
  { n: "AI and data steps", d: "Workflows that call an AI model, transform data, then hand the result to another system." },
];

const faqs = [
  {
    q: "How do I set up n8n on a plan?",
    a: "Order an App Hosting plan from the store and pick n8n as the application during configuration. Once the service is ready, point your domain at it and add a certificate from the client area.",
  },
  {
    q: "Can I move workflows from another host or n8n Cloud?",
    a: "Workflows can be exported from n8n as JSON and imported into a new instance, but credentials generally have to be entered again on the new one. Tell us how many workflows you have and which services they touch, and we'll confirm what the move involves before you order.",
  },
  {
    q: "Can workflows run on a schedule and receive webhooks?",
    a: "Scheduling and webhook triggers are part of n8n itself. What matters on our side is that your instance is reachable from outside, which comes down to the domain and certificate you point at it.",
  },
  {
    q: "How do backups work?",
    a: "What gets backed up, how often, and how long copies are kept depends on how the service is set up — we'd rather you ask than us guess. Confirm the details for your plan before ordering, and export your workflows yourself before any major change.",
  },
  {
    q: "How is n8n updated?",
    a: "How the n8n version itself is updated depends on the service, so ask us to confirm before ordering. Workflows you have built, and any credentials you have added, are yours to export and bring forward.",
  },
];

function N8nHosting() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 pb-20 pt-20 md:flex-row md:items-center md:justify-between md:pt-28">
          <div>
            <Eyebrow>n8n App Hosting / TechTrac LTD</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Your automations, <span className="text-brand">on a server you control.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              n8n is the open-source workflow automation tool — an alternative to Zapier or Make. Run it on an App Hosting plan with your own domain, from £3/month.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BuyButton href={links.appHosting}>Configure n8n hosting</BuyButton>
              <Link to="/pricing" className="inline-flex items-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-bold hover:border-primary">
                Compare plans
              </Link>
            </div>
          </div>
          <div className="grid h-32 w-32 shrink-0 place-items-center rounded-3xl bg-foreground p-7 shadow-glow">
            <img src="/logos/n8n.svg" alt="n8n" className="h-full w-full object-contain" />
          </div>
        </div>
      </section>

      <AppMarquee />

      <AutomationPlanner />

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Eyebrow>What's included</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">What you get on an App Hosting plan.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {includes.map((p) => (
            <div key={p.t} className="rounded-2xl border border-border bg-card p-7">
              <h3 className="font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <Eyebrow>Suits</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">What people automate on it</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((u) => (
            <div key={u.n} className="rounded-xl border border-border bg-surface p-5 transition hover:border-primary">
              <p className="font-mono text-sm font-bold text-primary">{u.n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{u.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Questions people ask</h2>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl border border-border bg-card p-6 md:p-7">
              <h3 className="font-bold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Something not covered here? <a href={links.contact} className="font-bold text-primary hover:underline">Ask us</a> and we'll answer before you commit to a plan.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <h2 className="mb-3 text-3xl font-extrabold md:text-4xl">App Hosting plans</h2>
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground">
          n8n is one of the applications available on App Hosting. Choose the plan that matches the workflows you intend to run.
        </p>
        <PlanGrid filter="App Hosting" />
        <p className="mt-4 text-xs text-muted-foreground">Application choice appears during configuration where the plan supports it.</p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="rounded-3xl border border-border bg-surface p-10 text-center">
          <h2 className="text-2xl font-extrabold md:text-3xl">Running more than n8n?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            A VPS gives you full server access and room to run n8n alongside other services. Compare it with App Hosting, or start small and move later.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BuyButton href={links.vps}>See VPS hosting</BuyButton>
            <BuyButton href={links.store} variant="ghost">Browse the store</BuyButton>
          </div>
        </div>
      </section>
    </>
  );
}
