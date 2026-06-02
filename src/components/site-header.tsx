import Link from "next/link";
import { HeaderContrastSync } from "@/components/header-contrast-sync";
import { SiteHeaderControls } from "@/components/site-header-controls";
import { socialLinks } from "@/lib/site-content";

type HeaderLink = {
  label: string;
  href: string;
  external?: boolean;
};

const defaultHeaderLinks: HeaderLink[] = [
  { label: "Archive", href: "/archive" },
];

function HeaderLinkItem({ link }: { link: HeaderLink }) {
  const sharedClassName =
    "tap-target site-header-link inline-flex items-center rounded-full px-2 text-[var(--site-header-foreground,var(--foreground))]";

  if (link.external) {
    return (
      <a href={link.href} className={sharedClassName}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={sharedClassName}>
      {link.label}
    </Link>
  );
}

export function GalleryHeader({
  navItems = defaultHeaderLinks,
  showSocialLinks = true,
}: {
  navItems?: HeaderLink[];
  showSocialLinks?: boolean;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <HeaderContrastSync />
      <div className="site-header-shell page-content flex items-center justify-between gap-4 px-[var(--page-gutter)] py-[var(--header-padding-y)] text-[clamp(1rem,0.9rem+0.4vw,1.15rem)] font-medium tracking-[-0.03em] text-[var(--site-header-foreground,var(--foreground))]">
        <Link href="/" className="tap-target inline-flex items-center text-[var(--site-header-foreground,var(--foreground))]">
          Danilo Callejas
        </Link>

        {navItems.length || showSocialLinks ? (
          <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-[0.92rem] font-medium tracking-[-0.02em]">
            <SiteHeaderControls />

            {navItems.length ? (
              <nav className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1">
                {navItems.map((link) => (
                  <HeaderLinkItem key={`${link.label}-${link.href}`} link={link} />
                ))}
              </nav>
            ) : null}

            {showSocialLinks ? (
              <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tap-target site-header-link inline-flex items-center rounded-full px-2 text-[var(--site-header-foreground,var(--foreground))]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
