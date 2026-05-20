const DEFAULT_PROTOTYPE_EMBED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:3002",
  "http://127.0.0.1:3002",
  "https://danilo-callejas-portfolio.vercel.app",
  "https://danilocallejas.com",
  "https://www.danilocallejas.com",
] as const;

type HostedPrototypePolicyInput = {
  sourceType: "iframe" | "component";
  status: "planned" | "local-preview" | "published" | "blocked";
  allowPreviewEmbed: boolean;
  embedUrl?: string | null;
};

function normalizeOrigin(origin: string) {
  return origin.trim().replace(/\/+$/, "");
}

export function normalizeOriginList(origins: readonly string[] | string) {
  const values: readonly string[] =
    typeof origins === "string" ? origins.split(",") : origins;

  return Array.from(
    new Set(values.map((origin) => normalizeOrigin(origin)).filter(Boolean)),
  );
}

export function getSupportedPrototypeEmbedOrigins(
  configuredOrigins = process.env.NEXT_PUBLIC_PROTOTYPE_IFRAME_ALLOWED_ORIGINS ?? "",
) {
  return normalizeOriginList([
    ...DEFAULT_PROTOTYPE_EMBED_ORIGINS,
    ...normalizeOriginList(configuredOrigins),
  ]);
}

export function isPrototypeOriginAllowlisted(
  currentOrigin: string | null,
  allowlistedOrigins: readonly string[] = getSupportedPrototypeEmbedOrigins(),
) {
  if (!currentOrigin) {
    return false;
  }

  return allowlistedOrigins.includes(normalizeOrigin(currentOrigin));
}

export function isHostedPrototypeConfigured({
  sourceType,
  status,
  allowPreviewEmbed,
  embedUrl,
}: HostedPrototypePolicyInput) {
  return Boolean(
    sourceType === "iframe" &&
      status === "published" &&
      allowPreviewEmbed &&
      embedUrl,
  );
}

export function shouldMountHostedPrototype(
  prototype: HostedPrototypePolicyInput & {
    currentOrigin?: string | null;
    allowlistedOrigins?: readonly string[];
  },
) {
  if (prototype.currentOrigin === undefined) {
    return isHostedPrototypeConfigured(prototype);
  }

  const allowlistedOrigins =
    prototype.allowlistedOrigins ?? getSupportedPrototypeEmbedOrigins();

  return Boolean(
    isHostedPrototypeConfigured(prototype) &&
      isPrototypeOriginAllowlisted(prototype.currentOrigin, allowlistedOrigins),
  );
}

export function getCaseStudyHref(slug: string) {
  return `/prototypes/${slug}`;
}

export function getPrototypePreconnectOrigins(
  urls: readonly (string | null | undefined)[],
) {
  const origins = urls
    .filter((value): value is string => Boolean(value))
    .map((value) => {
      try {
        return new URL(value).origin;
      } catch {
        return null;
      }
    })
    .filter((value): value is string => Boolean(value))
    .filter((value) => value.startsWith("https://"));

  return Array.from(new Set(origins));
}
