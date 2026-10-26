import { createFileRoute, Link } from "@tanstack/react-router";
import { AppMarquee, BuyButton, Eyebrow, PlanGrid } from "@/components/site/Layout";
import { links } from "@/lib/site";

export const Route = createFileRoute("/wordpress-hosting")({
  head: () => ({
    meta: [
      { title: "WordPress Hosting on OpenLiteSpeed | TechTrac LTD" },
      { name: "description", content: "Run WordPress on OpenLiteSpeed with LSCache and Redis object caching. App Hosting plans from £3/month." },
      { property: "og:title", content: "WordPress Hosting on OpenLiteSpeed | TechTrac LTD" },
      { property: "og:description", content: "Deploy OpenLiteSpeed WordPress with LSCache and Redis object caching on a TechTrac App Hosting plan from £3/month." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WordPressHosting,
});

const includes = [
  {
    t: "OpenLiteSpeed WordPress",
    d: "Production-ready WordPress with LSCache and Redis object caching, so pages are served from cache instead of being rebuilt on every visit.",
  },
  {
    t: "Resources you can read",
    d: "Every plan lists its memory, processor, storage and bandwidth. Compare them against your theme, plugins and visitor numbers before ordering.",
  },
  {
    t: "A plan per project",
    d: "App Hosting plans are sold per service and each includes one website. Running several sites or several applications needs a plan that supports it.",
  },
  {
    t: "Domain and certificate",
    d: "Point your domain at the service and add a certificate. Domains and SSL certificates are available through the client area.",
  },
];

const useCases = [
  { n: "Blog or magazine", d: "Content-heavy sites where page caching makes the biggest difference to speed." },
  { n: "Business website", d: "A brochure or company site that needs to stay online and load quickly." },
  { n: "WooCommerce store", d: "Check memory and storage against your catalogue and extensions before choosing a plan." },
  { n: "Agency or client site", d: "One plan per client keeps each site's resources and billing separate." },
];

const faqs = [
  {
    q: "How do I set up WordPress on a plan?",
    a: "Order an App Hosting plan from the store and pick WordPress as the application during configuration. Once the service is ready, point your domain at it and add a certificate from the client area.",
  },
  {
    q: "Can I migrate an existing WordPress site?",
    a: "Moving a site means transferring its files and its database. If your current host can export them, they can be brought over to the new service. Tell us where your site is hosted today and what plugins it uses, and we'll confirm what the move involves before you order.",
  },
  {
    q: "How do backups work?",
    a: "What gets backed up, how often, and how long copies are kept depends on how the service is set up — we'd rather you ask than us guess. Confirm the details for your plan before ordering, and keep your own export before any major change.",
  },
  {
    q: "How are updates handled?",
    a: "WordPress core, theme and plugin updates are applied from your WordPress dashboard as normal. How server-level software such as PHP or the cache stack is updated depends on the service — ask us to confirm before ordering.",
  },
];

function WordPressHosting() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 pb-20 pt-20 md:flex-row md:items-center md:justify-between md:pt-28">
          <div>
            <Eyebrow>WordPress Hosting / TechTrac LTD</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              WordPress, <span className="text-brand">served from cache.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              OpenLiteSpeed WordPress with LSCache and Redis object caching, on an App Hosting plan you can read the specification of. From £3/month.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BuyButton href={links.appHosting}>Configure WordPress hosting</BuyButton>
              <Link to="/pricing" className="inline-flex items-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-bold hover:border-primary">
                Compare plans
              </Link>
            </div>
          </div>
          <div className="grid h-32 w-32 shrink-0 place-items-center rounded-3xl bg-foreground p-7 shadow-glow">
            <img src="/logos/wordpress.svg" alt="WordPress" className="h-full w-full object-contain" />
          </div>
        </div>
      </section>

      <AppMarquee />

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Eyebrow>What's included</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Built around OpenLiteSpeed.</h2>
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
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">What people host on it</h2>
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
          WordPress is one of the applications available on App Hosting. Choose the plan that matches the resources your site needs.
        </p>
        <PlanGrid filter="App Hosting" />
        <p className="mt-4 text-xs text-muted-foreground">Application choice appears during configuration where the plan supports it.</p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="rounded-3xl border border-border bg-surface p-10 text-center">
          <h2 className="text-2xl font-extrabold md:text-3xl">Need the whole server instead?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            A VPS gives you full server access and more room to grow. Compare it with App Hosting, or start with an App Hosting plan and move later.
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
