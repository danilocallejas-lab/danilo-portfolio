"use client";

import { useEffect } from "react";
import { THEME_CHANGE_EVENT } from "@/lib/theme";

const headerVariableNames = [
  "--site-header-foreground",
  "--site-header-muted",
  "--site-header-surface",
  "--site-header-border",
];

function resetHeaderTheme(root: HTMLElement) {
  headerVariableNames.forEach((name) => {
    root.style.removeProperty(name);
  });
}

function applyHeaderTheme(section: Element | null) {
  const root = document.documentElement;

  if (root.dataset.theme !== "bright" || !section) {
    resetHeaderTheme(root);
    return;
  }

  const styles = window.getComputedStyle(section);
  const heading = styles.getPropertyValue("--company-heading").trim();
  const meta = styles.getPropertyValue("--company-meta").trim();
  const surface = styles.getPropertyValue("--company-surface").trim();

  if (!heading || !meta || !surface) {
    resetHeaderTheme(root);
    return;
  }

  root.style.setProperty("--site-header-foreground", heading);
  root.style.setProperty("--site-header-muted", heading);
  root.style.setProperty(
    "--site-header-surface",
    `color-mix(in srgb, ${surface} 82%, transparent)`,
  );
  root.style.setProperty(
    "--site-header-border",
    `color-mix(in srgb, ${heading} 18%, transparent)`,
  );
}

export function HeaderContrastSync() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("[data-header-theme-section]"),
    );

    if (!sections.length) {
      return;
    }

    let activeSection: Element | null = null;

    const refreshActiveTheme = () => applyHeaderTheme(activeSection);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        activeSection = visibleEntry.target;
        refreshActiveTheme();
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0.01, 0.2, 0.45, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener(THEME_CHANGE_EVENT, refreshActiveTheme as EventListener);

    return () => {
      observer.disconnect();
      window.removeEventListener(
        THEME_CHANGE_EVENT,
        refreshActiveTheme as EventListener,
      );
      resetHeaderTheme(document.documentElement);
    };
  }, []);

  return null;
}
