import { spawn } from "node:child_process";
import net from "node:net";
import {
  getLocalPrototypeUrl,
  portfolio_sections,
} from "../src/lib/portfolio-content.ts";

const portfolioPort = Number(process.env.PORTFOLIO_PORT ?? 3000);
const requestedSlugs = new Set(process.argv.slice(2));
const children = [];

function isProjectSection(section) {
  return section.section_type === "project";
}

function projectUrl(slug) {
  return `http://localhost:${portfolioPort}/prototypes/${slug}`;
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });

    socket.once("connect", () => {
      socket.end();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
    socket.setTimeout(500, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function prefixLines(label, stream) {
  let pending = "";

  stream.on("data", (chunk) => {
    pending += chunk.toString();
    const lines = pending.split(/\r?\n/);
    pending = lines.pop() ?? "";

    for (const line of lines) {
      if (line.trim()) {
        console.log(`[${label}] ${line}`);
      }
    }
  });
}

function spawnCommand({ label, command, cwd, env }) {
  const child = spawn(command, {
    cwd,
    shell: true,
    env: {
      ...process.env,
      ...env,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  prefixLines(label, child.stdout);
  prefixLines(label, child.stderr);

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`[${label}] stopped by ${signal}`);
      return;
    }

    console.log(`[${label}] exited with code ${code}`);
  });

  children.push(child);
}

async function startIfNeeded({ label, command, cwd, port, env = {} }) {
  if (await isPortOpen(port)) {
    return "already running";
  }

  spawnCommand({ label, command, cwd, env });
  return "started";
}

function getPrototypeTargets() {
  return portfolio_sections
    .filter(isProjectSection)
    .filter((section) => section.prototype.localDev)
    .filter(
      (section) =>
        requestedSlugs.size === 0 || requestedSlugs.has(section.prototype.slug),
    );
}

function printSummary(rows) {
  console.log("\nLocal prototype embed mode");
  console.table(rows);
  console.log("\nPortfolio:");
  console.log(`  http://localhost:${portfolioPort}`);
  console.log("\nStop all processes with Ctrl+C.");
}

function waitForShutdown() {
  return new Promise((resolve) => {
    let isShuttingDown = false;

    const shutdown = (signal) => {
      if (isShuttingDown) {
        return;
      }

      isShuttingDown = true;
      let remaining = children.length;

      if (remaining === 0) {
        resolve();
        return;
      }

      const finishChild = () => {
        remaining -= 1;

        if (remaining <= 0) {
          resolve();
        }
      };

      for (const child of children) {
        if (child.exitCode !== null || child.signalCode !== null) {
          finishChild();
          continue;
        }

        child.once("exit", finishChild);
        child.kill(signal);
      }

      setTimeout(resolve, 5000).unref();
    };

    process.once("SIGINT", () => shutdown("SIGINT"));
    process.once("SIGTERM", () => shutdown("SIGTERM"));
  });
}

async function main() {
  const projects = getPrototypeTargets();

  if (requestedSlugs.size > 0 && projects.length === 0) {
    console.error(
      `No local prototype targets matched: ${Array.from(requestedSlugs).join(", ")}`,
    );
    process.exitCode = 1;
    return;
  }

  const rows = [];
  const portfolioStatus = await startIfNeeded({
    label: "portfolio",
    command: `npm run dev:portfolio -- --port ${portfolioPort}`,
    cwd: process.cwd(),
    port: portfolioPort,
    env: {
      NEXT_PUBLIC_PROTOTYPE_EMBED_MODE: "local",
    },
  });

  rows.push({
    slug: "portfolio",
    port: portfolioPort,
    status: portfolioStatus,
    localUrl: `http://localhost:${portfolioPort}`,
    portfolioUrl: "",
  });

  for (const project of projects) {
    const localDev = project.prototype.localDev;
    const status = await startIfNeeded({
      label: project.prototype.slug,
      command: localDev.startCommand,
      cwd: localDev.workspace,
      port: localDev.port,
    });

    rows.push({
      slug: project.prototype.slug,
      port: localDev.port,
      status,
      localUrl: getLocalPrototypeUrl(localDev),
      portfolioUrl: projectUrl(project.prototype.slug),
    });
  }

  printSummary(rows);

  if (children.length === 0) {
    return;
  }

  await waitForShutdown();
}

await main();
