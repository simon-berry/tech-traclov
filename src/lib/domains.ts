import { z } from "zod";

export const domainSchema = z.string().trim().toLowerCase().max(253).refine((value) => {
  const labels = value.split(".");
  return labels.length >= 2 && labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) && /^[a-z]{2,63}$/.test(labels[labels.length - 1] ?? "") && !/\.(local|localhost|internal|test|invalid)$/.test(value);
}, "Enter a full domain name, such as yourbusiness.co.uk, without https:// or a path.");

export function availabilityStatus(status: unknown): "available" | "taken" | "unknown" {
  if (status === "AVAILABLE") return "available";
  if (status === "NOTAVAILABLE") return "taken";
  return "unknown";
}

export const MARKUP = 0.1;
export type Price = { amount: number; currency: string; years: number };
/** Customer price = supplier cost + 10%, rounded up to the cent. */
export function retailPrice(cost: unknown, currency: unknown, years: unknown = 1): Price | null {
  if (typeof cost !== "number" || !Number.isFinite(cost) || cost <= 0 || typeof currency !== "string") return null;
  return { amount: Math.ceil(Math.round(cost * (1 + MARKUP) * 1e6) / 1e4) / 100, currency, years: typeof years === "number" && years > 0 ? years : 1 };
}
export function formatPrice(p: Price) {
  return `${new Intl.NumberFormat("en-GB", { style: "currency", currency: p.currency }).format(p.amount)}${p.years === 1 ? "/year" : ` for ${p.years} years`}`;
}
export type SslProduct = { name: string; vendor: string; validation: string; wildcard: boolean; multiDomain: boolean; price: Price | null };
export type DomainResult = { domain: string; status: "available" | "taken" | "unknown"; premium: boolean; price: Price | null };