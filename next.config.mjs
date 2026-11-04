/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: emits a plain HTML/CSS/JS site into `out/` for FTP hosting
  // (no Node server at runtime). Valid here because there is no backend,
  // database, or API routes.
  output: 'export',
  // `next/image` server optimization is unavailable in a static export.
  images: {
    unoptimized: true,
  },
  // Emit each route as a folder with index.html so Apache-style hosts resolve
  // clean URLs correctly.
  trailingSlash: true,
};

export default nextConfig;
