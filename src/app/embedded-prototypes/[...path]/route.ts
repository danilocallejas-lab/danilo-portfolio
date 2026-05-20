import { extname } from "node:path";
import { NextResponse, type NextRequest } from "next/server";

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

  const lastSegment = pathSegments.at(-1);

  if (lastSegment && extname(lastSegment)) {
    return null;
  }

  return `/embedded-prototypes/${pathSegments.join("/")}/index.html`;
}

async function redirectToEmbeddedIndex(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const indexPath = getIndexPath(path);

  if (!indexPath) {
    return new Response("Not found", { status: 404 });
  }

  const destination = request.nextUrl.clone();
  destination.pathname = indexPath;

  return NextResponse.redirect(destination, 308);
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return redirectToEmbeddedIndex(request, context);
}

export async function HEAD(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return redirectToEmbeddedIndex(request, context);
}
