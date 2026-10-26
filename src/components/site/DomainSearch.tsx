import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Search, Globe, ShieldCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { domainSchema, formatPrice, type DomainResult, type SslProduct } from "@/lib/domains";
import { searchDomain, getSslProducts } from "@/lib/domains.functions";

export function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<DomainResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [products, setProducts] = useState<SslProduct[] | null>(null);
  const [productError, setProductError] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const search = useServerFn(searchDomain);
  const loadProducts = useServerFn(getSslProducts);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    const parsed = domainSchema.safeParse(domain);
    setResult(null); setError("");
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Enter a valid domain."); return; }
    setBusy(true);
    try { const data = await search({ data: { domain: parsed.data } }); if (data.error) setError(data.error); else setResult(data.result ?? null); }
    catch { setError("The domain check could not be completed. Please try again later."); }
    finally { setBusy(false); }
  }
  async function showProducts() {
    if (products || loadingProducts) return;
    setLoadingProducts(true); setProductError("");
    try { const data = await loadProducts(); if (data.error) setProductError(data.error); else setProducts(data.products ?? []); }
    catch { setProductError("SSL products could not be loaded."); }
    finally { setLoadingProducts(false); }
  }

  return <section className="mx-auto max-w-6xl px-5 pt-14" aria-labelledby="domain-search-title">
    <div className="border-y border-border py-8">
      <h2 id="domain-search-title" className="mb-6 text-2xl font-extrabold">Domains & SSL</h2>
      <Tabs defaultValue="domains" onValueChange={(value) => { if (value === "products") void showProducts(); }}>
        <TabsList className="mb-6 h-auto flex-wrap justify-start"><TabsTrigger value="domains"><Globe className="mr-2 h-4 w-4" />Domain search</TabsTrigger><TabsTrigger value="certificate"><ShieldCheck className="mr-2 h-4 w-4" />SSL check</TabsTrigger><TabsTrigger value="products">SSL options</TabsTrigger></TabsList>
        <TabsContent value="domains">
          <form onSubmit={submit} className="max-w-2xl space-y-3">
            <label htmlFor="domain-name" className="block text-sm font-bold">Find your domain</label>
            <div className="flex flex-col gap-3 sm:flex-row"><Input id="domain-name" value={domain} onChange={(event) => setDomain(event.target.value)} placeholder="yourbusiness.co.uk" maxLength={253} autoCapitalize="none" autoCorrect="off" spellCheck={false} className="h-11 bg-surface" /><Button type="submit" disabled={busy || !domain.trim()} className="h-11 shrink-0">{busy ? <LoaderCircle className="motion-safe:animate-spin" /> : <Search />}Check availability</Button></div>
          </form>
          {busy && <p role="status" className="mt-4 text-sm text-muted-foreground">Checking availability…</p>}
          {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
          {result && <div role="status" className="mt-5 border-l-2 border-primary pl-4"><p className="break-all font-bold">{result.domain}</p><p className="mt-1 text-primary">{result.status === "available" ? "Available to register" : result.status === "taken" ? "Already registered" : "Availability not confirmed"}</p>{result.status === "available" && result.price && <p className="mt-2 text-lg font-bold">{formatPrice(result.price)}</p>}{result.premium && <p className="mt-2 text-sm text-muted-foreground">Premium domain — a separate quote is required.</p>}<p className="mt-2 text-xs text-muted-foreground">Availability can change. This check does not reserve the domain.</p></div>}
        </TabsContent>
        <TabsContent value="certificate"><p className="text-sm text-muted-foreground">Certificate checks are awaiting a connected SSL inspection service.</p></TabsContent>
        <TabsContent value="products">
          {loadingProducts && <p role="status" className="text-sm text-muted-foreground">Loading SSL options…</p>}
          {productError && <p role="alert" className="text-sm text-destructive">{productError}</p>}
          {products && <><p className="mb-5 text-sm text-muted-foreground">Prices are per year in GBP, converted at today's exchange rate, and may change. Final price is confirmed at checkout.</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <div key={product.name} className="rounded-md border border-border bg-surface p-5"><p className="text-xs text-muted-foreground">{product.vendor}</p><h3 className="mt-1 font-bold">{product.name}</h3><p className="mt-3 text-sm text-muted-foreground">{[product.validation, product.wildcard ? "Wildcard" : "", product.multiDomain ? "Multi-domain" : ""].filter(Boolean).join(" · ")}</p><p className="mt-4 font-bold">{product.price ? formatPrice(product.price) : "Price on request"}</p></div>)}</div>{products.length === 0 && <p className="text-sm text-muted-foreground">No SSL products were returned.</p>}</>}
        </TabsContent>
      </Tabs>
    </div>
  </section>;
}