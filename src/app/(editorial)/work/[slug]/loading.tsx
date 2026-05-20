export default function Loading() {
  return (
    <div className="page-shell">
      <div className="page-content space-y-[var(--section-gap)]">
        <div className="h-4 w-28 rounded-full bg-[rgba(17,17,15,0.08)]" />
        <div className="@container/work-loading">
          <div className="grid gap-8 @6xl/work-loading:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              <div className="h-3 w-20 rounded-full bg-[rgba(17,17,15,0.08)]" />
              <div className="h-18 max-w-xl rounded-[32px] bg-[rgba(17,17,15,0.08)]" />
              <div className="h-24 max-w-2xl rounded-[28px] bg-[rgba(17,17,15,0.06)]" />
            </div>
            <div className="aspect-[16/10] rounded-[var(--frame-radius)] bg-[rgba(17,17,15,0.08)]" />
          </div>
        </div>
        <div className="auto-fit-grid">
          <div className="h-56 rounded-[var(--frame-radius)] bg-[rgba(17,17,15,0.06)]" />
          <div className="h-56 rounded-[var(--frame-radius)] bg-[rgba(17,17,15,0.06)]" />
          <div className="h-56 rounded-[var(--frame-radius)] bg-[rgba(17,17,15,0.06)]" />
        </div>
      </div>
    </div>
  );
}
