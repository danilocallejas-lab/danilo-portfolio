"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode, SyntheticEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type {
  CaseStudyImage,
  PrototypeFrameSurface,
  PrototypeLifecycle,
} from "@/lib/portfolio-content";
import { cx } from "@/lib/classnames";
import { shouldMountHostedPrototype } from "@/lib/prototype-embed-policy";

export type DemoFrameProps = {
  title: string;
  source_type: "iframe" | "component";
  iframe_url?: string | null;
  poster_image?: CaseStudyImage | null;
  prototype_status?: PrototypeLifecycle;
  allow_preview_embed?: boolean;
  meta_label?: ReactNode;
  open_prototype_url?: string | null;
  open_prototype_label?: string;
  loading_label?: string;
  className?: string;
  priority?: "lane" | "detail";
  frame_variant?: "default" | "borderless";
  frame_radius?: "default" | "tight";
  transition_key?: string;
  interactive?: boolean;
  tone?: "opendoor" | "draftkings" | "coinbase" | "dropbox";
  frame_surface?: PrototypeFrameSurface | null;
  frame_scale?: number | null;
  mount_strategy?: "eager" | "visible";
};

function getToneAccent(
  tone?: "opendoor" | "draftkings" | "coinbase" | "dropbox",
) {
  switch (tone) {
    case "draftkings":
      return "#a8a29a";
    case "coinbase":
      return "#5d78d6";
    case "dropbox":
      return "#6a7d72";
    case "opendoor":
    default:
      return "#ad7453";
  }
}

function getFrameSurfaceValue(surface?: PrototypeFrameSurface | null) {
  switch (surface) {
    case "opendoor":
      return "var(--prototype-frame-surface-opendoor)";
    case "dropbox":
      return "var(--prototype-frame-surface-dropbox)";
    case "draftkings":
      return "var(--prototype-frame-surface-draftkings)";
    case "coinbase":
      return "var(--prototype-frame-surface-coinbase)";
    default:
      return "var(--prototype-frame-surface-default)";
  }
}

function getFrameTone(
  frame_surface?: PrototypeFrameSurface | null,
  tone?: PrototypeFrameSurface,
) {
  return frame_surface ?? tone;
}

function getFrameShadowClassName(
  isDetail: boolean,
  frameTone?: PrototypeFrameSurface,
) {
  if (frameTone === "dropbox") {
    return "shadow-none";
  }

  return isDetail ? "shadow-[var(--shadow)]" : "shadow-[var(--shadow-soft)]";
}

function shouldRenderFrameBorder(
  frame_variant: NonNullable<DemoFrameProps["frame_variant"]>,
  frameTone?: PrototypeFrameSurface,
) {
  return (
    frame_variant === "default" &&
    frameTone !== "draftkings" &&
    frameTone !== "coinbase"
  );
}

function getEmbeddedPrototypePresentationCss(frameTone?: PrototypeFrameSurface) {
  switch (frameTone) {
    case "coinbase":
      return `
        html,
        body {
          background: transparent !important;
        }

        [class*="device"]:not([class*="shell"]),
        [class*="phone"]:not([class*="shell"]),
        [class*="handset"]:not([class*="shell"]) {
          background: transparent !important;
          border-color: transparent !important;
          border-width: 0 !important;
          box-shadow: none !important;
          padding: 0 !important;
        }

        [class*="device"]::before,
        [class*="phone"]::before,
        [class*="handset"]::before {
          border-color: transparent !important;
          border-width: 0 !important;
          display: none !important;
        }
      `;
    case "draftkings":
      return `
        [data-prototype-stage],
        .switchers-device,
        .quick-betslip-device,
        .player-pages-device,
        [class*="device"]:not([class*="shell"]),
        [class*="phone"]:not([class*="shell"]),
        [class*="handset"]:not([class*="shell"]) {
          border-color: transparent !important;
        }

        [data-prototype-stage]::before,
        .switchers-device::before,
        .quick-betslip-device::before,
        .player-pages-device::before,
        [class*="device"]::before,
        [class*="phone"]::before,
        [class*="handset"]::before {
          border-color: transparent !important;
        }
      `;
    case "dropbox":
      return `
        html,
        body {
          overflow: hidden !important;
        }

        .spaces-route,
        .paper-route,
        .paper-prototype-stage,
        .templates-prototype-stage {
          box-sizing: border-box !important;
          height: 100dvh !important;
          min-height: 100dvh !important;
          overflow: hidden !important;
          padding: 10px !important;
          width: 100vw !important;
        }

        .paper-browser-stage,
        .templates-browser-stage {
          display: grid !important;
          height: 100% !important;
          place-items: center !important;
          width: 100% !important;
        }

        .spaces-browser-shell,
        .paper-browser-frame,
        .templates-browser-frame,
        .paper-window,
        [class*="browser-shell"],
        [class*="browser-frame"],
        [class*="browser-window"],
        [class*="desktop-shell"],
        [class*="desktop-frame"],
        [class*="desktop-window"],
        [class*="paper-window"],
        [class*="window-shell"],
        [class*="window-frame"] {
          box-shadow: 0 2px 8px rgba(28, 37, 52, 0.06) !important;
        }
      `;
    default:
      return "";
  }
}

