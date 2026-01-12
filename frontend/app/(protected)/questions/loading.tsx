export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-7 w-80 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-4 w-96 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>

          <div className="flex justify-between">
            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-10 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4"
            >
              <div className="flex justify-between">
                <div className="h-4 w-64 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              </div>

              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />

              <div className="space-y-2">
                {Array.from({ length: 5 }).map((__, j) => (
                  <div
                    key={j}
                    className="h-12 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"
                  />
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <div className="h-9 w-20 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-9 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 pt-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
