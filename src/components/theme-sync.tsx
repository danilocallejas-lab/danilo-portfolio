"use client";

import { useEffect } from "react";
import {
  THEME_STORAGE_KEY,
  applyThemeToDocument,
  dispatchThemeChange,
  normalizeThemePreference,
  resolveTheme,
} from "@/lib/theme";

export function ThemeSync() {
  useEffect(() => {
    const readPreference = () => {
      try {
        return normalizeThemePreference(
          window.localStorage.getItem(THEME_STORAGE_KEY),
        );
      } catch {
        return null;
      }
    };

    const syncTheme = () => {
      const preference = readPreference();
      const resolved = resolveTheme(preference);

      applyThemeToDocument(resolved);
      dispatchThemeChange({ preference, resolved });
    };

    syncTheme();

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === THEME_STORAGE_KEY) {
        syncTheme();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return null;
}
