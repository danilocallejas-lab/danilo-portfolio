import { extname } from "node:path";
import type { NextRequest } from "next/server";

const embeddedSpaFallbackSlugs = new Set([
  "opendoor-agent-led-offers-tooling-platform",
]);

function isSafeSegment(segment: string) {
  return (
    segment.length > 0 &&
    segment !== "." &&
    segment !== ".." &&
    !segment.includes("/") &&
    !segment.includes("\\")
  );
}

function getIndexPath(pathSegments: string[]) {
  if (!pathSegments.every(isSafeSegment)) {
    return null;
  }

  const [slug, ...routeSegments] = pathSegments;
  const lastSegment = pathSegments.at(-1);

  if (slug && embeddedSpaFallbackSlugs.has(slug) && routeSegments.length > 0) {
    if (lastSegment && extname(lastSegment) && lastSegment !== "index.html") {
      return null;
    }

    return `/embedded-prototypes/${slug}/index.html`;
  }

  if (lastSegment && extname(lastSegment)) {
    return null;
  }

  return `/embedded-prototypes/${pathSegments.join("/")}/index.html`;
}

async function serveEmbeddedIndex(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
  method: "GET" | "HEAD",
) {
  const { path } = await params;
  const indexPath = getIndexPath(path);

  if (!indexPath) {
    return new Response("Not found", { status: 404 });
  }

  const indexResponse = await fetch(new URL(indexPath, request.url), {
    method,
  });

  return new Response(method === "HEAD" ? null : indexResponse.body, {
    headers: indexResponse.headers,
    status: indexResponse.status,
    statusText: indexResponse.statusText,
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return serveEmbeddedIndex(request, context, "GET");
}

export async function HEAD(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return serveEmbeddedIndex(request, context, "HEAD");
}
