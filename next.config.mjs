/** @type {import('next').NextConfig} */
const nextConfig = {
   outputFileTracingIncludes: { '/api-docs': ['./src/app/api/**/*'] },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;