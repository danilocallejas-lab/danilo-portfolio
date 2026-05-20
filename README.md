This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Prototype Embed Contract

Hosted portfolio prototypes must use the shared origin contract in
[`src/lib/prototype-embed-policy.ts`](/Users/redeemer/Desktop/danilo-portfolio/src/lib/prototype-embed-policy.ts).
The portfolio only mounts live iframes for prototypes marked `published`.
Everything else stays visible as a curated fallback instead of showing a broken
Vercel frame.

The full portfolio-only publishing and placeholder contract lives in
[`docs/prototype-embed-contract.md`](/Users/redeemer/Desktop/danilo-portfolio/docs/prototype-embed-contract.md).
Use it before changing prototype deployment, iframe headers, gallery cards, or
placeholder rebuild status.

Standalone prototype Vercel projects have been retired. Keep public prototype
embeds same-origin under `/embedded-prototypes/<slug>` inside this portfolio.
Active prototype source folders live under
`/Users/redeemer/Desktop/danilo-prototypes` and are rebuilt into this portfolio
before deployment.
The retirement record lives in
[`docs/vercel-prototype-retirement-manifest.md`](/Users/redeemer/Desktop/danilo-portfolio/docs/vercel-prototype-retirement-manifest.md).

For the plain-English publishing flow, use
[`docs/prototype-publishing-checklist.md`](/Users/redeemer/Desktop/danilo-portfolio/docs/prototype-publishing-checklist.md).
During the rebuild, `danilo-callejas-portfolio.vercel.app` is the Vercel test
home and `danilocallejas.com` can keep serving Cargo until launch.

Build and audit same-origin static prototype artifacts with:

```bash
npm run build:embedded-prototypes
npm run audit:embedded-prototypes
```

### Local Prototype Embeds

Run the portfolio and configured local prototype apps together:

```bash
npm run dev:prototypes
```

Then verify the local iframe path:

```bash
npm run audit:prototype-embeds:local
```

Local mode uses the same portfolio frame UI, but swaps eligible prototype iframe
URLs to `http://localhost:<port>`. Production builds never use local iframe URLs.

### Vercel Project Guardrail

The intended Vercel account shape is one public project:
`danilo-callejas-portfolio`.

```bash
npm run audit:vercel-project-fat
```

This fails if retired standalone prototype projects reappear.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
