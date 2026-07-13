"use client";

import { useCallback, useEffect, useState } from "react";

export const EMBED_BACKGROUND_STORAGE_KEY =
  "portfolio-embed-background-overrides:v1";
export const EMBED_BACKGROUND_CHANGE_EVENT =
  "portfolio-embed-background-overrides-change";

export type EmbedBackgroundOverrides = Record<string, string>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export function normalizeEmbedBackgroundColor(
  value: string | null | undefined,
) {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();
  const color = trimmedValue.startsWith("#")
    ? trimmedValue
    : `#${trimmedValue}`;

  return /^#[0-9a-f]{6}$/i.test(color) ? color.toLowerCase() : null;
}

export function sanitizeEmbedBackgroundOverrides(value: unknown) {
  if (!isRecord(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value)
      .map(([projectId, color]) => {
        if (!projectId || typeof color !== "string") {
          return null;
        }

        const normalizedColor = normalizeEmbedBackgroundColor(color);

        return normalizedColor ? [projectId, normalizedColor] : null;
      })
      .filter((entry): entry is [string, string] => Boolean(entry)),
  );
}

export function readEmbedBackgroundOverrides(): EmbedBackgroundOverrides {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedValue = window.localStorage.getItem(
      EMBED_BACKGROUND_STORAGE_KEY,
    );

    return sanitizeEmbedBackgroundOverrides(
      storedValue ? JSON.parse(storedValue) : {},
    );
  } catch {
    return {};
  }
}

function dispatchEmbedBackgroundOverridesChange(
  overrides: EmbedBackgroundOverrides,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(EMBED_BACKGROUND_CHANGE_EVENT, {
      detail: overrides,
    }),
  );
}

function writeEmbedBackgroundOverrides(
  overrides: EmbedBackgroundOverrides,
): EmbedBackgroundOverrides {
  const sanitizedOverrides = sanitizeEmbedBackgroundOverrides(overrides);

  try {
    if (Object.keys(sanitizedOverrides).length) {
      window.localStorage.setItem(
        EMBED_BACKGROUND_STORAGE_KEY,
        JSON.stringify(sanitizedOverrides),
      );
    } else {
      window.localStorage.removeItem(EMBED_BACKGROUND_STORAGE_KEY);
    }
  } catch {
    // Keep the picker useful for the current session if storage is unavailable.
  }

  dispatchEmbedBackgroundOverridesChange(sanitizedOverrides);

  return sanitizedOverrides;
}

export function setEmbedBackgroundOverride(
  projectId: string,
  color: string | null,
) {
  if (!projectId) {
    return readEmbedBackgroundOverrides();
  }

  const nextOverrides = { ...readEmbedBackgroundOverrides() };

  if (color === null) {
    delete nextOverrides[projectId];
    return writeEmbedBackgroundOverrides(nextOverrides);
  }

  const normalizedColor = normalizeEmbedBackgroundColor(color);

  if (!normalizedColor) {
    return nextOverrides;
  }

  nextOverrides[projectId] = normalizedColor;

  return writeEmbedBackgroundOverrides(nextOverrides);
}

export function clearEmbedBackgroundOverrides() {
  return writeEmbedBackgroundOverrides({});
}

export function useEmbedBackgroundOverrides() {
  const [overrides, setOverrides] = useState<EmbedBackgroundOverrides>({});

  useEffect(() => {
    const syncFromStorage = () => {
      setOverrides(readEmbedBackgroundOverrides());
    };

    const handleChange = (event: Event) => {
      const nextOverrides = (
        event as CustomEvent<EmbedBackgroundOverrides>
      ).detail;

      setOverrides(
        nextOverrides
          ? sanitizeEmbedBackgroundOverrides(nextOverrides)
          : readEmbedBackgroundOverrides(),
      );
    };

    const syncTimeout = window.setTimeout(syncFromStorage, 0);

    window.addEventListener(
      EMBED_BACKGROUND_CHANGE_EVENT,
      handleChange as EventListener,
    );
    window.addEventListener("storage", syncFromStorage);

    return () => {
      window.clearTimeout(syncTimeout);
      window.removeEventListener(
        EMBED_BACKGROUND_CHANGE_EVENT,
        handleChange as EventListener,
      );
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  const setOverride = useCallback((projectId: string, color: string) => {
    setOverrides(setEmbedBackgroundOverride(projectId, color));
  }, []);

  const resetOverride = useCallback((projectId: string) => {
    setOverrides(setEmbedBackgroundOverride(projectId, null));
  }, []);

  const resetAllOverrides = useCallback(() => {
    setOverrides(clearEmbedBackgroundOverrides());
  }, []);

  return {
    overrides,
    setOverride,
    resetOverride,
    resetAllOverrides,
  };
}

export function useEmbedBackgroundOverride(projectId?: string | null) {
  const { overrides } = useEmbedBackgroundOverrides();

  if (!projectId) {
    return null;
  }

  return overrides[projectId] ?? null;
}
