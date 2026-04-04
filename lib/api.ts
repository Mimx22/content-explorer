/**
 * API utility file for fetching data centrally.
 * 
 * WHY THIS EXISTS:
 * Centralizing API logic in one file ensures:
 * 1. Reusability: Components don't have to rewrite fetch logic.
 * 2. Consistency: Error handling and headers are managed uniformly.
 * 3. Scalability: Changing the API structure or base URL only requires updates in one place.
 * 4. Clean Components: Keep UI components focused on rendering instead of data fetching.
 */

// BASE_URL is defined as a constant to avoid hardcoding it across multiple functions.
// If the API environment changes (e.g., from dummyjson to a custom backend), 
// we only need to update this single value.
const BASE_URL = 'https://dummyjson.com';

/**
 * Reusable helper function to handle fetch requests and errors.
 * 
 * WHY: This wraps the native `fetch` API to provide standard configuration
 * (like JSON content types) and to automatically handle HTTP errors. Rather than
 * dealing with response codes inside every single page/component, we throw
 * an error here which can be caught by Next.js error boundaries or local try/catch blocks.
 *
 * @param endpoint - The path to append to the base URL (e.g., '/products')
 * @param options - the fetch options (method, headers, body, etc.)
 */
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Check if the response is successful (status in the range 200-299)
    // WHY: `fetch` does not throw an error on HTTP errors (like 404 or 500).
    if (!response.ok) {
      throw new Error(`API Error: Failed to fetch data from ${endpoint} (Status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    // WHY: Logging centrally helps debug API connection issues independently of the component rendering.
    console.error(`[API Fetch Error] on ${endpoint}:`, error);
    // Re-throw so the caller can handle the failed state UI
    throw error;
  }
}

// -------------------------------------------------------------
// ENDPOINTS
// -------------------------------------------------------------

/**
 * Fetch products with pagination.
 * 
 * WHY: Loading all products at once is catastrophic for performance.
 * We use skip & limit to fetch only the required chunk for a page.
 *
 * @param limit - Number of elements to return
 * @param skip - Number of elements to skip
 */
export async function getProducts(limit: number = 30, skip: number = 0) {
  return fetchAPI(`/products?limit=${limit}&skip=${skip}`);
}

/**
 * Fetch a single product by ID.
 * 
 * WHY: This is the core logic for dynamic product detail routes (e.g., /products/[id]).
 * We abstract it here to keep the Next.js page component clean.
 *
 * @param id - The unique identifier of the product
 */
export async function getProductById(id: number) {
  return fetchAPI(`/products/${id}`);
}

/**
 * Search products using a query string.
 * 
 * WHY: Offloads searching logic to the backend/API rather than downloading 
 * the entire dataset to the client and filtering. We encode the URI component 
 * to safely handle spaces and special characters.
 *
 * @param query - The user search string
 */
export async function searchProducts(query: string) {
  const encodedQuery = encodeURIComponent(query);
  return fetchAPI(`/products/search?q=${encodedQuery}`);
}

/**
 * Fetch all product categories.
 * 
 * WHY: This is useful for building navigation menus or filter dropdowns.
 * We rely on an endpoint instead of hardcoded categories to dynamically support new categories.
 */
export async function getCategories() {
  return fetchAPI('/products/categories');
}
