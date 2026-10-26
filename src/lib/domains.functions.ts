import { createServerFn } from "@tanstack/react-start";
import { domainSchema } from "./domains";

export const searchDomain = createServerFn({ method: "POST" })
  .inputValidator((input: { domain: string }) => ({ domain: domainSchema.parse(input.domain) }))
  .handler(async ({ data }) => {
    const { lookupDomain } = await import("./domains.server");
    return lookupDomain(data.domain);
  });

export const getSslProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { sslProducts } = await import("./domains.server");
  return sslProducts();
});