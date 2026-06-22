import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  embeddedPrototypeTargets,
  retiredPrototypeHosts,
} from "./embedded-prototype-manifest.mjs";
import { getSlugFilter } from "./prototype-shared.mjs";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const embeddedRoot = join(repoRoot, "public", "embedded-prototypes");
const textFilePattern =
  /\.(?:css|html|js|json|map|mjs|svg|txt|webmanifest|xml)$/i;

function walkFiles(root) {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root).flatMap((entry) => {
    const path = join(root, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      return walkFiles(path);
    }

    return [path];
  });
}

function getEntryHtmlPath(target) {
  const entryWithoutQuery = target.entryPath.split("?")[0] || "/";
  const cleanEntry = entryWithoutQuery.replace(/^\/+|\/+$/g, "");

  if (!cleanEntry) {
    return join(embeddedRoot, target.slug, "index.html");
  }

  if (cleanEntry.endsWith(".html")) {
    return join(embeddedRoot, target.slug, cleanEntry);
  }

  return join(embeddedRoot, target.slug, cleanEntry, "index.html");
}

function findBadReferences(root) {
  const badReferences = [];
  const files = walkFiles(root).filter((file) => textFilePattern.test(file));
  const retiredHostPattern = new RegExp(retiredPrototypeHosts.join("|"), "i");

  for (const file of files) {
    if (file.includes("/_next/static/chunks/polyfills-")) {
      continue;
    }

    const text = readFileSync(file, "utf8");

    if (/localhost|127\.0\.0\.1/i.test(text)) {
      badReferences.push(`${file}: references localhost`);
    }

    if (retiredHostPattern.test(text)) {
      badReferences.push(`${file}: references a retired Vercel prototype host`);
    }

    if (/(?:src|href)=["']\/(?:_next|_expo|assets|figma)\b/i.test(text)) {
      badReferences.push(`${file}: contains a root-relative asset URL`);
    }
  }

  return badReferences;
}

function main() {
  const slugFilter = getSlugFilter();
  const targets = slugFilter
    ? embeddedPrototypeTargets.filter((target) => target.slug === slugFilter)
    : embeddedPrototypeTargets;

  if (slugFilter && targets.length === 0) {
    throw new Error(`Unknown embedded prototype slug: ${slugFilter}`);
  }

  const failures = [];
  const rows = [];

  for (const target of targets) {
    const root = join(embeddedRoot, target.slug);
    const entryHtml = getEntryHtmlPath(target);
    const exists = existsSync(root);
    const entryExists = existsSync(entryHtml);

    if (!exists) {
      failures.push(`${target.slug}: missing artifact directory`);
    }

    if (!entryExists) {
      failures.push(`${target.slug}: missing entry HTML ${entryHtml}`);
    }

    if (exists) {
      failures.push(...findBadReferences(root).map((issue) => `${target.slug}: ${issue}`));
    }

    rows.push({
      slug: target.slug,
      type: target.type,
      artifact: exists ? "ok" : "missing",
      entry: entryExists ? "ok" : "missing",
    });
  }

  console.table(rows);

  if (failures.length > 0) {
    console.error("\nEmbedded prototype artifact audit failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `\nEmbedded prototype artifact audit passed for ${targets.length} prototype(s).`,
  );
}

try {
  main();
} catch (error) {
  console.error(`\nEmbedded prototype artifact audit failed: ${error.message}`);
  process.exitCode = 1;
}
