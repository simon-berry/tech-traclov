import { availabilityStatus, retailPrice, type DomainResult, type SslProduct } from "./domains";

/** Live USD->GBP rate (ECB via Frankfurter), cached for an hour. Null if unavailable. */
let fx: { rate: number; at: number } | null = null;
async function usdToGbp(): Promise<number | null> {
  if (fx && Date.now() - fx.at < 3_600_000) return fx.rate;
  try {
    const r = await fetch("https://api.frankfurter.dev/v1/latest?from=USD&to=GBP");
    const rate = r.ok ? (await r.json())?.rates?.GBP : null;
    if (typeof rate === "number" && rate > 0) { fx = { rate, at: Date.now() }; return rate; }
  } catch { /* fall through */ }
  return fx?.rate ?? null;
}
async function gbp(cost: unknown, currency: unknown, years: unknown) {
  if (currency === "GBP") return retailPrice(cost, "GBP", years);
  if (currency !== "USD" || typeof cost !== "number") return null;
  const rate = await usdToGbp();
  return rate ? retailPrice(cost * rate, "GBP", years) : null;
}

async function supplier(path: string, body?: object) {
  const reseller = process.env["DOMAINNAMEAPI_RESELLER_ID"];
  const key = process.env["DOMAINNAMEAPI_API_KEY"];
  if (!reseller || !key) return { error: "Domain checks are not connected yet." };
  try {
    const response = await fetch(`https://api.domainresellerapi.com/api/v1/${path}`, { method: body ? "POST" : "GET", headers: { "__reseller": reseller, "X-API-KEY": key, "Content-Type": "application/json" }, ...(body ? { body: JSON.stringify(body) } : {}) });
    if (!response.ok) {
      console.error("Domain supplier HTTP status", response.status);
      return { error: response.status === 429 ? "Domain checks are busy. Please try again later." : "The domain supplier could not complete this check. Please try again later." };
    }
    return { data: await response.json() };
  } catch { return { error: "The domain supplier is temporarily unreachable." }; }
}

export async function lookupDomain(domain: string): Promise<{ result?: DomainResult; error?: string }> {
  const response = await supplier("domains/search", { domainName: domain });
  if (response.error) return { error: response.error };
  const data = response.data;
  if (data?.success !== true || !data.info) return { error: "Availability could not be confirmed for this domain." };
  return { result: { domain, status: availabilityStatus(data.info.status), premium: data.info.isPremium === true, price: data.info.isPremium === true ? null : await gbp(data.info.price, data.info.currency, data.info.period) } };
}

export async function sslProducts(): Promise<{ products?: SslProduct[]; error?: string }> {
  const response = await supplier("products/ssls?MaxResultCount=100");
  if (response.error) return { error: response.error };
  if (!Array.isArray(response.data?.items)) return { error: "SSL products could not be retrieved." };
  // Only the marked-up customer price leaves the server; supplier costs never do.
  type Item = { name?: string; vendorName?: string; validationType?: string; isWildcard?: boolean; isMultiDomain?: boolean; prices?: { priceGroup?: string; create?: { period?: number; price?: number; currency?: string }[] }[] };
  return { products: await Promise.all((response.data.items as Item[]).filter((item) => typeof item.name === "string").map(async (item) => {
    const cost = item.prices?.find((p) => p.priceGroup === "Reseller")?.create?.find((c) => c.period === 1);
    return { name: item.name as string, vendor: item.vendorName ?? "", validation: item.validationType ?? "", wildcard: item.isWildcard === true, multiDomain: item.isMultiDomain === true, price: await gbp(cost?.price, cost?.currency, 1) };
  })) };
}