type DropboxPrototypeWindow = Window & {
  __portfolioDropboxResizeCleanup?: () => void;
};

type DropboxPrototypeFrameConfig = {
  stageSelector: string;
  viewportSelector?: string;
  sizerSelector: string;
  frameSelector: string;
  nativeWidth: number;
  nativeHeight: number;
  previewFitRatio?: number;
};

const DROPBOX_EMBED_STAGE_PADDING = 10;
const DROPBOX_PREVIEW_WINDOW_FIT_RATIO = 0.82;
const DROPBOX_PAPER_DESKTOP_PREVIEW_WINDOW_FIT_RATIO = 0.94;
const dropboxPrototypeFrameConfigs: readonly DropboxPrototypeFrameConfig[] = [
  {
    stageSelector: ".spaces-route",
    sizerSelector: ".spaces-shell-viewport",
    frameSelector: ".spaces-browser-shell",
    nativeWidth: 1600,
    nativeHeight: 1171.43,
  },
  {
    stageSelector: ".paper-route",
    sizerSelector: ".paper-shell-viewport",
    frameSelector: ".paper-desktop",
    nativeWidth: 1490,
    nativeHeight: 1000,
    previewFitRatio: DROPBOX_PAPER_DESKTOP_PREVIEW_WINDOW_FIT_RATIO,
  },
  {
    stageSelector: ".paper-prototype-stage",
    viewportSelector: ".paper-browser-stage",
    sizerSelector: ".paper-browser-sizer",
    frameSelector: ".paper-browser-frame",
    nativeWidth: 1440,
    nativeHeight: 900,
  },
  {
    stageSelector: ".templates-prototype-stage",
    viewportSelector: ".templates-browser-stage",
    sizerSelector: ".templates-browser-sizer",
    frameSelector: ".templates-browser-frame",
    nativeWidth: 1440,
    nativeHeight: 900,
  },
] as const;

function getFrameElement(document: Document, selector: string) {
  return document.querySelector(selector) as HTMLElement | null;
}

