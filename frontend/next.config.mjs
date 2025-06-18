/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,  // Adiciona barras no final das URLs
  images: { 
    unoptimized: true   // Desativa otimização de imagens para export
  },
  // Remova TODAS as configurações de basePath e assetPrefix temporariamente
};

export default nextConfig;