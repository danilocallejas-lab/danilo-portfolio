"use client";

import type { ReactNode } from "react";
import { useWorkViewMode } from "@/components/portfolio/work-view-mode-toggle";

export function WorkView({
  gridView,
  listView,
}: {
  gridView: ReactNode;
  listView: ReactNode;
}) {
  const { activeMode } = useWorkViewMode();

  return (
    <div>
      {activeMode === "grid" ? gridView : listView}
    </div>
  );
}