function applyDropboxPrototypeFrameSizing(
  iframeDocument: Document,
  iframeWindow: Window,
) {
  const activeConfig = dropboxPrototypeFrameConfigs.find((config) =>
    iframeDocument.querySelector(config.stageSelector),
  );

  if (!activeConfig || !iframeDocument.body) {
    return;
  }

  const portfolioWindow = iframeWindow as DropboxPrototypeWindow;
  const updateSizing = () => {
    const stage = getFrameElement(iframeDocument, activeConfig.stageSelector);
    const sizer = getFrameElement(iframeDocument, activeConfig.sizerSelector);
    const frame = getFrameElement(iframeDocument, activeConfig.frameSelector);
    const viewport = activeConfig.viewportSelector
      ? getFrameElement(iframeDocument, activeConfig.viewportSelector)
      : null;

    if (!stage || !sizer || !frame) {
      return;
    }

    const previewFitRatio =
      activeConfig.previewFitRatio ?? DROPBOX_PREVIEW_WINDOW_FIT_RATIO;
    const availableWidth = Math.max(
      1,
      iframeWindow.innerWidth * previewFitRatio,
    );
    const availableHeight = Math.max(
      1,
      iframeWindow.innerHeight * previewFitRatio,
    );
    const scale = Math.min(
      availableWidth / activeConfig.nativeWidth,
      availableHeight / activeConfig.nativeHeight,
    );
    const scaledWidth = activeConfig.nativeWidth * scale;
    const scaledHeight = activeConfig.nativeHeight * scale;

    iframeDocument.documentElement.style.overflow = "hidden";
    iframeDocument.body.style.margin = "0";
    iframeDocument.body.style.overflow = "hidden";

    Object.assign(stage.style, {
      boxSizing: "border-box",
      display: "grid",
      height: "100dvh",
      minHeight: "100dvh",
      overflow: "hidden",
      padding: `${DROPBOX_EMBED_STAGE_PADDING}px`,
      placeItems: "center",
      width: "100vw",
    });

    if (viewport) {
      Object.assign(viewport.style, {
        display: "grid",
        height: "100%",
        placeItems: "center",
        width: "100%",
      });
    }

    Object.assign(sizer.style, {
      height: `${scaledHeight}px`,
      maxHeight: "100%",
      maxWidth: "100%",
      position: "relative",
      width: `${scaledWidth}px`,
    });

    Object.assign(frame.style, {
      height: `${activeConfig.nativeHeight}px`,
      left: "0",
      position: "absolute",
      top: "0",
      transform: `scale(${scale})`,
      transformOrigin: "0 0",
      width: `${activeConfig.nativeWidth}px`,
    });
  };

  portfolioWindow.__portfolioDropboxResizeCleanup?.();
  iframeWindow.addEventListener("resize", updateSizing);
  portfolioWindow.__portfolioDropboxResizeCleanup = () => {
    iframeWindow.removeEventListener("resize", updateSizing);
  };

  updateSizing();
  iframeWindow.requestAnimationFrame(updateSizing);
  iframeWindow.setTimeout(updateSizing, 250);
}

function resetDropboxPrototypeFrameSizing(
  iframeDocument: Document,
  iframeWindow: Window,
) {
  const portfolioWindow = iframeWindow as DropboxPrototypeWindow;
  portfolioWindow.__portfolioDropboxResizeCleanup?.();
  portfolioWindow.__portfolioDropboxResizeCleanup = undefined;

  const activeConfig = dropboxPrototypeFrameConfigs.find((config) =>
    iframeDocument.querySelector(config.stageSelector),
  );

  iframeDocument.documentElement.style.removeProperty("overflow");
  iframeDocument.body?.style.removeProperty("margin");
  iframeDocument.body?.style.removeProperty("overflow");

  if (!activeConfig) {
    return;
  }

  const stage = getFrameElement(iframeDocument, activeConfig.stageSelector);
  const sizer = getFrameElement(iframeDocument, activeConfig.sizerSelector);
  const frame = getFrameElement(iframeDocument, activeConfig.frameSelector);
  const viewport = activeConfig.viewportSelector
    ? getFrameElement(iframeDocument, activeConfig.viewportSelector)
    : null;

  stage?.style.removeProperty("box-sizing");
  stage?.style.removeProperty("display");
  stage?.style.removeProperty("height");
  stage?.style.removeProperty("min-height");
  stage?.style.removeProperty("overflow");
  stage?.style.removeProperty("padding");
  stage?.style.removeProperty("place-items");
  stage?.style.removeProperty("width");

  viewport?.style.removeProperty("display");
  viewport?.style.removeProperty("height");
  viewport?.style.removeProperty("place-items");
  viewport?.style.removeProperty("width");

  sizer?.style.removeProperty("height");
  sizer?.style.removeProperty("max-height");
  sizer?.style.removeProperty("max-width");
  sizer?.style.removeProperty("position");
  sizer?.style.removeProperty("width");

  frame?.style.removeProperty("height");
  frame?.style.removeProperty("left");
  frame?.style.removeProperty("position");
  frame?.style.removeProperty("top");
  frame?.style.removeProperty("transform");
  frame?.style.removeProperty("transform-origin");
  frame?.style.removeProperty("width");
}

function isSameOriginEmbeddedPrototypeUrl(url: string) {
  return url.startsWith("/embedded-prototypes/");
}

