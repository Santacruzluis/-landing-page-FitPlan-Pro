/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para Render
  output: "standalone",

  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  },

  // Configuración de imágenes
  images: {
    domains: ["localhost"],
    unoptimized: true, // Para Render
  },

  // Configuración de redirecciones
  async redirects() {
    return [
      {
        source: "/api",
        destination: "/api/v1",
        permanent: true,
      },
    ];
  },

  // Configuración de headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Configuración experimental
  experimental: {
    // Optimizaciones para producción
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Configuración de webpack
  webpack: (config, { isServer }) => {
    // Optimizaciones adicionales
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
