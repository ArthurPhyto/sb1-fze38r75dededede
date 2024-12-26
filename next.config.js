/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://gratuit-streaming.fr'
  }
};

module.exports = nextConfig;