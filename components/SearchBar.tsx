'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Synchronize state if URL changes externally (e.g. going back/forward)
  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    // Debounce the search input by 400ms to avoid spamming the URL/API
    // while the user is actively typing.
    const handler = setTimeout(() => {
      // Create a new URLSearchParams object based on existing ones
      // so we don't accidentally wipe out the category filter.
      const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
      
      if (searchTerm) {
        currentParams.set('q', searchTerm);
      } else {
        currentParams.delete('q');
      }

      // We use replace instead of push because typing shouldn't create 50 history entries
      const query = currentParams.toString();
      const newUrl = query ? `/?${query}` : '/';
      router.replace(newUrl, { scroll: false });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm, router, searchParams]);

  return (
    <div className="relative flex-grow max-w-md w-full">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
        aria-label="Search products"
      />
    </div>
  );
}
