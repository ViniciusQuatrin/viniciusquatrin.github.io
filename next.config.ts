import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ajuda o GitHub Pages a resolver rotas de pastas estáticas
  trailingSlash: true,
};

export default nextConfig;
