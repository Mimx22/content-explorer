'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export interface Category {
  slug: string;
  name: string;
  url: string;
}

interface FilterSelectProps {
  categories: Category[];
  initialCategory?: string;
}

export default function FilterSelect({ categories, initialCategory = '' }: FilterSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    
    // Create new URLParams to ensure we don't wipe out the search query (?q=...)
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (selectedCategory) {
      currentParams.set('category', selectedCategory);
    } else {
      currentParams.delete('category');
    }

    // Push state so this action is recorded in history (unlike typing)
    const query = currentParams.toString();
    const newUrl = query ? `/?${query}` : '/';
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="w-full sm:w-auto">
      <select
        className="w-full sm:w-64 px-4 py-2 border border-gray-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm appearance-none"
        value={initialCategory}
        onChange={handleCategoryChange}
        aria-label="Filter by category"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: `right 0.5rem center`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `1.5em 1.5em`,
          paddingRight: `2.5rem`
        }}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
