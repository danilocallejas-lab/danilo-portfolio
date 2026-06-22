"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  SegmentedControl,
  type SegmentedControlItem,
} from "@/components/segmented-control";
import {
  type WorkViewMode,
  useWorkViewMode,
} from "@/components/portfolio/work-view-mode-toggle";
import {
  BRIGHT_SHUFFLE_STEPS,
  BRIGHT_SHUFFLE_STEP_MS,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  type ThemeMode,
  applyThemeToDocument,
  dispatchThemeChange,
  normalizeThemePreference,
  resolveTheme,
} from "@/lib/theme";

type HeaderControlValue = "dark" | "bright" | WorkViewMode;

type ThemeState = {
  preference: ThemeMode | null;
  resolved: ThemeMode;
};

type ThemeChangeDetail = ThemeState;

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
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
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    >
      <path d="M16 3h5v5" />
      <path d="M4 20 21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <path d="M4 4l5 5" />
    </svg>
  );
}

function GridIcon() {
  return (
    <span
      aria-hidden="true"
      className="grid h-3.5 w-3.5 grid-cols-2 gap-0.5"
    >
      <span className="rounded-[1px] bg-current" />
      <span className="rounded-[1px] bg-current" />
      <span className="rounded-[1px] bg-current" />
      <span className="rounded-[1px] bg-current" />
    </span>
  );
}

function ListIcon() {
  return (
    <span aria-hidden="true" className="grid h-3.5 w-3.5 gap-1">
      <span className="h-0.5 rounded-full bg-current" />
      <span className="h-0.5 rounded-full bg-current" />
      <span className="h-0.5 rounded-full bg-current" />
    </span>
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

  return {
    preference,
    resolved: resolvedFromDocument ?? resolveTheme(preference),
  };
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
    // Keep theme switching usable even if storage is blocked.
  }

  const resolved = resolveTheme(nextPreference);

  applyThemeToDocument(resolved, {
    avoidCurrentBrightPalette: options.avoidCurrentBrightPalette,
    excludedBrightPaletteName: options.excludedBrightPaletteName,
  });
  dispatchThemeChange({ preference: nextPreference, resolved });

  return { preference: nextPreference, resolved };
}

export function SiteHeaderControls() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const prefersReducedMotion = useReducedMotion();
  const shuffleTimeoutsRef = useRef<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [themeState, setThemeState] = useState<ThemeState>({
    preference: null,
    resolved: "dark",
  });
  const { activeMode: workViewMode, setActiveMode: setWorkViewMode } =
    useWorkViewMode();

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

  const activeThemeMode = themeState.preference ?? "dark";
  const items = useMemo<SegmentedControlItem<HeaderControlValue>[]>(() => {
    const baseItems: SegmentedControlItem<HeaderControlValue>[] = [
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

    if (!isHome) {
      return baseItems;
    }

    return [
      ...baseItems,
      {
        value: "list",
        label: "Switch to list view",
        activeLabel: "List view active.",
        title: "List",
        icon: <ListIcon />,
      },
      {
        value: "grid",
        label: "Switch to grid view",
        activeLabel: "Grid view active.",
        title: "Grid",
        icon: <GridIcon />,
      },
    ];
  }, [isHome]);

  const handleDarkClick = () => {
    setIsShuffling(false);
    setThemeState(commitThemePreference("dark"));
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

  const handleValueChange = (nextValue: HeaderControlValue) => {
    if (nextValue === "dark") {
      handleDarkClick();
      return;
    }

    if (nextValue === "bright") {
      handleShuffleClick();
      return;
    }

    setWorkViewMode(nextValue);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <SegmentedControl
        items={items}
        activeValues={isHome ? [activeThemeMode, workViewMode] : [activeThemeMode]}
        onValueChange={handleValueChange}
        ariaLabel={isHome ? "Site style and project view" : "Site style"}
        variant="floatingCompact"
        renderIcon={(item) =>
          item.value === "bright" ? (
            <motion.span
              animate={
                isShuffling
                  ? { rotate: 360, scale: [1, 1.16, 1] }
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
