/**
 * Represents a customer review for a product.
 */
export interface ProductReview {
  rating: number;
  comment: string;
  date: string; // ISO 8601 date string
  reviewerName: string;
  reviewerEmail: string;
}

/**
 * Physical dimensions of the product.
 */
export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

/**
 * Metadata associated with the product, such as barcodes and tracking dates.
 */
export interface ProductMeta {
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  barcode: string;
  qrCode: string; // URL to the generated QR code image
}

/**
 * The main Product structure representing a single item from the DummyJSON API.
 */
export interface Product {
  /** Unique identifier for the product */
  id: number;
  /** Name of the product */
  title: string;
  /** Detailed description of the product */
  description: string;
  /** Category the product belongs to (e.g., "beauty", "fragrances") */
  category: string;
  /** Regular price of the product in USD */
  price: number;
  /** Current discount applied to the price as a percentage */
  discountPercentage: number;
  /** Average customer rating out of 5 */
  rating: number;
  /** Current available stock quantity */
  stock: number;
  /** List of search tags associated with the product */
  tags: string[];
  /** Optional brand name (not all products have a brand listed) */
  brand?: string;
  /** Stock Keeping Unit identifier */
  sku: string;
  /** Weight of the product */
  weight: number;
  /** Detailed physical dimensions */
  dimensions: ProductDimensions;
  /** Summary of warranty terms */
  warrantyInformation: string;
  /** Summary of shipping estimates and conditions */
  shippingInformation: string;
  /** Current availability status (e.g., "In Stock", "Low Stock") */
  availabilityStatus: string;
  /** List of customer reviews */
  reviews: ProductReview[];
  /** Summary of the return terms */
  returnPolicy: string;
  /** The minimum quantity required to place an order */
  minimumOrderQuantity: number;
  /** Backend metadata for the product record */
  meta: ProductMeta;
  /** Array of URLs pointing to full-size product images */
  images: string[];
  /** URL pointing to a smaller thumbnail representation of the product */
  thumbnail: string;
}

/**
 * The structure of the paginated API response when fetching a products list.
 */
export interface ProductsResponse {
  /** The list of individual products retrieved in this batch */
  products: Product[];
  /** Total number of products available in the database */
  total: number;
  /** The number of items skipped (used for pagination offset) */
  skip: number;
  /** The maximum number of items requested in this batch */
  limit: number;
}
