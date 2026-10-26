import { createFileRoute, Link } from "@tanstack/react-router";
import { AppMarquee, BuyButton, Eyebrow, PlanCard } from "@/components/site/Layout";
import { links, plans } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechTrac LTD — Hosting that simply works" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "description", content: "App hosting and VPS from £3/month. Find a home for your website or next application with TechTrac LTD." },
      { property: "og:title", content: "TechTrac LTD — Hosting that simply works" },
      { property: "og:description", content: "App hosting and VPS from £3/month. Choose the resources and software your project needs." },
    ],
  }),
  component: Index,
});

const features = [
  { t: "Resources matched to your workload", d: "Compare the allocations and limits listed for each product. Check your application's requirements before choosing a plan." },
  { t: "Your client portal", d: "Access your account, review your services and manage orders through the client area." },
  { t: "Storage that fits your service", d: "Review the included storage and any available options in your selected product's specification." },
  { t: "Applications, without the guesswork", d: "Browse the offered catalogue and confirm runtime, deployment and management options for the plan you choose." },
];

const steps = [
  { t: "Choose your plan", d: "Compare the resources, service limits and billing options listed for your project." },
  { t: "Configure what you need", d: "Select the options available for your chosen product. App selection appears where the plan supports it." },
  { t: "Review and get started", d: "Check the order summary and follow the activation or provisioning instructions for your service." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 md:pt-28">
          <Eyebrow>TechTrac LTD / Hosting & Applications</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Hosting that <span className="text-brand">simply works.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Find a home for your website or next application. Compare the resources, explore available software and choose the service your project needs.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BuyButton href={links.store}>Choose a plan — from £3/mo</BuyButton>
            <Link to="/app-hosting" className="inline-flex items-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-bold hover:border-primary">Explore App Hosting</Link>
          </div>
        </div>
      </section>

      <AppMarquee />

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Eyebrow>Why TechTrac</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">A clearer way to host.</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Choose the resources, applications and service options that fit your project. Confirm the technical details before you order.</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {features.map((f, i) => (
            <div key={f.t} className="bg-card p-8">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Plans</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Choose your starting point.</h2>
          </div>
          <Link to="/pricing" className="text-sm font-bold text-primary hover:underline">Compare all plans →</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.slice(0, 3).map((p) => <PlanCard key={p.name} plan={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-3xl font-extrabold md:text-4xl">From idea to your next service.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-border p-7">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-brand font-extrabold text-primary-foreground">{i + 1}</div>
              <h3 className="mt-5 font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-primary/40 bg-hero bg-surface p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">Have a project in mind?</h2>
            <p className="mt-2 text-muted-foreground">Tell us what you need before choosing a service.</p>
          </div>
          <BuyButton href={links.contact} variant="ghost">Contact TechTrac</BuyButton>
        </div>
      </section>
    </>
  );
}
