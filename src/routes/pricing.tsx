import { createFileRoute } from "@tanstack/react-router";
import { BuyButton, Eyebrow, PlanGrid } from "@/components/site/Layout";
import { links } from "@/lib/site";
import { DomainSearch } from "@/components/site/DomainSearch";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Hosting Plans & Pricing — TechTrac LTD" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "description", content: "Compare TechTrac App Hosting and VPS plans from £3.00 GBP per month." },
      { property: "og:title", content: "Hosting Plans & Pricing — TechTrac LTD" },
      { property: "og:description", content: "App Hosting and VPS plans from £3.00 GBP per month." },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-6xl px-5 pt-20 text-center">
        <Eyebrow>Plans & Pricing</Eyebrow>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">Simple, <span className="text-brand">monthly</span> pricing.</h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Review available cycles, setup charges and applicable taxes in the order summary before checkout.</p>
      </section>
      <DomainSearch />
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <h2 className="mb-6 text-xl font-bold">App Hosting</h2>
        <PlanGrid filter="App Hosting" />
        <h2 className="mb-6 mt-16 text-xl font-bold">VPS Hosting</h2>
        <PlanGrid filter="VPS" />
        <div className="mt-14 text-center">
          <BuyButton href={links.store} variant="ghost">View the complete catalogue →</BuyButton>
        </div>
      </section>
    </div>
  );
}
