import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/automation")({
  server: { handlers: { POST: async ({ request }) => {
    const { handleAutomation } = await import("@/lib/automation.server");
    return handleAutomation(request);
  } } },
});