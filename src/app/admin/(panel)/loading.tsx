/**
 * Shown the instant an admin clicks a section, while that section's data is
 * fetched. The sidebar stays in place; only this area changes.
 */
export default function PanelLoading() {
  const bar = "animate-pulse rounded bg-paper-deep";
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className={`${bar} h-8 w-48`} />
      <div className={`${bar} mt-3 h-4 w-80 max-w-full`} />
      <div className="acard mt-9 divide-y divide-rule">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center justify-between gap-6 px-5 py-4">
            <div className="min-w-0 flex-1">
              <div className={`${bar} h-4 w-2/5`} />
              <div className={`${bar} mt-2 h-3 w-3/5`} />
            </div>
            <div className={`${bar} h-5 w-16 rounded-full`} />
          </div>
        ))}
      </div>
    </div>
  );
}
