import { getProducts, searchProducts, getProductsByCategory } from '@/lib/api';
import { ProductsResponse } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  query?: string;
  category?: string;
}

/**
 * ProductGrid Component
 * 
 * WHY SERVER-SIDE FETCHING?
 * This is an Async Server Component. By fetching data on the server instead of the client:
 * 1. Performance: We ship zero JavaScript to the client for the fetching logic.
 * 2. Speed: The API request executes rapidly from the Next.js backend, reducing latency.
 * 3. SEO: Search engines receive fully populated HTML, making the products perfectly indexable.
 * 
 * Note on Loading States: In Next.js App Router, loading states for server components are 
 * typically handled seamlessly by wrapping the component in <Suspense> or using a loading.tsx file 
 * at the route level.
 */
export default async function ProductGrid({ query = '', category = '' }: ProductGridProps) {
  try {
    let data: ProductsResponse;

    // We determine which API function to call based on the active filters
    if (query) {
      data = (await searchProducts(query)) as ProductsResponse;
      // DummyJSON's search endpoint doesn't natively filter by category
      // So if both a query and category exist, we filter the query results in-memory
      if (category && data.products) {
        data.products = data.products.filter(p => p.category === category);
      }
    } else if (category) {
      // If only a category is selected, use the category-specific endpoint
      data = (await getProductsByCategory(category)) as ProductsResponse;
    } else {
      // Default: fetch the first 20 products
      data = (await getProducts(20, 0)) as ProductsResponse;
    }

    const products = data?.products;

    // Handle the empty/zero-results state gracefully so the UI remains polished.
    if (!products || products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-3xl border border-gray-100">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-500 text-sm text-center max-w-sm">
            We couldn't find any products matching your filters. Try adjusting your search!
          </p>
        </div>
      );
    }

    // Using Tailwind CSS Grid for a fully responsive layout.
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );

  } catch (error) {
    // Error Boundary: If the API fails or there's a network issue, we catch it locally.
    // This isolates the failure so the header, footer, and rest of the page don't crash.
    console.error('Error fetching products inside ProductGrid:', error);
    
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-red-50 rounded-3xl border border-red-100">
        <svg className="w-12 h-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-bold text-red-800 mb-2">Failed to load products</h3>
        <p className="text-red-600 text-sm opacity-90 text-center max-w-sm">
          There was an issue connecting to our servers. Please refresh the page to try again.
        </p>
      </div>
    );
  }
}

/**
 * ProductGridSkeleton
 * 
 * Reusable skeleton loader that matches the exact structure of the ProductGrid.
 * Displayed instantly using React Suspense while the server is fetching data,
 * massively improving perceived performance (UX).
 */
export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm h-[380px]">
          {/* Image Skeleton */}
          <div className="w-full aspect-square bg-gray-100 animate-pulse" />
          
          {/* Content Skeleton */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse mb-3" />
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse mb-auto" />
            <div className="mt-auto pt-4 flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
