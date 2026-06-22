export default function Loading() {
  return (
    <div className="page-shell">
      <div className="page-content @container/work-loading">
        <div className="w-full space-y-[clamp(3rem,6vw,6.5rem)]">
          <div className="grid gap-[clamp(1.5rem,4vw,4.5rem)] @5xl/work-loading:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.7fr)]">
            <div className="space-y-5">
              <div className="h-3 w-36 rounded-full bg-[rgba(17,17,15,0.08)]" />
              <div className="h-18 max-w-xl rounded-[32px] bg-[rgba(17,17,15,0.08)]" />
            </div>

            <div className="space-y-5 @5xl/work-loading:mt-[clamp(2.1rem,2.8vw,3rem)]">
              <div className="space-y-3">
                <div className="h-6 max-w-md rounded-full bg-[rgba(17,17,15,0.08)]" />
                <div className="h-6 max-w-sm rounded-full bg-[rgba(17,17,15,0.06)]" />
                <div className="h-6 max-w-xs rounded-full bg-[rgba(17,17,15,0.06)]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-7 w-28 rounded-full bg-[rgba(17,17,15,0.08)]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="aspect-[16/10] rounded-[var(--frame-radius)] bg-[rgba(17,17,15,0.08)]" />

          <div className="w-full space-y-4">
            <div className="h-8 w-full rounded-full bg-[rgba(17,17,15,0.08)]" />
            <div className="h-8 w-11/12 rounded-full bg-[rgba(17,17,15,0.06)]" />
            <div className="h-8 w-2/3 rounded-full bg-[rgba(17,17,15,0.06)]" />
          </div>

          <div className="space-y-[clamp(3rem,7vw,7rem)]">
            {[0, 1].map((item) => (
              <div key={item} className="@container/loading-project space-y-6">
                <div className="grid gap-6 @5xl/loading-project:grid-cols-[minmax(0,0.85fr)_minmax(18rem,1fr)]">
                  <div className="space-y-4">
                    <div className="h-3 w-24 rounded-full bg-[rgba(17,17,15,0.08)]" />
                    <div className="h-16 rounded-[28px] bg-[rgba(17,17,15,0.08)]" />
                    <div className="h-28 rounded-[28px] bg-[rgba(17,17,15,0.06)]" />
                  </div>
                  <div className="aspect-[16/10] rounded-[var(--frame-radius)] bg-[rgba(17,17,15,0.08)]" />
                </div>
                <div className="grid gap-3 @5xl/loading-project:grid-cols-3">
                  <div className="h-14 rounded-[20px] bg-[rgba(17,17,15,0.06)]" />
                  <div className="h-14 rounded-[20px] bg-[rgba(17,17,15,0.06)]" />
                  <div className="h-14 rounded-[20px] bg-[rgba(17,17,15,0.06)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