function FrameStatusBadge({
  label,
  slow,
}: {
  label: string;
  slow: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex justify-start"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--rule)] bg-[color:color-mix(in_srgb,var(--surface-strong)_82%,transparent)] px-3 py-2 shadow-[var(--shadow-soft)] backdrop-blur-md">
        <div className="h-4 w-4 rounded-full border border-[var(--accent)]/25 border-t-[var(--accent)] animate-spin motion-reduce:animate-none" />
        <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)]">
          {slow ? `${label}...` : label}
        </p>
      </div>
    </motion.div>
  );
}

function PosterStage({
  poster_image,
  title,
  loading_label,
  show_loading,
  show_slow_load_cta,
  open_prototype_url,
  open_prototype_label,
  is_loaded,
  prioritize_image,
}: {
  poster_image?: CaseStudyImage | null;
  title: string;
  loading_label: string;
  show_loading: boolean;
  show_slow_load_cta: boolean;
  open_prototype_url?: string | null;
  open_prototype_label: string;
  is_loaded: boolean;
  prioritize_image: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: is_loaded ? 0 : 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {poster_image ? (
        <Image
          src={poster_image.src}
          alt={poster_image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          priority={prioritize_image}
        />
      ) : (
        <Image
          src="/images/prototype-placeholder.svg"
          alt={`${title} poster`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          priority={prioritize_image}
        />
      )}

      {show_loading ? (
        <FrameStatusBadge label={loading_label} slow={show_slow_load_cta} />
      ) : null}

      {show_slow_load_cta && open_prototype_url ? (
        <div className="absolute inset-x-4 top-4 flex justify-end">
          <a
            href={open_prototype_url}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto inline-flex items-center rounded-full border border-white/18 bg-black/36 px-3 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-white/90 shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:bg-black/48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30"
          >
            {open_prototype_label}
          </a>
        </div>
      ) : null}
    </motion.div>
  );
}

function IframeStage({
  iframe_url,
  title,
  loading,
  on_load,
  is_loaded,
  frame_tone,
  is_detail,
}: {
  iframe_url: string;
  title: string;
  loading: "eager" | "lazy";
  on_load: () => void;
  is_loaded: boolean;
  frame_tone?: PrototypeFrameSurface;
  is_detail: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const applyPortfolioIframeStyles = useCallback(
    (iframeElement: HTMLIFrameElement) => {
      try {
        const iframeDocument = iframeElement.contentDocument;
        const iframeWindow = iframeElement.contentWindow;
        const framePath = iframeWindow?.location.pathname ?? "";

        if (
          !iframeDocument ||
          !iframeWindow ||
          !framePath.startsWith("/embedded-prototypes/")
        ) {
          return;
        }

        const cursorStyleId = "portfolio-glass-cursor";
        const existingStyle = iframeDocument.getElementById(cursorStyleId);
        const cursorStyle =
          existingStyle ?? iframeDocument.createElement("style");

        cursorStyle.id = cursorStyleId;
        cursorStyle.textContent = `
        *,
        *::before,
        *::after,
        html,
        body,
        a,
        button,
        [role="button"] {
          cursor: url("/cursors/prototype-dot.svg") 16 16, crosshair !important;
        }
      `;

        if (!existingStyle) {
          iframeDocument.head.appendChild(cursorStyle);
        }

        const presentationCss =
          frame_tone === "dropbox" && is_detail
            ? ""
            : getEmbeddedPrototypePresentationCss(frame_tone);
        const presentationStyleId = "portfolio-prototype-presentation";
        const existingPresentationStyle =
          iframeDocument.getElementById(presentationStyleId);

        if (presentationCss) {
          const style =
            existingPresentationStyle ?? iframeDocument.createElement("style");

          style.id = presentationStyleId;
          style.textContent = presentationCss;

          if (!existingPresentationStyle) {
            iframeDocument.head.appendChild(style);
          }
        } else {
          existingPresentationStyle?.remove();
        }

        if (frame_tone === "dropbox") {
          if (is_detail) {
            resetDropboxPrototypeFrameSizing(iframeDocument, iframeWindow);
          } else {
            applyDropboxPrototypeFrameSizing(iframeDocument, iframeWindow);
          }
        }
      } catch {
        // Cross-origin local prototype iframes cannot be styled from the portfolio.
      }
    },
    [frame_tone, is_detail],
  );

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

    applyPortfolioIframeStyles(iframeRef.current);
  }, [applyPortfolioIframeStyles]);

  const handleLoad = (event: SyntheticEvent<HTMLIFrameElement>) => {
    on_load();
    applyPortfolioIframeStyles(event.currentTarget);
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: is_loaded ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      <iframe
        ref={iframeRef}
        src={iframe_url}
        title={title}
        loading={loading}
        className="h-full w-full border-0 bg-transparent"
        onLoad={handleLoad}
      />
    </motion.div>
  );
}

function HostedIframePreview({
  iframe_url,
  title,
  loading_label,
  loading,
  poster_image,
  open_prototype_url,
  open_prototype_label,
  should_mount_iframe,
  prioritize_image,
  show_loading_indicator,
  reveal_on_mount,
  frame_tone,
  is_detail,
}: {
  iframe_url: string;
  title: string;
  loading_label: string;
  loading: "eager" | "lazy";
  poster_image?: CaseStudyImage | null;
  open_prototype_url?: string | null;
  open_prototype_label: string;
  should_mount_iframe: boolean;
  prioritize_image: boolean;
  show_loading_indicator: boolean;
  reveal_on_mount: boolean;
  frame_tone?: PrototypeFrameSurface;
  is_detail: boolean;
}) {
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showSlowLoadCta, setShowSlowLoadCta] = useState(false);
  const shouldRevealFrame = reveal_on_mount || isIframeLoaded;

  useEffect(() => {
    if (!should_mount_iframe || hasStartedLoading) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setHasStartedLoading(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [hasStartedLoading, should_mount_iframe]);

  useEffect(() => {
    if (!hasStartedLoading || isIframeLoaded) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowSlowLoadCta(true);
    }, 3500);

    return () => window.clearTimeout(timeoutId);
  }, [hasStartedLoading, isIframeLoaded]);

  return (
    <>
      {hasStartedLoading ? (
        <IframeStage
          key={iframe_url}
          iframe_url={iframe_url}
          title={title}
          loading={loading}
          on_load={() => setIsIframeLoaded(true)}
          is_loaded={shouldRevealFrame}
          frame_tone={frame_tone}
          is_detail={is_detail}
        />
      ) : null}

      <PosterStage
        poster_image={poster_image}
        title={title}
        loading_label={loading_label}
        show_loading={show_loading_indicator && hasStartedLoading && !shouldRevealFrame}
        show_slow_load_cta={!shouldRevealFrame && showSlowLoadCta}
        open_prototype_url={open_prototype_url}
        open_prototype_label={open_prototype_label}
        is_loaded={shouldRevealFrame}
        prioritize_image={prioritize_image}
      />
    </>
  );
}

