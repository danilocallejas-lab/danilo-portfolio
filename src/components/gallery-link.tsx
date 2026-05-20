"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

type GalleryLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement>) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function GalleryLink({ href, className, children }: GalleryLinkProps) {
  const router = useRouter();

  function navigate() {
    startTransition(() => {
      router.push(href);
    });
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isModifiedEvent(event)) {
      return;
    }

    event.preventDefault();

    const transitionDocument = document as ViewTransitionDocument;

    if (transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(() => {
        navigate();
      });
      return;
    }

    navigate();
  }

  function prefetch() {
    router.prefetch(href);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      onFocus={prefetch}
      onMouseEnter={prefetch}
      className={className}
    >
      {children}
    </a>
  );
}
