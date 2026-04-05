export default function ProductDetailLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-32 h-5 bg-gray-200 animate-pulse rounded mb-8" />

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Image Skeleton */}
          <div className="relative aspect-square bg-gray-50 rounded-2xl animate-pulse" />

          {/* Details Skeleton */}
          <div className="flex flex-col">
            <div className="flex gap-3 mb-4">
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full" />
              <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-md" />
            </div>

            <div className="w-3/4 h-10 bg-gray-200 animate-pulse rounded mb-4" />
            
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded mb-2 mt-4" />
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded mb-8" />

            <div className="mt-auto border-t border-gray-100 pt-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="w-10 h-4 bg-gray-200 animate-pulse rounded mb-2" />
                  <div className="w-24 h-10 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>

              <div className="w-full h-20 bg-gray-50 animate-pulse rounded-2xl border border-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
