import { describe, expect, it } from "vitest";
import { availabilityStatus, domainSchema } from "../lib/domains";

describe("domain lookup", () => {
  it("accepts full UK domain names and normalizes case", () => { expect(domainSchema.parse(" TechTrac.CO.UK ")).toBe("techtrac.co.uk"); });
  it("rejects URLs, paths, IPs, and local names", () => { for (const input of ["https://example.com", "example.com/path", "127.0.0.1", "localhost", "host.internal"]) expect(domainSchema.safeParse(input).success).toBe(false); });
  it("reports only explicit supplier availability as available", () => { expect(availabilityStatus("AVAILABLE")).toBe("available"); expect(availabilityStatus("NOTAVAILABLE")).toBe("taken"); expect(availabilityStatus("ERROR")).toBe("unknown"); });
});
import { retailPrice as rp } from "@/lib/domains";
describe("retail price", () => {
  it("adds 10% to supplier cost", () => { expect(rp(11.08, "USD")?.amount).toBe(12.19); expect(rp(9.99, "USD")?.amount).toBe(10.99); expect(rp(10, "USD")?.amount).toBe(11); });
  it("rejects missing cost", () => { expect(rp(undefined, "USD")).toBeNull(); expect(rp(0, "USD")).toBeNull(); });
});
