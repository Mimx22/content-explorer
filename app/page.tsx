import { Suspense } from 'react';
import ProductGrid, { ProductGridSkeleton } from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import FilterSelect, { Category } from '@/components/FilterSelect';
import { getCategories } from '@/lib/api';

export default async function HomePage({
  searchParams,
}: {
  // searchParams in a server component is an object representing URL query string parameters
  searchParams: { [key: string]: string | undefined };
}) {
  // Await searchParams in Next.js 15+ if needed, but in 14 it's sync. Assuming sync based on version.
  const query = searchParams?.q || '';
  const category = searchParams?.category || '';
  const page = parseInt(searchParams?.page || '1', 10);

  // Fetch categories directly on the server to pass to our FilterSelect component.
  // This avoids a wasteful client-side fetch on page load.
  const categories = (await getCategories()) as Category[];

  // By combining query, category, and page, we force React Suspense to trigger 
  // its fallback *every time* the user executes a new search/filter/pagination,
  // providing vital visual feedback instead of freezing the UI.
  const suspenseKey = `${query}-${category}-${page}`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Content Explorer
          </h1>
          <p className="text-gray-500 mt-2">
            Discover our curated collection of premium products.
          </p>
        </div>
        
        {/* Search and Filters Section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <SearchBar initialQuery={query} />
          <FilterSelect categories={categories} initialCategory={category} />
        </div>
      </div>
      
      {/* 
        Using React Suspense for streaming!
        While ProductGrid is fetching data securely on the server, Next.js instantly 
        streams down the fallback (our skeletons). 
      */}
      <Suspense key={suspenseKey} fallback={<ProductGridSkeleton />}>
        {/* @ts-expect-error Async Server Component */}
        <ProductGrid query={query} category={category} page={page} />
      </Suspense>
    </main>
  );
}
