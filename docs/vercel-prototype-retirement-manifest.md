# Vercel Prototype Retirement Manifest

This portfolio now uses a portfolio-only public publishing model.

Keep `danilo-callejas-portfolio` as the only public Vercel project. The retired projects below were useful while diagnosing iframe protection issues, but they should not be redeployed or recreated. Their local source folders remain the working copies for local review and future same-origin migration into `/embedded-prototypes/<slug>`. Active source folders are consolidated under `/Users/redeemer/Desktop/danilo-prototypes`.

## Active Project

| Project | Project ID | URL |
| --- | --- | --- |
| `danilo-callejas-portfolio` | `prj_tf149h53SMey59K6A3LzCjVVOCTm` | `https://danilo-callejas-portfolio.vercel.app` |

## Retired Projects

| Retired Vercel project | Project ID | Former URL | Local source |
| --- | --- | --- | --- |
| `danilo-portfolio-embed-fallback-20260507` | `prj_YeA4iYYG733SoRBC6ou7Cyr41gOX` | `https://danilo-portfolio-embed-fallback-2-danilocallejas-3477s-projects.vercel.app` | Portfolio experiment only |
| `opendoor-seller-prototype` | `prj_5eLbj0ALXp09kKJiLapvpXjeUwLJ` | `https://opendoor-seller-prototype.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/opendoor/seller-experience` |
| `opendoor-home-insights-prototype` | `prj_z6VoTu6RUfvORlM3sYbN4g8IHo2i` | `https://opendoor-home-insights-prototype.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/opendoor/home-insights` |
| `opendoor-agent-led-offers-prototype` | `prj_o9BomcXNbzUQQz0tHbcmSig03LZ2` | `https://opendoor-cargo-prototype.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/opendoor/agent-led-offers-tooling-platform/web` |
| `draftkings-quick-betslip` | `prj_Pu7AV9QpAYlicnAJrIPeOu8k6AVv` | `https://draftkings-quick-betslip.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/draftkings/quick-betslip` |
| `player-pages` | `prj_q9Rz8NlyxM2hvMx38EwIJdAzprTX` | `https://player-pages.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/draftkings/player-pages` |
| `draftkings-switchers-prototype` | `prj_EDwFg9BXM3jZ4C5AklOTqwKmKmVH` | `https://draftkings-switchers-prototype.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/draftkings/global-switcher` |
| `draftkings-betslip-migration` | `prj_iGOknQ4s7aqjkPrHXoSJUPkweNoa` | `https://draftkings-betslip-migration.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/draftkings/betslip-redesign-migration` |
| `draftkings-pools-one-and-done` | `prj_TXH7llDjbUIwUSeWh09OGPnVNJkv` | `https://draftkings-pools-one-and-done.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/draftkings/pools-one-and-done` |
| `draftkings-player-props` | `prj_lmsH9wFugqM55nKhHuqof4t49p81` | `https://draftkings-player-props.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/draftkings/player-props-stats-scores` |
| `draftkings-baseball-play-by-play` | `prj_5145Vnt8UInjxB6iZwxhf67seZpE` | `https://draftkings-baseball-play-by-play.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/draftkings/baseball-play-by-play` |
| `react-native-app` | `prj_aCpJCOd9dqOWz99A8KbIdYLJNQf4` | `https://react-native-app-rho.vercel.app` | `/Users/redeemer/Desktop/danilo-prototypes/coinbase/pay-tab/react-native-app` |

## Guardrail

Run this from the portfolio repo before publishing:

```bash
npm run audit:vercel-project-fat
```

The audit fails if any retired project is present or if any Vercel project other than `danilo-callejas-portfolio` exists in the active scope.
