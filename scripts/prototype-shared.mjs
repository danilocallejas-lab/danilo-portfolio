import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export function getSlugFilter(argv = process.argv) {
  const slugFlagIndex = argv.indexOf("--slug");

  if (slugFlagIndex !== -1) {
    const slug = argv[slugFlagIndex + 1];

    if (!slug || slug.startsWith("--")) {
      throw new Error("--slug requires a prototype slug");
    }

    return slug;
  }

  const slugEqualsArg = argv.find((arg) => arg.startsWith("--slug="));

  if (slugEqualsArg) {
    const slug = slugEqualsArg.slice("--slug=".length);

    if (!slug) {
      throw new Error("--slug requires a prototype slug");
    }

    return slug;
  }

  return null;
}

export function findCachedPlaywrightPackages() {
  const npxCacheDir = join(homedir(), ".npm", "_npx");

  if (!existsSync(npxCacheDir)) {
    return [];
  }

  return readdirSync(npxCacheDir)
    .map((entry) => join(npxCacheDir, entry, "node_modules", "playwright"))
    .filter((packageDir) => existsSync(join(packageDir, "package.json")));
}

export async function loadPlaywright({
  errorMessage = "Playwright is not available. Install it or set PLAYWRIGHT_PACKAGE_DIR.",
} = {}) {
  try {
    return await import("playwright");
  } catch {
    // Codex workspaces often have Playwright in the npx cache.
  }

  const candidates = [
    process.env.PLAYWRIGHT_PACKAGE_DIR,
    ...findCachedPlaywrightPackages(),
  ].filter(Boolean);

  for (const packageDir of candidates) {
    const modulePath = join(packageDir, "index.mjs");

    if (existsSync(modulePath)) {
      return import(pathToFileURL(modulePath).href);
    }
  }

  throw new Error(errorMessage);
}

export function sameFrameUrl(candidateUrl, expectedUrl, baseUrl) {
  try {
    const candidate = new URL(candidateUrl, baseUrl);
    const expected = new URL(expectedUrl, baseUrl);

    return (
      candidate.origin === expected.origin &&
      candidate.pathname === expected.pathname &&
      candidate.search === expected.search
    );
  } catch {
    return false;
  }
}

export function responseBelongsToEmbed(responseUrl, expectedUrl, baseUrl) {
  try {
    const response = new URL(responseUrl, baseUrl);
    const expected = new URL(expectedUrl, baseUrl);
    const expectedDirectory = expected.pathname.endsWith("/")
      ? expected.pathname
      : `${expected.pathname}/`;

    return (
      response.origin === expected.origin &&
      (response.pathname === expected.pathname ||
        response.pathname.startsWith(expectedDirectory))
    );
  } catch {
    return false;
  }
}

export async function getEmbeddedFrameHandle(
  page,
  expectedUrl,
  { baseUrl, timeoutMs = 15000 } = {},
) {
  const deadline = Date.now() + timeoutMs;
  const expected = new URL(expectedUrl, baseUrl);

  while (Date.now() < deadline) {
    const handles = await page.locator("iframe").elementHandles();

    for (const handle of handles) {
      const src = await handle.getAttribute("src");

      if (src && sameFrameUrl(src, expected.href, baseUrl)) {
        return handle;
      }
    }

    await page.waitForTimeout(250);
  }

  throw new Error(`Timed out waiting for iframe ${expected.pathname}`);
}

export async function getEmbeddedFrameText(
  iframeHandle,
  expectedUrl,
  { timeoutMs = 15000 } = {},
) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const frame = await iframeHandle.contentFrame();

    if (frame) {
      return frame.locator("body").innerText({ timeout: 5000 });
    }

    await iframeHandle.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 250)),
    );
  }

  throw new Error(`Timed out waiting for iframe content from ${expectedUrl}`);
}
