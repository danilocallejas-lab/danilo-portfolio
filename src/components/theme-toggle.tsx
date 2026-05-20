"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

function SunIcon() {
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
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.75v2.1M12 19.15v2.1M21.25 12h-2.1M4.85 12h-2.1M18.54 5.46l-1.48 1.48M6.94 17.06l-1.48 1.48M18.54 18.54l-1.48-1.48M6.94 6.94 5.46 5.46" />
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

function commitThemePreference(nextPreference: ThemeMode | null) {
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

  applyThemeToDocument(resolved);
  dispatchThemeChange({ preference: nextPreference, resolved });

  return { preference: nextPreference, resolved };
}

export function ThemeToggle() {
  const prefersReducedMotion = useReducedMotion();
  const shuffleTimeoutsRef = useRef<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [themeState, setThemeState] = useState<ThemeState>(() => {
    if (typeof window === "undefined") {
      return {
        preference: null,
        resolved: "dark",
      };
    }

    return getThemeState();
  });

  useEffect(() => {
    const clearShuffleTimeouts = () => {
      shuffleTimeoutsRef.current.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
      shuffleTimeoutsRef.current = [];
    };

    const syncThemeState = () => {
      setThemeState(getThemeState());
    };

    const handleThemeChange = () => {
      syncThemeState();
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);

    return () => {
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

  const handleModeClick = (nextMode: ThemeMode) => {
    const shouldResetToDefault = themeState.preference === nextMode;

    setIsShuffling(false);
    setThemeState(commitThemePreference(shouldResetToDefault ? null : nextMode));
  };

  const handleShuffleClick = () => {
    shuffleTimeoutsRef.current.forEach((timeout) => {
      window.clearTimeout(timeout);
    });
    shuffleTimeoutsRef.current = [];

    if (prefersReducedMotion) {
      setThemeState(commitThemePreference("bright"));
      return;
    }

    setIsShuffling(true);

    Array.from({ length: BRIGHT_SHUFFLE_STEPS }).forEach((_, index) => {
      const timeout = window.setTimeout(() => {
        setThemeState(commitThemePreference("bright"));

        if (index === BRIGHT_SHUFFLE_STEPS - 1) {
          setIsShuffling(false);
          shuffleTimeoutsRef.current = [];
        }
      }, index * BRIGHT_SHUFFLE_STEP_MS);

      shuffleTimeoutsRef.current.push(timeout);
    });
  };

  const baseButtonClassName =
    "tap-target inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/35";

  return (
    <div className="inline-flex items-center rounded-full border border-[var(--theme-toggle-border)] bg-[var(--theme-toggle-surface)] p-1 shadow-[var(--theme-toggle-shadow)] backdrop-blur">
      <span aria-live="polite" className="sr-only" suppressHydrationWarning>
        {statusLabel}
      </span>

      <button
        type="button"
        aria-label={
          activeMode === "dark"
            ? "Dark mode active. Activate to return to default dark mode."
            : "Switch to dark mode"
        }
        aria-pressed={activeMode === "dark"}
        className={`${baseButtonClassName} ${
          activeMode === "dark"
            ? "bg-[var(--theme-toggle-active-surface)] text-[var(--theme-toggle-active-foreground)]"
            : "text-[var(--theme-toggle-foreground)] hover:bg-[var(--theme-toggle-hover-surface)]"
        }`}
        onClick={() => handleModeClick("dark")}
      >
        <MoonIcon />
      </button>

      <button
        type="button"
        aria-label={
          activeMode === "light"
            ? "Light mode active. Activate to return to default dark mode."
            : "Switch to light mode"
        }
        aria-pressed={activeMode === "light"}
        className={`${baseButtonClassName} ${
          activeMode === "light"
            ? "bg-[var(--theme-toggle-active-surface)] text-[var(--theme-toggle-active-foreground)]"
            : "text-[var(--theme-toggle-foreground)] hover:bg-[var(--theme-toggle-hover-surface)]"
        }`}
        onClick={() => handleModeClick("light")}
      >
        <SunIcon />
      </button>

      <button
        type="button"
        aria-label={
          activeMode === "bright"
            ? "Shuffle bright palette"
            : "Switch to bright shuffle mode"
        }
        aria-pressed={activeMode === "bright"}
        className={`${baseButtonClassName} ${
          activeMode === "bright"
            ? "bg-[var(--theme-toggle-active-surface)] text-[var(--theme-toggle-active-foreground)]"
            : "text-[var(--theme-toggle-foreground)] hover:bg-[var(--theme-toggle-hover-surface)]"
        }`}
        onClick={handleShuffleClick}
      >
        <motion.span
          animate={isShuffling ? { rotate: 360, scale: [1, 1.18, 1] } : { rotate: 0, scale: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.52,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ShuffleIcon />
        </motion.span>
      </button>
    </div>
  );
}
