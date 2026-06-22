import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { GalleryHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <GalleryHeader />
      <main className="page-shell min-h-screen">
        <div className="page-content-narrow">
          <Reveal className="surface-panel space-y-6 p-[var(--panel-padding-lg)]">
            <p className="editorial-eyebrow">Not found</p>
            <h1 className="type-h1 font-display text-foreground">
              That wall is empty.
            </h1>
            <p className="max-w-2xl text-[1.04rem] leading-8 text-[var(--muted)]">
              The project you were looking for is not part of this rebuild. The main
              gallery and archive are still right here.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="tap-target inline-flex items-center rounded-full border border-[var(--border)] px-5 py-3 text-[0.95rem] text-foreground transition-colors hover:border-[var(--border-strong)] hover:text-[var(--link-hover)]"
              >
                Back to gallery
              </Link>
              <Link
                href="/archive"
                className="tap-target inline-flex items-center rounded-full border border-[var(--border)] px-5 py-3 text-[0.95rem] text-foreground transition-colors hover:border-[var(--border-strong)] hover:text-[var(--link-hover)]"
              >
                Open archive
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
