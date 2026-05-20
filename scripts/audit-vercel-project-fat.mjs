import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const allowedProjects = new Set(["danilo-callejas-portfolio"]);
const retiredProjects = new Set([
  "danilo-portfolio-embed-fallback-20260507",
  "draftkings-quick-betslip",
  "player-pages",
  "draftkings-switchers-prototype",
  "draftkings-betslip-migration",
  "draftkings-pools-one-and-done",
  "draftkings-player-props",
  "draftkings-baseball-play-by-play",
  "opendoor-seller-prototype",
  "opendoor-home-insights-prototype",
  "opendoor-agent-led-offers-prototype",
  "react-native-app",
]);

function parseVercelJson(stdout) {
  const jsonStart = stdout.indexOf("{");

  if (jsonStart < 0) {
    throw new Error("Vercel CLI did not return JSON output.");
  }

  return JSON.parse(stdout.slice(jsonStart));
}

async function listProjects() {
  const { stdout } = await execFileAsync(
    "npx",
    ["--yes", "vercel@latest", "project", "ls", "--format=json"],
    {
      maxBuffer: 1024 * 1024 * 10,
    },
  );

  return parseVercelJson(stdout).projects ?? [];
}

const projects = await listProjects();
const projectNames = projects.map((project) => project.name);
const retiredFound = projectNames.filter((name) => retiredProjects.has(name));
const unexpectedFound = projectNames.filter((name) => !allowedProjects.has(name));

console.table(
  projects.map((project) => ({
    name: project.name,
    id: project.id,
    latestProductionUrl: project.latestProductionUrl ?? "",
  })),
);

if (retiredFound.length > 0 || unexpectedFound.length > 0) {
  console.error("\nVercel project fat audit failed.");

  if (retiredFound.length > 0) {
    console.error(`Retired projects still present: ${retiredFound.join(", ")}`);
  }

  if (unexpectedFound.length > 0) {
    console.error(
      `Unexpected projects in this scope: ${unexpectedFound.join(", ")}`,
    );
  }

  process.exitCode = 1;
} else {
  console.log("\nVercel project fat audit passed.");
}
