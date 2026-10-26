import { z } from "zod";

export const automationInput = z.object({ description: z.string().trim().min(20, "Add a little more detail (at least 20 characters).").max(3000, "Keep your description under 3,000 characters.") });

export type PlannerEvent = { type: "text" | "reasoning" | "error" | "done"; text?: string };

export function parsePlannerEvents(buffer: string): { events: PlannerEvent[]; remaining: string } {
  const lines = buffer.split("\n");
  const remaining = lines.pop() ?? "";
  const events = lines.filter(Boolean).map((line) => JSON.parse(line) as PlannerEvent);
  return { events, remaining };
}