import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  embeddedPrototypeTargets,
  getEmbeddedPrototypeBasePath,
  getEmbeddedPrototypeUrlPath,
} from "./embedded-prototype-manifest.mjs";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const embeddedRoot = join(repoRoot, "public", "embedded-prototypes");
const retiredBuildRoot = "/Users/redeemer/Desktop/.danilo-embedded-build-retired";
const textFilePattern =
  /\.(?:css|html|js|json|map|mjs|svg|txt|webmanifest|xml)$/i;

function run(command, args, options) {
  console.log(`\n> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status}`,
    );
  }
}

function cleanDir(path) {
  rmSync(path, { recursive: true, force: true });
  mkdirSync(path, { recursive: true });
}

function copyDir(source, destination) {
  rmSync(destination, { recursive: true, force: true });
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true });
}

function moveAsideIfExists(path) {
  if (!existsSync(path)) {
    return null;
  }

  const retiredPath = join(
    retiredBuildRoot,
    `${path.split("/").filter(Boolean).pop()}-${Date.now()}`,
  );
  mkdirSync(dirname(retiredPath), { recursive: true });
  renameSync(path, retiredPath);

  return retiredPath;
}

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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function listTopLevelAssetNames(root) {
  return readdirSync(root).filter((entry) => !entry.startsWith("."));
}

function rewriteRootAssetReferences(targetRoot, basePath) {
  const topLevelAssetNames = listTopLevelAssetNames(targetRoot);
  const files = walkFiles(targetRoot).filter((file) => textFilePattern.test(file));

  for (const file of files) {
    const original = readFileSync(file, "utf8");
    let updated = original;

    for (const assetName of topLevelAssetNames) {
      const escaped = escapeRegExp(assetName);
      updated = updated.replace(
        new RegExp(`(?<=[\\s"'(=])/${escaped}(?=([/?#"'\\s)]|$))`, "g"),
        `${basePath}/${assetName}`,
      );
    }

    updated = updated
      .replace(/(?<=\shref=["'])\/(?=["'])/g, `${basePath}/`)
      .replace(/(?<=\ssrc=["'])\/(?=["'])/g, `${basePath}/`);

    if (updated !== original) {
      writeFileSync(file, updated);
    }
  }
}

function ensureIndexFallback(targetRoot) {
  const indexPath = join(targetRoot, "index.html");

  if (existsSync(indexPath)) {
    return;
  }

  const firstHtml = walkFiles(targetRoot).find(
    (file) => file.endsWith("index.html") || file.endsWith(".html"),
  );

  if (firstHtml) {
    copyFileSync(firstHtml, indexPath);
  }
}

function removeDuplicateExportEntries(targetRoot) {
  for (const entry of readdirSync(targetRoot)) {
    if (/ 2(?:\.[^.]+)?$/.test(entry)) {
      rmSync(join(targetRoot, entry), { recursive: true, force: true });
    }
  }
}

function buildNext(target, basePath) {
  moveAsideIfExists(join(target.workspace, ".next"));
  moveAsideIfExists(join(target.workspace, "out"));
  rmSync(join(target.workspace, "out"), { recursive: true, force: true });
  run(join(target.workspace, "node_modules", ".bin", "next"), [
    "build",
    "--webpack",
  ], {
    cwd: target.workspace,
    env: {
      ...process.env,
      EMBEDDED_PROTOTYPE_BASE_PATH: basePath,
      EMBEDDED_PROTOTYPE_EXPORT: "1",
      NEXT_PUBLIC_EMBEDDED_PROTOTYPE_PRESENTATION:
        target.presentation ?? "phone-only",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  });

  const nestedOut = join(target.workspace, "out", "embedded-prototypes", target.slug);
  const outRoot = existsSync(nestedOut) ? nestedOut : join(target.workspace, "out");

  if (!existsSync(outRoot)) {
    throw new Error(`${target.label} did not produce a Next static export`);
  }

  return outRoot;
}

function buildVite(target, basePath) {
  rmSync(join(target.workspace, "dist"), { recursive: true, force: true });
  run("npm", ["run", "build"], {
    cwd: target.workspace,
    env: {
      ...process.env,
      EMBEDDED_PROTOTYPE_BASE_PATH: basePath,
      VITE_EMBEDDED_PROTOTYPE_BASE_PATH: `${basePath}/`,
    },
  });

  const distRoot = join(target.workspace, "dist");

  if (!existsSync(distRoot)) {
    throw new Error(`${target.label} did not produce a Vite dist directory`);
  }

  return distRoot;
}

function buildExpo(target, basePath) {
  const outputDir = join(target.workspace, "dist-embedded");
  rmSync(outputDir, { recursive: true, force: true });
  run("npx", ["expo", "export", "--platform", "web", "--output-dir", "dist-embedded"], {
    cwd: target.workspace,
    env: {
      ...process.env,
      EXPO_NO_TELEMETRY: "1",
      PUBLIC_URL: basePath,
    },
  });

  if (!existsSync(outputDir)) {
    throw new Error(`${target.label} did not produce an Expo web export`);
  }

  return outputDir;
}

function buildTarget(target) {
  const basePath = getEmbeddedPrototypeBasePath(target.slug);

  switch (target.type) {
    case "next":
      return buildNext(target, basePath);
    case "vite":
      return buildVite(target, basePath);
    case "expo":
      return buildExpo(target, basePath);
    default:
      throw new Error(`Unknown embedded prototype type: ${target.type}`);
  }
}

function getSlugFilter() {
  const slugFlagIndex = process.argv.indexOf("--slug");

  if (slugFlagIndex !== -1) {
    const slug = process.argv[slugFlagIndex + 1];

    if (!slug || slug.startsWith("--")) {
      throw new Error("--slug requires a prototype slug");
    }

    return slug;
  }

  const slugEqualsArg = process.argv.find((arg) => arg.startsWith("--slug="));

  if (slugEqualsArg) {
    const slug = slugEqualsArg.slice("--slug=".length);

    if (!slug) {
      throw new Error("--slug requires a prototype slug");
    }

    return slug;
  }

  return null;
}

function main() {
  const slugFilter = getSlugFilter();
  const targets = slugFilter
    ? embeddedPrototypeTargets.filter((target) => target.slug === slugFilter)
    : embeddedPrototypeTargets;

  if (slugFilter && targets.length === 0) {
    throw new Error(`Unknown embedded prototype slug: ${slugFilter}`);
  }

  if (!slugFilter) {
    cleanDir(embeddedRoot);
  } else {
    mkdirSync(embeddedRoot, { recursive: true });
  }

  const rows = [];

  for (const target of targets) {
    const basePath = getEmbeddedPrototypeBasePath(target.slug);
    const sourceRoot = buildTarget(target);
    const targetRoot = join(embeddedRoot, target.slug);

    copyDir(sourceRoot, targetRoot);
    removeDuplicateExportEntries(targetRoot);
    rewriteRootAssetReferences(targetRoot, basePath);
    ensureIndexFallback(targetRoot);

    rows.push({
      prototype: target.label,
      artifact: relative(repoRoot, targetRoot),
      url: getEmbeddedPrototypeUrlPath(target),
    });
  }

  console.log("\nEmbedded prototype artifacts built:");
  console.table(rows);
}

try {
  main();
} catch (error) {
  console.error(`\nEmbedded prototype build failed: ${error.message}`);
  process.exitCode = 1;
}
