# Prototype Embed Contract

This portfolio is the primary gallery for interactive product prototypes.

## Architecture

- The portfolio lives in `/Users/redeemer/Desktop/danilo-portfolio` and deploys to the `danilo-callejas-portfolio` Vercel project.
- Active prototype source folders live under `/Users/redeemer/Desktop/danilo-prototypes`, grouped by company, while published artifacts live inside the portfolio under `public/embedded-prototypes`.
- `danilo-callejas-portfolio` is the only public Vercel project for portfolio prototype publishing.
- Public prototypes should be rebuilt into this portfolio under `/embedded-prototypes/<slug>`, even when the source files live inside a DraftKings, Opendoor, Coinbase, Dropbox, or standalone local work bucket.
- The portfolio embeds published same-origin prototypes with iframes and falls back to a shared static preview treatment for prototypes that are not rebuilt into the portfolio yet.
- Do not create empty external apps only to satisfy placeholders. Use the registry backlog until a real rebuild exists.
- `https://danilo-callejas-portfolio.vercel.app` is the active test home for the new portfolio until the custom domain moves off Cargo.
- `https://danilocallejas.com` and `https://www.danilocallejas.com` are future portfolio domains for this contract, but they may still serve Cargo during the rebuild.
- Former standalone prototype projects are retired. See `docs/vercel-prototype-retirement-manifest.md`.

## Portfolio Registry

The source of truth is `src/lib/portfolio-content.ts`.

Every project prototype must have:

- `lifecycle`: `planned`, `local-preview`, `published`, or `blocked`.
- `embedUrl`: same-origin production iframe URL only after the portfolio-hosted prototype passes embed checks.
- `openUrl`: same-origin direct prototype URL only after the portfolio-hosted prototype is usable in production.
- `fallbackComponent`: the legacy preview-family identifier used for loading labels and tone, even when the shared placeholder image is shown instead of a live iframe.
- `deployment`: future portfolio publication target, expected same-origin URL, source workspace, and health path.
- `retiredDeployment`: historical Vercel project metadata for retired standalone projects. This is recordkeeping only and must not drive active embeds.
- `localDev`: local workspace, fixed port, path, and start command used by `NEXT_PUBLIC_PROTOTYPE_EMBED_MODE=local`.
- `backlog`: required for placeholders and local previews so future work knows where the prototype is going.

Use these lifecycle meanings:

- `published`: the same-origin production iframe has passed real-browser embed checks on the Vercel portfolio.
- `local-preview`: the portfolio intentionally renders the curated local fallback while a same-origin rebuild is pending.
- `planned`: the project has a reserved slug and deployment target but no useful local preview yet.
- `blocked`: a live route exists but should not iframe until a concrete blocking issue is fixed.

A production URL alone is not enough to set `published`. Retired standalone Vercel URLs are useful historical artifacts, but they are not portfolio embed targets.

## Local Embed Mode

Local embed mode is for building and reviewing prototypes before the public Vercel iframe is safe.

- Start it with `npm run dev:prototypes`.
- The portfolio runs with `NEXT_PUBLIC_PROTOTYPE_EMBED_MODE=local`.
- Any project with a `localDev` target can iframe its `http://localhost:<port>` app in the same `DemoFrame` UI.
- Local mode is disabled in production builds, even if the env var is set.
- Blocked public embeds can still be live locally; this is expected and is the main way to keep building without waiting on Vercel protection settings.
- Portfolio-published phone prototypes should render in `phone-only` mode: keep the handset shell and in-phone chrome, but make everything outside the phone transparent.

## Iframe Policy

Production embeds should be same-origin portfolio routes under `/embedded-prototypes/<slug>`. If a future route needs explicit frame policy, allow only the portfolio and local development origins.

Required `frame-ancestors` parents:

- `'self'`
- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3001`
- `http://localhost:3002`
- `http://127.0.0.1:3002`
- `https://danilo-callejas-portfolio.vercel.app`
- `https://danilocallejas.com`
- `https://www.danilocallejas.com`

Do not add `X-Frame-Options` to portfolio-hosted prototype routes.

## Publish Checklist

Before changing a portfolio entry to `published`:

1. Build or verify the prototype locally.
2. Move the public version into the portfolio under `/embedded-prototypes/<slug>`.
3. Deploy the portfolio to production.
4. Run `curl -I -L <portfolio-production-url>/embedded-prototypes/<slug>`.
5. Confirm the response is `200` and does not add frame-blocking headers.
6. Open the Vercel portfolio project page and verify the iframe mounts without a CSP or frame error.
7. Update `embedUrl`, `openUrl`, `lifecycle`, `deployment`, and `backlog` in `src/lib/portfolio-content.ts`.

The plain-English workflow is: build locally, move the public prototype into the portfolio, deploy the portfolio, confirm the same-origin route opens, add or update the portfolio entry, then verify the iframe inside the portfolio.

## Current Deployment Truth

- Same-origin artifacts built into the portfolio: Opendoor Seller, Opendoor Home Insights, Opendoor Agent Led Offers, DraftKings Betslip Migration, DraftKings Quick Betslip, DraftKings Player Pages, DraftKings Switchers, DraftKings Pools One & Done, DraftKings Player Props, DraftKings Baseball Play by Play, Coinbase Pay Tab, Coinbase Crypto Payroll, and Coinbase Gifting.
- Local preview only: Coinbase Instant Sell and the Dropbox archive projects.
- Remaining local previews should keep the shared placeholder treatment until a real same-origin rebuild exists.

All DraftKings, Opendoor, Coinbase, and Dropbox prototypes belong under the portfolio work. The lifecycle only says whether that specific prototype can safely mount as a live same-origin iframe today.

## Vercel Protection Checks

Separate public Vercel prototype projects are retired because direct URLs can work while iframe requests still show `403` from Vercel protection. Do not solve this by creating more standalone projects.

- Keep retired standalone project names out of the account. Run `npm run audit:vercel-project-fat`.
- If a new Vercel project is needed for a non-portfolio reason, document why it is not a portfolio prototype.
- A failing retired iframe response with `x-vercel-mitigated: deny` is historical context, not a reason to republish the retired app.
- Vercel documents automatic DDoS mitigation on all plans, System Bypass Rules for Pro/Enterprise, and `x-vercel-protection-bypass` for automation-only checks:
  - https://vercel.com/docs/vercel-firewall/ddos-mitigation
  - https://vercel.com/changelog/improvements-to-vercel-firewall-system-bypass-rules
  - https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation

## Same-Origin Public Embed Path

The no-paid public path is to move public embeds under the portfolio domain over time:

- Use `/embedded-prototypes/<slug>` for portfolio-hosted prototype artifacts or integrated routes.
- Static/exportable prototypes can be copied into the portfolio deployment.
- Prototypes that need app code can become portfolio routes/components.
- Once a same-origin route exists and passes browser checks, update the registry URL and mark the prototype `published`.
- Mobile artifacts under `/embedded-prototypes/<slug>` should not include a standalone review-stage background around the phone.

## Future UI Work

When refining UI, animation, layout, or content in any prototype:

- Preserve the iframe header contract.
- Preserve the stable production route unless intentionally changing the portfolio registry.
- Keep embed-friendly query paths such as `?embed=1` when the app uses a special framed presentation mode.
- Re-run the publish checklist after changes that affect routing, Vercel config, headers, or app shell layout.
