import { describe, expect, it } from "vitest";
import { automationInput, parsePlannerEvents } from "../lib/automation";

describe("automation planner", () => {
  it("accepts a prospective customer's automation description", () => {
    expect(automationInput.parse({ description: "Send website form leads to HubSpot and Slack." }).description).toContain("HubSpot");
  });
  it("rejects empty or oversized input before calling AI", () => {
    expect(automationInput.safeParse({ description: "" }).success).toBe(false);
    expect(automationInput.safeParse({ description: "a".repeat(3001) }).success).toBe(false);
  });
  it("keeps split streaming frames until the next chunk", () => {
    const first = parsePlannerEvents('{"type":"reasoning","text":"Plan"}\n{"type":"te');
    expect(first.events).toEqual([{ type: "reasoning", text: "Plan" }]);
    const second = parsePlannerEvents(first.remaining + 'xt","text":"Webhook"}\n{"type":"done"}\n');
    expect(second.events).toEqual([{ type: "text", text: "Webhook" }, { type: "done" }]);
  });
  it("surfaces terminal error frames separately from suggestions", () => {
    expect(parsePlannerEvents('{"type":"error","text":"Access denied"}\n').events).toEqual([{ type: "error", text: "Access denied" }]);
  });
});