function PlaceholderStage({
  poster_image,
  title,
  prefers_reduced_motion,
}: {
  poster_image?: CaseStudyImage | null;
  title: string;
  prefers_reduced_motion: boolean;
}) {
  return (
    <motion.div
      className="relative h-full w-full"
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: prefers_reduced_motion ? 0.01 : 0.18 }}
    >
      <Image
        src={poster_image?.src ?? "/images/prototype-placeholder.svg"}
        alt={poster_image?.alt ?? `${title} placeholder image`}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover"
      />
    </motion.div>
  );
}

export function DemoFrame({
  title,
  source_type,
  iframe_url,
  poster_image,
  prototype_status = "planned",
  allow_preview_embed = false,
  meta_label,
  open_prototype_url,
  open_prototype_label = "Open prototype",
  loading_label = "Loading prototype",
  className,
  priority = "lane",
  frame_variant = "default",
  frame_radius = "default",
  transition_key,
  interactive = true,
  tone,
  frame_surface,
  frame_scale,
  mount_strategy = "eager",
}: DemoFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [hasMountedIframe, setHasMountedIframe] = useState(
    mount_strategy === "eager",
  );

  const isDetail = priority === "detail";
  const shouldRenderIframe = shouldMountHostedPrototype({
    sourceType: source_type,
    status: prototype_status,
    allowPreviewEmbed: allow_preview_embed,
    embedUrl: iframe_url,
  });
  const shouldMountIframe = shouldRenderIframe && hasMountedIframe;
  const shouldRenderPlaceholder = !shouldRenderIframe;
  const previewRadiusClassName =
    frame_radius === "tight"
      ? "rounded-[clamp(0.5rem,0.45rem+0.2vw,0.625rem)]"
      : "rounded-[calc(var(--frame-radius)-0.125rem)]";
  const frameTone = getFrameTone(frame_surface, tone);
  const frameShadowClassName = getFrameShadowClassName(isDetail, frameTone);
  const frameClassName = cx(
    "prototype-frame-surface",
    isDetail
      ? cx(
          "min-h-[22rem] h-[var(--detail-frame-max-block)] rounded-lg",
          frameShadowClassName,
        )
      : cx("aspect-[16/10]", frameShadowClassName, previewRadiusClassName),
    shouldRenderFrameBorder(frame_variant, frameTone) &&
      "border border-[var(--rule)]",
  );
  const frameStyle = {
    viewTransitionName: transition_key,
  } as CSSProperties;
  const contentScale = frame_scale && frame_scale > 0 ? frame_scale : 1;
  const contentStyle = {
    transform: contentScale === 1 ? undefined : `scale(${contentScale})`,
  } as CSSProperties;
  const wrapperStyle = {
    "--accent": getToneAccent(tone),
    "--prototype-frame-surface": getFrameSurfaceValue(frame_surface),
  } as CSSProperties;

  useEffect(() => {
    const frameElement = frameRef.current;

    if (
      mount_strategy !== "visible" ||
      !frameElement ||
      !shouldRenderIframe ||
      hasMountedIframe
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) {
          return;
        }

        setHasMountedIframe(true);
        observer.disconnect();
      },
      {
        rootMargin: "220px 220px 220px 220px",
        threshold: 0.01,
      },
    );

    observer.observe(frameElement);

    return () => observer.disconnect();
  }, [hasMountedIframe, mount_strategy, shouldRenderIframe]);

  return (
    <div
      className={cx("relative", className)}
      style={wrapperStyle}
    >
      {meta_label || open_prototype_url ? (
        <div
          className={cx(
            "demo-frame-chrome relative z-10 mb-4 flex items-center gap-4",
            meta_label ? "justify-between" : "justify-end",
          )}
        >
          {meta_label ? (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--demo-frame-chrome-dot)] opacity-60" />
              <p className="demo-frame-chrome-label text-[0.68rem] uppercase tracking-[0.18em] text-[var(--demo-frame-chrome-meta,var(--muted))]">
                {meta_label}
              </p>
            </div>
          ) : null}

          {open_prototype_url ? (
            <a
              href={open_prototype_url}
              target="_blank"
              rel="noreferrer"
              data-lane-ignore-drag="true"
              className="tap-target demo-frame-chrome-link inline-flex items-center text-[0.72rem] uppercase tracking-[0.16em] text-[var(--demo-frame-chrome-meta,var(--muted))] hover:text-[var(--demo-frame-chrome-foreground,var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30"
            >
              {open_prototype_label}
            </a>
          ) : null}
        </div>
      ) : null}

      <motion.div
        layoutId={transition_key}
        className={cx("relative overflow-hidden", frameClassName)}
        style={frameStyle}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        ref={frameRef}
      >
        <div
          className={cx(
            "h-full w-full origin-center transition-transform duration-300 ease-out",
            interactive ? "" : "pointer-events-none select-none",
          )}
          style={contentStyle}
        >
          {shouldRenderIframe && iframe_url ? (
            <HostedIframePreview
              key={`${iframe_url}:${shouldMountIframe ? "mounted" : "idle"}`}
              iframe_url={iframe_url}
              title={title}
              loading_label={loading_label}
              loading={isDetail ? "eager" : "lazy"}
              poster_image={poster_image}
              open_prototype_url={open_prototype_url}
              open_prototype_label={open_prototype_label}
              should_mount_iframe={shouldMountIframe}
              prioritize_image={isDetail || shouldMountIframe}
              show_loading_indicator={isDetail}
              reveal_on_mount={isSameOriginEmbeddedPrototypeUrl(iframe_url)}
              frame_tone={frameTone}
              is_detail={isDetail}
            />
          ) : null}

          {shouldRenderPlaceholder ? (
            <PlaceholderStage
              poster_image={poster_image}
              title={title}
              prefers_reduced_motion={Boolean(prefersReducedMotion)}
            />
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
