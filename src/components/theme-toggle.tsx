"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SegmentedControl,
  type SegmentedControlItem,
} from "@/components/segmented-control";
import {
  BRIGHT_SHUFFLE_STEPS,
  BRIGHT_SHUFFLE_STEP_MS,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  ThemeMode,
  applyThemeToDocument,
  dispatchThemeChange,
  normalizeThemePreference,
  resolveTheme,
} from "@/lib/theme";

type ThemeState = {
  preference: ThemeMode | null;
  resolved: ThemeMode;
};

type ThemeChangeDetail = ThemeState;
type ThemeToggleMode = "dark" | "bright";

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.9 8.9 0 1 0 11 11Z" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M16 3h5v5" />
      <path d="M4 20 21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <path d="M4 4l5 5" />
    </svg>
  );
}

function getThemeState(): ThemeState {
  let preference: ThemeMode | null = null;
  let resolvedFromDocument: ThemeMode | null = null;

  try {
    preference = normalizeThemePreference(
      window.localStorage.getItem(THEME_STORAGE_KEY),
    );
  } catch {
    preference = null;
  }

  resolvedFromDocument = normalizeThemePreference(
    document.documentElement.dataset.theme ?? null,
  );
  const resolved = resolvedFromDocument ?? resolveTheme(preference);

  return { preference, resolved };
}

function commitThemePreference(
  nextPreference: ThemeMode | null,
  options: {
    avoidCurrentBrightPalette?: boolean;
    excludedBrightPaletteName?: string;
  } = {},
) {
  try {
    if (nextPreference) {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    } else {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    }
  } catch {
    // If storage is unavailable, still apply the theme for the current session.
  }

  const resolved = resolveTheme(
    nextPreference,
  );

  applyThemeToDocument(resolved, {
    avoidCurrentBrightPalette: options.avoidCurrentBrightPalette,
    excludedBrightPaletteName: options.excludedBrightPaletteName,
  });
  dispatchThemeChange({ preference: nextPreference, resolved });

  return { preference: nextPreference, resolved };
}

export function ThemeToggle({ variant = "default" }: { variant?: "default" | "compact" }) {
  const prefersReducedMotion = useReducedMotion();
  const shuffleTimeoutsRef = useRef<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [themeState, setThemeState] = useState<ThemeState>({
    preference: null,
    resolved: "dark",
  });

  useEffect(() => {
    const clearShuffleTimeouts = () => {
      shuffleTimeoutsRef.current.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
      shuffleTimeoutsRef.current = [];
    };

    const handleThemeChange = (event: Event) => {
      const nextState = (event as CustomEvent<ThemeChangeDetail>).detail;

      if (nextState) {
        setThemeState(nextState);
        return;
      }

      setThemeState(getThemeState());
    };

    const syncTimeout = window.setTimeout(() => {
      setThemeState(getThemeState());
    }, 0);

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);

    return () => {
      window.clearTimeout(syncTimeout);
      clearShuffleTimeouts();
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    };
  }, []);

  const statusLabel = useMemo(() => {
    if (themeState.preference === null) {
      return "Using default dark mode";
    }

    if (themeState.resolved === "bright") {
      return "Using bright shuffle mode";
    }

    return `Using ${themeState.resolved} mode`;
  }, [themeState.preference, themeState.resolved]);
  const activeMode = themeState.preference ?? "dark";

  const handleModeClick = (nextMode: "dark") => {
    setIsShuffling(false);
    setThemeState(commitThemePreference(nextMode));
  };

  const handleShuffleClick = () => {
    shuffleTimeoutsRef.current.forEach((timeout) => {
      window.clearTimeout(timeout);
    });
    shuffleTimeoutsRef.current = [];
    const startingBrightPalette =
      document.documentElement.dataset.brightPalette;

    if (prefersReducedMotion) {
      setThemeState(
        commitThemePreference("bright", {
          avoidCurrentBrightPalette: true,
          excludedBrightPaletteName: startingBrightPalette,
        }),
      );
      return;
    }

    setIsShuffling(true);

    Array.from({ length: BRIGHT_SHUFFLE_STEPS }).forEach((_, index) => {
      const timeout = window.setTimeout(() => {
        setThemeState(
          commitThemePreference("bright", {
            avoidCurrentBrightPalette: true,
            excludedBrightPaletteName: startingBrightPalette,
          }),
        );

        if (index === BRIGHT_SHUFFLE_STEPS - 1) {
          setIsShuffling(false);
          shuffleTimeoutsRef.current = [];
        }
      }, index * BRIGHT_SHUFFLE_STEP_MS);

      shuffleTimeoutsRef.current.push(timeout);
    });
  };

  const items: readonly SegmentedControlItem<ThemeToggleMode>[] = [
    {
      value: "dark",
      label: "Switch to dark mode",
      activeLabel: "Dark mode active.",
      title: "Dark",
      icon: <MoonIcon />,
    },
    {
      value: "bright",
      label: "Switch to bright shuffle mode",
      activeLabel: "Shuffle bright palette",
      title: "Shuffle",
      icon: <ShuffleIcon />,
    },
  ];

  const handleThemeValueChange = (nextMode: ThemeToggleMode) => {
    if (nextMode === "bright") {
      handleShuffleClick();
      return;
    }

    handleModeClick(nextMode);
  };

  return (
    <div className="inline-flex items-center">
      <span aria-live="polite" className="sr-only" suppressHydrationWarning>
        {statusLabel}
      </span>
      <SegmentedControl
        items={items}
        value={activeMode}
        onValueChange={handleThemeValueChange}
        ariaLabel="Site style"
        variant={variant}
        renderIcon={(item) =>
          item.value === "bright" ? (
            <motion.span
              animate={
                isShuffling
                  ? { rotate: 360, scale: [1, 1.18, 1] }
                  : { rotate: 0, scale: 1 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.52,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {item.icon}
            </motion.span>
          ) : (
            item.icon
          )
        }
      />
    </div>
  );
}
