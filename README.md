# Content Explorer

This is a modern [Next.js](https://nextjs.org) application, bootstrapped with `create-next-app` inside the `content-explorer` workspace. The application is designed to be a robust frontend interface with a well-structured pattern for API data collection from external sources.

## Features Currently Implemented

- **Next.js App Router**: Utilizing the latest App Router structure for efficient server-side rendering and routing.
- **TypeScript**: Ensuring type safety throughout development.
- **Tailwind CSS**: Utility-first CSS framework for rapid and scalable UI design.
- **API Helper Structure**: Centralized API functions specifically implemented to decouple network requests from UI components.

## Project Structure Highlights

### `lib/api.ts`
All external data fetching is centralized in abstract handler functions found in `lib/api.ts`.
- **`fetchAPI` wrapper**: Encapsulates native `fetch` adding robust try/catch logic and HTTP error interception gracefully so UI components handle clean APIs.
- **`getProducts`**: Fetches product listings with standard skip & limit parameters built for performant pagination.
- **`getProductById`**: Allows detail pages to reliably grab one product without parsing logic scattered.
- **`searchProducts`**: Dedicated remote-server query function to enable global searching rather than downloading data arrays and client-side filtering.
- **`getCategories`**: Abstract function returning structured category lists for dynamic navigation bars.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Principles & Documentation Strategy
As we go on, **every section will be thoroughly documented with comments** detailing the "WHY" behind decisions rather than just what the syntax is explicitly doing. This README will evolve alongside application features as they get implemented.
