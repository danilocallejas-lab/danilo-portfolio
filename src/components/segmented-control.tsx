"use client";

import type { ReactNode } from "react";

export type SegmentedControlItem<TValue extends string> = {
  value: TValue;
  label: string;
  icon: ReactNode;
  title?: string;
  activeLabel?: string;
};

export function SegmentedControl<TValue extends string>({
  items,
  value,
  activeValues,
  onValueChange,
  ariaLabel,
  variant = "compact",
  renderIcon,
}: {
  items: readonly SegmentedControlItem<TValue>[];
  value?: TValue;
  activeValues?: readonly TValue[];
  onValueChange: (value: TValue) => void;
  ariaLabel: string;
  variant?: "micro" | "compact" | "default";
  renderIcon?: (item: SegmentedControlItem<TValue>, isActive: boolean) => ReactNode;
}) {
  const isMicro = variant === "micro";
  const isCompact = variant === "compact";
  const buttonClassName = `${isMicro ? "" : "tap-target"} inline-flex ${
    isMicro ? "h-6 w-6" : isCompact ? "h-7 w-7" : "h-9 w-9"
  } items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35`;

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[var(--theme-toggle-border)] bg-[var(--theme-toggle-surface)] ${
        isMicro ? "p-[0.1875rem] shadow-none" : isCompact ? "p-0.5 shadow-none" : "p-1 shadow-[var(--theme-toggle-shadow)] backdrop-blur"
      }`}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isActive = activeValues
          ? activeValues.includes(item.value)
          : value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            aria-label={isActive && item.activeLabel ? item.activeLabel : item.label}
            aria-pressed={isActive}
            title={item.title ?? item.label}
            className={`${buttonClassName} ${
              isActive
                ? "bg-[var(--theme-toggle-active-surface)] text-[var(--theme-toggle-active-foreground)]"
                : "text-[var(--theme-toggle-foreground)] hover:bg-[var(--theme-toggle-hover-surface)]"
            }`}
            onClick={() => onValueChange(item.value)}
          >
            {renderIcon ? renderIcon(item, isActive) : item.icon}
          </button>
        );
      })}
    </div>
  );
}
