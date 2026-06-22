"use client";

import { useEffect } from "react";

const scrollThreshold = 8;

export function HeaderScrollSync() {
  useEffect(() => {
    const root = document.documentElement;

    function syncScrolledState() {
      if (window.scrollY > scrollThreshold) {
        root.dataset.siteHeaderScrolled = "true";
        return;
      }

      delete root.dataset.siteHeaderScrolled;
    }

    syncScrolledState();
    window.addEventListener("scroll", syncScrolledState, { passive: true });
    window.addEventListener("resize", syncScrolledState);

    return () => {
      window.removeEventListener("scroll", syncScrolledState);
      window.removeEventListener("resize", syncScrolledState);
      delete root.dataset.siteHeaderScrolled;
    };
  }, []);

  return null;
}
