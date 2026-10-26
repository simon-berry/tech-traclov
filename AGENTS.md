<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The public n8n automation planner uses a same-origin streaming server route with request-scoped Lovable AI Responses helpers; this keeps credentials private and supports cancellation.
- Store AI access blocks in a service-only Cloud table, never worker memory; this prevents blocked requests from restarting after reloads.
- Workflow suggestions are advisory text, not executable workflows or verified hosting promises; this avoids accidental deployment and unsupported claims.

- Domain and SSL supplier queries use validated server functions and the documented DomainNameAPI REST endpoints; project credentials and supplier costs must never enter public responses.
