export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--footer-border)] py-[var(--footer-padding-y)] text-[0.84rem] text-[var(--muted)]">
      <div className="page-content flex flex-col gap-2 px-[var(--page-gutter)] md:flex-row md:items-center md:justify-between">
        <p>Editorial work feed experiment.</p>
        <p>© 2026 Danilo Callejas</p>
      </div>
    </footer>
  );
}
