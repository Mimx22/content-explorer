import { Suspense } from 'react';
import ProductGrid, { ProductGridSkeleton } from '@/components/ProductGrid';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
        Content Explorer
      </h1>
      
      {/* 
        Using React Suspense for streaming!
        While ProductGrid is fetching data securely on the server, Next.js instantly 
        streams down the fallback (our skeletons). This drastically improves 
        perceived performance (UX) and prevents blocking the initial page render.
      */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </main>
  );
}
