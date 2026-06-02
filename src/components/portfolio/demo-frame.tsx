"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
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
  meta_label?: string;
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
  mount_strategy?: "eager" | "visible";
};

function getToneAccent(
  tone?: "opendoor" | "draftkings" | "coinbase" | "dropbox",
) {
  switch (tone) {
    case "draftkings":
      return "#d68446";
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
}: {
  iframe_url: string;
  title: string;
  loading: "eager" | "lazy";
  on_load: () => void;
  is_loaded: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: is_loaded ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      <iframe
        src={iframe_url}
        title={title}
        loading={loading}
        className="h-full w-full border-0 bg-transparent"
        onLoad={on_load}
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
}) {
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showSlowLoadCta, setShowSlowLoadCta] = useState(false);

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
          is_loaded={isIframeLoaded}
        />
      ) : null}

      <PosterStage
        poster_image={poster_image}
        title={title}
        loading_label={loading_label}
        show_loading={show_loading_indicator && hasStartedLoading && !isIframeLoaded}
        show_slow_load_cta={showSlowLoadCta}
        open_prototype_url={open_prototype_url}
        open_prototype_label={open_prototype_label}
        is_loaded={isIframeLoaded}
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
      ? "rounded-[clamp(0.75rem,0.65rem+0.35vw,1rem)]"
      : "rounded-[calc(var(--frame-radius)-0.125rem)]";
  const frameClassName = cx(
    "prototype-frame-surface",
    isDetail
      ? "min-h-[22rem] h-[var(--detail-frame-max-block)] rounded-lg shadow-[var(--shadow)]"
      : cx("aspect-[16/10] shadow-[var(--shadow-soft)]", previewRadiusClassName),
    frame_variant === "default" && "border border-[var(--rule)]",
  );
  const frameStyle = {
    viewTransitionName: transition_key,
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
        <div className="demo-frame-chrome relative z-10 mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--demo-frame-chrome-dot)] opacity-60" />
            {meta_label ? (
              <p className="demo-frame-chrome-label text-[0.68rem] uppercase tracking-[0.18em] text-[var(--demo-frame-chrome-meta,var(--muted))]">
                {meta_label}
              </p>
            ) : null}
          </div>

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
          className={
            interactive ? "h-full w-full" : "pointer-events-none h-full w-full select-none"
          }
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
