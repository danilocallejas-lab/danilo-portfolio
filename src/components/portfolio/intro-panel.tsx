import type { IntroSection } from "@/lib/portfolio-content";

export function IntroPanel({ section }: { section: IntroSection }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-[1240px] items-center px-4 pb-8 pt-28 sm:px-6 lg:px-8">
      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
        <div className="space-y-6">
          <p className="editorial-eyebrow">{section.eyebrow_label}</p>
          <div className="space-y-4">
            <h1 className="max-w-4xl font-display text-[clamp(3.6rem,7vw,7rem)] leading-[0.88] tracking-[-0.06em] text-foreground">
              {section.title}
            </h1>
            <p className="max-w-2xl text-[1.08rem] leading-8 text-[var(--muted)]">
              {section.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--rule)] pt-4">
            {["Opendoor", "DraftKings", "Coinbase", "Dropbox"].map((item) => (
              <span
                key={item}
                className="text-[0.78rem] uppercase tracking-[0.16em] text-[var(--muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:border-l lg:border-[var(--rule)] lg:pl-8">
          <div className="space-y-3">
            <p className="editorial-eyebrow">Intent</p>
            <p className="text-[1.02rem] leading-7 text-foreground">{section.heading}</p>
            <p className="text-[0.94rem] leading-7 text-[var(--muted)]">
              Designed to feel like a gallery of product worlds, with the prototype stage carrying more weight than the copy.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-t border-[var(--rule)] pt-4">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                Build now
              </p>
              <p className="mt-3 text-[0.92rem] leading-7 text-[var(--muted)]">
                Strong structure, motion, and embed readiness.
              </p>
            </div>
            <div className="border-t border-[var(--rule)] pt-4">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                Plug in later
              </p>
              <p className="mt-3 text-[0.92rem] leading-7 text-[var(--muted)]">
                Hosted demos, deeper views, or richer local prototype shells.
              </p>
            </div>
          </div>

          {section.notes ? (
            <div className="border-t border-[var(--rule)] pt-4">
              <p className="text-[0.84rem] leading-7 text-[var(--muted)]">
                {section.notes}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
