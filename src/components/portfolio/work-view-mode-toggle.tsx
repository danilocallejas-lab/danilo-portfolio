"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  SegmentedControl,
  type SegmentedControlItem,
} from "@/components/segmented-control";

export type WorkViewMode = "grid" | "list";

const WORK_VIEW_CHANGE_EVENT = "portfolio-work-view-change";
const DEFAULT_WORK_VIEW_MODE: WorkViewMode = "list";

let currentWorkViewMode: WorkViewMode = DEFAULT_WORK_VIEW_MODE;

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

function setWorkViewMode(nextMode: WorkViewMode) {
  currentWorkViewMode = nextMode;
  window.dispatchEvent(
    new CustomEvent<WorkViewMode>(WORK_VIEW_CHANGE_EVENT, {
      detail: nextMode,
    }),
  );
}

export function useWorkViewMode() {
  const [activeMode, setActiveMode] = useState<WorkViewMode>(
    currentWorkViewMode,
  );

  useEffect(() => {
    const handleWorkViewChange = (event: Event) => {
      const nextMode = (event as CustomEvent<WorkViewMode>).detail;

      if (nextMode) {
        setActiveMode(nextMode);
      }
    };

    window.addEventListener(WORK_VIEW_CHANGE_EVENT, handleWorkViewChange);

    return () => {
      window.removeEventListener(WORK_VIEW_CHANGE_EVENT, handleWorkViewChange);
    };
  }, []);

  return {
    activeMode,
    setActiveMode: setWorkViewMode,
  };
}

export function WorkViewModeToggle() {
  const { activeMode, setActiveMode } = useWorkViewMode();
  const items: readonly SegmentedControlItem<WorkViewMode>[] = [
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

  return (
    <SegmentedControl
      items={items}
      value={activeMode}
      onValueChange={setActiveMode}
      ariaLabel="Project view"
      variant="compact"
    />
  );
}

export function HomepageWorkViewModeToggle() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return <WorkViewModeToggle />;
}
