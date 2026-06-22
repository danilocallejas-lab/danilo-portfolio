"use client";

import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useRef, useState } from "react";
import { cx } from "@/lib/classnames";

type DragState = {
  pointerId: number | null;
  startX: number;
  scrollLeft: number;
  moved: boolean;
};

export function DraggableProjectLane({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  const endDrag = (event?: ReactPointerEvent<HTMLDivElement>) => {
    if (event && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current.pointerId = null;
    setIsDragging(false);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest("[data-lane-ignore-drag='true']")) {
      return;
    }

    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const delta = event.clientX - dragStateRef.current.startX;

    if (Math.abs(delta) > 3) {
      dragStateRef.current.moved = true;
    }

    scroller.scrollLeft = dragStateRef.current.scrollLeft - delta;
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest("[data-lane-ignore-drag='true']")) {
      dragStateRef.current.moved = false;
      return;
    }

    if (dragStateRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragStateRef.current.moved = false;
    }
  };

  return (
    <div className={cx("relative", className)}>
      <div
        ref={scrollerRef}
        className={cx(
          "desktop-lane-fade no-scrollbar snap-x snap-mandatory overflow-x-auto overflow-y-visible -mx-[var(--page-gutter)] px-[var(--page-gutter)] pb-[var(--lane-scroll-padding-bottom)] scroll-px-[var(--page-gutter)]",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab",
        )}
        style={{ touchAction: "pan-y pinch-zoom" } as CSSProperties}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(event) => {
          if (dragStateRef.current.pointerId === event.pointerId) {
            endDrag(event);
          }
        }}
        onClickCapture={handleClickCapture}
      >
        <div
          className={cx(
            "flex min-w-max items-start gap-[var(--lane-gap)] pr-[calc(var(--page-gutter)+var(--lane-peek))]",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
