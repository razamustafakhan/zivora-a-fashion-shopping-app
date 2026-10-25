export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6 p-6 sm:p-8">
      {/* Page heading */}
      <div className="space-y-2">
        <div className="h-7 w-52 rounded bg-[#e8e2d7]" />
        <div className="h-4 w-72 max-w-full rounded bg-[#eee9df]" />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="space-y-3 border border-[#eae5db] bg-white p-5"
          >
            <div className="h-4 w-24 rounded bg-[#eee9df]" />
            <div className="h-8 w-32 rounded bg-[#e8e2d7]" />
          </div>
        ))}
      </div>

      {/* Table placeholder */}
      <div className="space-y-4 border border-[#eae5db] bg-white p-5">
        <div className="h-5 w-40 rounded bg-[#e8e2d7]" />

        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex gap-4 border-t border-[#eee9df] py-4">
            <div className="h-10 w-10 rounded bg-[#eee9df]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-[#e8e2d7]" />
              <div className="h-3 w-2/3 rounded bg-[#eee9df]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
