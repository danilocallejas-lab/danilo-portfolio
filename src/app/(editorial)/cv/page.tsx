import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { experience } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "CV",
  description:
    "A concise timeline of Danilo Callejas's product design and art direction work.",
};

export default function CvPage() {
  return (
    <div className="page-shell">
      <div className="page-content space-y-[var(--section-gap)]">
        <section className="space-y-4">
          {experience.map((item, index) => {
            const row = (
              <div className="surface-card @container/cv-row px-[var(--panel-padding)] py-[var(--panel-padding)]">
                <div className="grid gap-4 @6xl/cv-row:grid-cols-[minmax(0,1.2fr)_14rem_18rem] @6xl/cv-row:items-start">
                  <div className="space-y-2">
                    <h2 className="type-h3 font-display text-foreground">
                      {item.company}
                    </h2>
                    <p className="text-[1rem] leading-7 text-[var(--muted)]">
                      {item.focus}
                    </p>
                  </div>
                  <div>
                    <p className="editorial-eyebrow mb-2">Role</p>
                    <p className="text-[0.98rem] leading-7 text-[var(--muted)]">
                      {item.role}
                    </p>
                  </div>
                  <div>
                    <p className="editorial-eyebrow mb-2">Years</p>
                    <p className="text-[0.98rem] leading-7 text-[var(--muted)]">
                      {item.years}
                    </p>
                  </div>
                </div>
              </div>
            );

            if (!item.href) {
              return (
                <Reveal key={item.company} index={index}>
                  {row}
                </Reveal>
              );
            }

            return (
              <Reveal key={item.company} index={index}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  {row}
                </a>
              </Reveal>
            );
          })}
        </section>
      </div>
    </div>
  );
}
