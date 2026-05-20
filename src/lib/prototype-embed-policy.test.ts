import assert from "node:assert/strict";
import test from "node:test";
import {
  getSupportedPrototypeEmbedOrigins,
  isPrototypeOriginAllowlisted,
  normalizeOriginList,
  shouldMountHostedPrototype,
} from "./prototype-embed-policy.ts";

test("normalizeOriginList trims, deduplicates, and removes trailing slashes", () => {
  assert.deepEqual(
    normalizeOriginList([
      " https://danilocallejas.com/ ",
      "https://danilocallejas.com",
      "http://localhost:3000/",
    ]),
    ["https://danilocallejas.com", "http://localhost:3000"],
  );
});

test("supported origins include production and custom domains", () => {
  const origins = getSupportedPrototypeEmbedOrigins();

  assert.ok(origins.includes("https://danilo-callejas-portfolio.vercel.app"));
  assert.ok(origins.includes("https://danilocallejas.com"));
  assert.ok(origins.includes("https://www.danilocallejas.com"));
});

test("allowlist checks production, localhost, and unsupported origins", () => {
  const origins = getSupportedPrototypeEmbedOrigins();

  assert.equal(
    isPrototypeOriginAllowlisted("https://danilocallejas.com", origins),
    true,
  );
  assert.equal(
    isPrototypeOriginAllowlisted(
      "https://danilo-callejas-portfolio.vercel.app",
      origins,
    ),
    true,
  );
  assert.equal(
    isPrototypeOriginAllowlisted("http://localhost:3000", origins),
    true,
  );
  assert.equal(
    isPrototypeOriginAllowlisted("https://example.com", origins),
    false,
  );
});

test("shouldMountHostedPrototype only mounts when lifecycle, config, and origin allow it", () => {
  assert.equal(
    shouldMountHostedPrototype({
      sourceType: "iframe",
      status: "published",
      allowPreviewEmbed: true,
      embedUrl:
        "https://danilo-callejas-portfolio.vercel.app/embedded-prototypes/player-pages",
      currentOrigin: "https://danilocallejas.com",
    }),
    true,
  );

  assert.equal(
    shouldMountHostedPrototype({
      sourceType: "iframe",
      status: "published",
      allowPreviewEmbed: true,
      embedUrl:
        "https://danilo-callejas-portfolio.vercel.app/embedded-prototypes/player-pages",
      currentOrigin: "https://example.com",
    }),
    false,
  );

  assert.equal(
    shouldMountHostedPrototype({
      sourceType: "iframe",
      status: "local-preview",
      allowPreviewEmbed: true,
      embedUrl:
        "https://danilo-callejas-portfolio.vercel.app/embedded-prototypes/player-pages",
      currentOrigin: "https://danilocallejas.com",
    }),
    false,
  );

  assert.equal(
    shouldMountHostedPrototype({
      sourceType: "iframe",
      status: "blocked",
      allowPreviewEmbed: true,
      embedUrl:
        "https://danilo-callejas-portfolio.vercel.app/embedded-prototypes/player-pages",
      currentOrigin: "https://danilocallejas.com",
    }),
    false,
  );
});

test("main Vercel alias mounts live embeds once same-origin routes are published", () => {
  assert.equal(
    shouldMountHostedPrototype({
      sourceType: "iframe",
      status: "published",
      allowPreviewEmbed: true,
      embedUrl:
        "https://danilo-callejas-portfolio.vercel.app/embedded-prototypes/opendoor-home-insights",
      currentOrigin: "https://danilo-callejas-portfolio.vercel.app",
    }),
    true,
  );

  assert.equal(
    shouldMountHostedPrototype({
      sourceType: "iframe",
      status: "published",
      allowPreviewEmbed: true,
      embedUrl:
        "https://danilo-callejas-portfolio.vercel.app/embedded-prototypes/draftkings-global-switcher",
      currentOrigin: "https://danilo-callejas-portfolio.vercel.app",
    }),
    true,
  );

});
