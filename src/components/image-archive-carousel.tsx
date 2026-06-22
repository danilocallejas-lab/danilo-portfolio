"use client";

import Image from "next/image";
import { useCallback, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/classnames";
import type { ProjectSectionImage } from "@/lib/site-content";

type SlideDirection = "next" | "previous";

function getWrappedIndex(index: number, length: number) {
  return (index + length) % length;
}

export function ImageArchiveCarousel({
  label,
  slides,
  unframed = false,
}: {
  label: string;
  slides: readonly ProjectSectionImage[];
  unframed?: boolean;
}) {
  const [carouselState, setCarouselState] = useState<{
    activeIndex: number;
    previousIndex: number | null;
    direction: SlideDirection;
    hasNavigated: boolean;
  }>({
    activeIndex: 0,
    previousIndex: null,
    direction: "next",
    hasNavigated: false,
  });
  const { activeIndex } = carouselState;
  const activeSlide = slides[activeIndex] ?? slides[0];

  const showSlide = useCallback((direction: SlideDirection) => {
    setCarouselState((currentState) => ({
      activeIndex: getWrappedIndex(
        currentState.activeIndex + (direction === "next" ? 1 : -1),
        slides.length,
      ),
      previousIndex: currentState.activeIndex,
      direction,
      hasNavigated: true,
    }));
  }, [slides.length]);

  const showPreviousSlide = useCallback(() => {
    showSlide("previous");
  }, [showSlide]);

  const showNextSlide = useCallback(() => {
    showSlide("next");
  }, [showSlide]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousSlide();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextSlide();
    }
  }

  if (!slides.length || !activeSlide) {
    return null;
  }

  return (
    <section
      aria-label={`${label} image carousel`}
      aria-live="off"
      aria-roledescription="carousel"
      className="group relative outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className={cx(
          "relative overflow-hidden",
          !unframed && "rounded-lg",
          activeSlide.frameClassName ?? "aspect-[16/10]",
        )}
      >
        <ul className="absolute inset-0 h-full w-full">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const isPrevious = index === carouselState.previousIndex;
            const activeMotionClass = carouselState.hasNavigated
              ? carouselState.direction === "next"
                ? "z-10 record-carousel-slide--active-next"
                : "z-10 record-carousel-slide--active-previous"
              : "z-10 record-carousel-slide--active-initial";
            const previousMotionClass =
              carouselState.direction === "next"
                ? "z-0 record-carousel-slide--exit-next"
                : "z-0 record-carousel-slide--exit-previous";

            return (
              <li
                key={slide.src}
                aria-hidden={!isActive}
                aria-label={`${index + 1} of ${slides.length}`}
                aria-roledescription="slide"
                className={cx(
                  "record-carousel-slide absolute inset-0 h-full w-full",
                  isActive
                    ? activeMotionClass
                    : isPrevious
                      ? previousMotionClass
                      : "pointer-events-none z-0 record-carousel-slide--inactive",
                )}
                role="group"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 1024px) 92vw, 86vw"
                  className={slide.imageClassName ?? "object-cover"}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        aria-label={`Previous ${label} slide`}
        className="tap-target absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-[1.35rem] leading-none text-white/90 shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 sm:left-4"
        onClick={showPreviousSlide}
      >
        <span aria-hidden="true">{"<"}</span>
      </button>

      <button
        type="button"
        aria-label={`Next ${label} slide`}
        className="tap-target absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-[1.35rem] leading-none text-white/90 shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 sm:right-4"
        onClick={showNextSlide}
      >
        <span aria-hidden="true">{">"}</span>
      </button>

      <p className="sr-only" aria-live="polite">
        {label} slide {activeIndex + 1} of {slides.length}
      </p>
    </section>
  );
}
