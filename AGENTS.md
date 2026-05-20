<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio Prototype Publishing Contract

This repo is the primary Vercel-hosted portfolio gallery. Before changing prototype embeds, project cards, Vercel config, or gallery UI behavior, read `docs/prototype-embed-contract.md` and `docs/prototype-publishing-checklist.md`.

Key rules:

- Treat DraftKings, Opendoor, Coinbase, Dropbox, and future prototypes as portfolio work regardless of their source folder shape.
- Keep active prototype source folders under `/Users/redeemer/Desktop/danilo-prototypes`; update the portfolio manifest and registry if a source folder moves.
- Keep `danilo-callejas-portfolio` as the only public Vercel project. Do not create standalone Vercel projects for prototypes.
- Preserve `src/lib/portfolio-content.ts` as the registry for lifecycle, same-origin embed URLs, retired deployment metadata, backlog, local dev targets, and curated fallback behavior.
- Placeholder projects should remain `local-preview` or `planned` until they are rebuilt under `/embedded-prototypes/<slug>` in the portfolio deployment.
- Retired standalone URLs belong only in retirement metadata and docs, never as active `embedUrl` or `openUrl` values.
- Run `npm run audit:vercel-project-fat` before publishing if Vercel projects were created, deleted, or relinked.
- `danilo-callejas-portfolio.vercel.app` is the active Vercel test home. `danilocallejas.com` may still be Cargo until the new portfolio launches.
- Use `NEXT_PUBLIC_PROTOTYPE_EMBED_MODE=local` only for local development. Production must never depend on localhost iframe URLs.
