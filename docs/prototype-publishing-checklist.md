# Prototype Publishing Checklist

Use this checklist for every DraftKings, Opendoor, Coinbase, Dropbox, or future prototype.

The goal is not to choose a repo strategy. The goal is to build locally, review locally, then publish public prototypes inside the portfolio deployment under `/embedded-prototypes/<slug>`.

## The Simple Flow

1. Build the prototype locally.
2. Move or export the public version into the portfolio under `/embedded-prototypes/<slug>`.
3. Deploy the portfolio Vercel project.
4. Open the same-origin prototype route directly.
5. Add or update the prototype entry in the portfolio registry.
6. Open the Vercel portfolio and confirm the iframe loads there.

For the current static-artifact path, run this from the portfolio repo:

```bash
npm run build:embedded-prototypes
npm run audit:embedded-prototypes
```

## Local Review Flow

Use this when a prototype is still local-only or you are actively building it:

```bash
npm run dev:prototypes
npm run audit:prototype-embeds:local
```

`npm run dev:prototypes` starts the portfolio in local embed mode plus the configured prototype dev servers. The portfolio frame stays visually the same, but the iframe source becomes `http://localhost:<port>` instead of the public Vercel URL.

## Portfolio Status Meanings

- `planned`: the idea exists, but the prototype is not built yet.
- `local-preview`: the portfolio shows a curated fallback while the same-origin portfolio version is pending.
- `published`: the same-origin portfolio URL works inside the portfolio iframe in a real browser.
- `blocked`: a live route exists, but headers, routing, or another concrete issue still blocks the embed.

## Do Not Publish Until

- The same-origin prototype route returns `200`.
- The response has no `X-Frame-Options` header.
- Cross-origin exceptions must have a `Content-Security-Policy` with `frame-ancestors` allowing the portfolio; same-origin `/embedded-prototypes/<slug>` routes do not need a separate frame-ancestors header.
- The prototype loads inside `https://danilo-callejas-portfolio.vercel.app`.
- Mobile prototypes render only the handset presentation inside the portfolio, without a standalone review-stage canvas.

Use these commands from the portfolio repo:

```bash
npm run audit:prototype-embeds
PORTFOLIO_BASE_URL=https://danilo-callejas-portfolio.vercel.app npm run audit:prototype-embeds:browser
```

## Cargo Note

`danilocallejas.com` can continue serving the current Cargo site until the new Vercel portfolio is ready. During the rebuild, use `https://danilo-callejas-portfolio.vercel.app` as the live portfolio test home.

## No-Paid Public Path

If separate `*.vercel.app` iframes keep hitting Vercel protection, migrate that prototype into the portfolio deployment under `/embedded-prototypes/<slug>`. Same-origin public embeds avoid the cross-project iframe path that Vercel is currently mitigating.

## Vercel Project Guardrail

Standalone prototype Vercel projects are retired. Before publishing, confirm the account is still lean:

```bash
npm run audit:vercel-project-fat
```
