import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile three.js related packages
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
  },
  
  // Turbopack config (default in Next.js 16+)
  turbopack: {
    root: "/home/fataakromulm/ruangkerja/floral-bloom-wedding",
  },
};

export default nextConfig;
