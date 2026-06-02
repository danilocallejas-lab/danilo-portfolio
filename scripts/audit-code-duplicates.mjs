import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const codeFilePattern = /\.(?:tsx?|jsx?|mjs|css)$/;
const scanRoots = ["src", "scripts", "tests"];
const minimumDuplicateLines = 10;
const minimumDuplicateCharacters = 280;
const ignoredFiles = new Set([
  "src/lib/portfolio-content.ts",
  "src/lib/site-content.ts",
]);

function getSourceFiles() {
  return execFileSync("rg", ["--files", ...scanRoots], { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean)
    .filter((file) => codeFilePattern.test(file))
    .filter((file) => !file.startsWith("public/"))
    .filter((file) => !ignoredFiles.has(file));
}

function isDataOnlyLine(line) {
  return /^["']--/.test(line) || /^["'][^"']+["']:\s*["']/.test(line);
}

function shouldIgnoreLine(line) {
  const trimmed = line.trim();

  return (
    !trimmed ||
    trimmed === "{" ||
    trimmed === "}" ||
    trimmed === "};" ||
    trimmed === ")," ||
    trimmed === ");" ||
    trimmed.startsWith("import ") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("/*") ||
    trimmed.startsWith("*") ||
    isDataOnlyLine(trimmed)
  );
}

function normalizeLine(line) {
  return line.trim().replace(/\s+/g, " ");
}

function getDuplicateGroups(files) {
  const windows = new Map();

  for (const file of files) {
    const lines = readFileSync(file, "utf8")
      .split(/\r?\n/)
      .map((text, index) => ({
        line: index + 1,
        text: normalizeLine(text),
      }))
      .filter(({ text }) => !shouldIgnoreLine(text));

    for (let index = 0; index <= lines.length - minimumDuplicateLines; index++) {
      const slice = lines.slice(index, index + minimumDuplicateLines);
      const key = slice.map((entry) => entry.text).join("\n");

      if (key.length < minimumDuplicateCharacters) {
        continue;
      }

      const refs = windows.get(key) ?? [];
      refs.push({
        file,
        line: slice[0].line,
        preview: slice
          .slice(0, 3)
          .map((entry) => entry.text)
          .join(" / "),
      });
      windows.set(key, refs);
    }
  }

  return [...windows.values()]
    .filter((refs) => {
      const uniqueRefs = new Set(refs.map((ref) => `${ref.file}:${ref.line}`));
      return uniqueRefs.size > 1;
    })
    .map((refs) => ({
      count: refs.length,
      refs,
    }))
    .sort((a, b) => b.count - a.count);
}

const files = getSourceFiles();
const duplicateGroups = getDuplicateGroups(files);

if (duplicateGroups.length > 0) {
  console.error(
    `\nDuplicate code audit failed: found ${duplicateGroups.length} repeated block(s).`,
  );

  for (const group of duplicateGroups.slice(0, 20)) {
    console.error(`\nRepeated block (${group.count} copies):`);

    for (const ref of group.refs) {
      console.error(`- ${ref.file}:${ref.line} ${ref.preview}`);
    }
  }

  process.exitCode = 1;
} else {
  console.log(
    `Duplicate code audit passed for ${files.length} source file(s).`,
  );
}
