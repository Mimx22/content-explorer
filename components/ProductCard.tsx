import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    // Structuring the card as a block link to make the entire clickable surface semantic and accessible.
    // Keeping this component minimal and reusable for different listing contexts.
    <Link 
      href={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`View details for ${product.title}`}
    >
      {/* 
        Image Container 
        Using a fixed aspect ratio (aspect-square) ensures the grid remains uniform 
        regardless of the original image dimensions. We use bg-gray-50 to provide a subtle 
        skeleton feel while the image loads.
      */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden flex-shrink-0">
        {/* Using Next.js Image for automatic optimization and better performance (WebP, lazy loading) */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
        />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title and Badge row */}
        <div className="flex justify-between items-start gap-4 mb-2">
          {/* Using line-clamp-1 to truncate exceptionally long titles and maintain layout integrity */}
          <h3 className="font-semibold text-gray-900 text-lg leading-snug line-clamp-1" title={product.title}>
            {product.title}
          </h3>
          
          {/* Rating Badge */}
          <span className="flex items-center flex-shrink-0 text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
            <svg className="w-3.5 h-3.5 mr-1 fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* 
          Using mt-auto to push the price section to the very bottom of the card. 
          This ensures all cards in a grid have elements aligned consistently, even if titles wrap. 
        */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          {/* Subtle visual affordance indicating clickability */}
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
