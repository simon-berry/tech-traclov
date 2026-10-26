import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Copy, Check, Square, Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { automationInput, parsePlannerEvents } from "@/lib/automation";
import { Eyebrow, BuyButton } from "./Layout";
import { links } from "@/lib/site";

export function AutomationPlanner() {
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [copied, setCopied] = useState(false);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);

  async function generate(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    const input = automationInput.safeParse({ description });
    if (!input.success) { setError(input.error.issues[0]?.message ?? "Add more detail."); return; }
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true); setAnswer(""); setReasoning(""); setError(""); setStopped(false); setCopied(false);
    try {
      const response = await fetch("/api/public/automation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input.data), signal: abort.signal });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error ?? "The AI helper is unavailable."); }
      if (!response.body) throw new Error("The AI helper returned no suggestion.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let completed = false;
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });
        const parsed = parsePlannerEvents(buffer);
        buffer = parsed.remaining;
        for (const item of parsed.events) {
          if (item.type === "text") setAnswer((value) => value + (item.text ?? ""));
          if (item.type === "reasoning") setReasoning((value) => value + (item.text ?? ""));
          if (item.type === "error") { setError(item.text ?? "The suggestion could not be completed."); completed = true; }
          if (item.type === "done") completed = true;
        }
      }
      if (!completed) throw new Error("The connection ended before the suggestion finished.");
    } catch (failure) {
      if (abort.signal.aborted) setStopped(true);
      else setError(failure instanceof Error ? failure.message : "The AI helper is unavailable.");
    } finally { setBusy(false); controller.current = null; }
  }

  return <section id="workflow-planner" className="mx-auto max-w-6xl px-5 pt-24">
    <Eyebrow>AI-powered / n8n</Eyebrow>
    <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Plan your automation</h2>
    <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_1.25fr]">
      <form onSubmit={generate} className="space-y-4">
        <label htmlFor="automation-description" className="block text-sm font-bold">What would you like to automate?</label>
        <Textarea id="automation-description" value={description} onChange={(event) => setDescription(event.target.value)} disabled={busy} maxLength={3000} placeholder="When a customer submits my website form, add them to HubSpot and notify my team in Slack…" className="min-h-44 bg-surface leading-relaxed" aria-describedby="planner-privacy" />
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground"><p id="planner-privacy">Don’t include passwords, API keys, or personal data.</p><span className="shrink-0">{description.length}/3000</span></div>
        <div className="flex gap-3">
          <Button type="submit" disabled={busy || !description.trim()} size="lg" className="font-bold"><Sparkles />Suggest workflow<ArrowRight /></Button>
          {busy && <Button type="button" variant="outline" onClick={() => { controller.current?.abort(); setStopped(true); }}><Square />Stop</Button>}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">AI-generated guidance, not a deployed workflow. Verify nodes, access, and third-party costs before building.</p>
      </form>
      <div className="min-h-64 min-w-0 border-l border-border pl-6" aria-busy={busy}>
        <div className="mb-5 flex items-center justify-between gap-3"><h3 className="font-bold">Your workflow outline</h3>{answer && <Button variant="ghost" size="icon" title="Copy workflow outline" aria-label="Copy workflow outline" onClick={async () => { try { await navigator.clipboard.writeText(answer); setCopied(true); } catch { setError("Copy is unavailable in this browser."); } }}>{copied ? <Check /> : <Copy />}</Button>}</div>
        {busy && <p role="status" className="mb-4 flex items-center gap-2 text-sm text-primary"><LoaderCircle className="motion-safe:animate-spin" />{answer ? "Writing your outline…" : "Planning your workflow…"}</p>}
        {reasoning && <details className="mb-4 text-xs text-muted-foreground"><summary className="cursor-pointer">Planning notes</summary><p className="mt-2 whitespace-pre-wrap">{reasoning}</p></details>}
        {!answer && !busy && !error && !stopped && <div className="flex items-start gap-3 text-muted-foreground"><img src="/logos/n8n.svg" alt="" className="h-8 w-8" /><p className="text-sm">Your idea. A trigger. A connected workflow.</p></div>}
        {answer && <div className="workflow-answer break-words text-sm leading-relaxed"><ReactMarkdown>{answer}</ReactMarkdown></div>}
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        {stopped && <p role="status" className="mt-4 text-sm text-muted-foreground">Stopped — your partial outline is kept.</p>}
        {answer && !busy && !error && !stopped && <div className="mt-6 border-t border-border pt-5"><BuyButton href={links.appHosting} size="sm">Explore n8n hosting</BuyButton></div>}
      </div>
    </div>
  </section>;
}