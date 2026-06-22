"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.992,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: (index % 3) * 0.025,
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

type RevealAs = "article" | "div" | "figure" | "header" | "section";

export function Reveal({
  anchorId,
  as = "div",
  children,
  className,
  index,
  ariaLabel,
  dataHeaderThemeSection,
  skipAnimation = false,
}: {
  anchorId?: string;
  as?: RevealAs;
  children: ReactNode;
  className?: string;
  index?: number;
  ariaLabel?: string;
  dataHeaderThemeSection?: boolean;
  skipAnimation?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = as;
  const MotionComponent = motion[as];
  const sharedProps = {
    id: anchorId,
    className,
    "aria-label": ariaLabel,
    "data-header-theme-section": dataHeaderThemeSection ? "" : undefined,
  };

  if (prefersReducedMotion || skipAnimation) {
    return (
      <Component {...sharedProps}>
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent
      {...sharedProps}
      variants={revealVariants}
      custom={index ?? 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionComponent>
  );
}
