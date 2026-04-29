"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { Heart } from "lucide-react";
import { RoseSVG, PeonySVG, CherryBlossomSVG } from "./ui/FlowerDecorations";

// Dynamically import 3D to avoid SSR issues and reduce initial bundle
const FloralScene = dynamic(() => import("./3d/FloralScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/95 to-cream" />
});

interface HeroSectionProps {
  onOpenInvitation: () => void;
}

export default function HeroSection({ onOpenInvitation }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-cream/95 to-cream"
    >
      {/* 3D Background - Lightweight */}
      <div className="absolute inset-0 z-0">
        <FloralScene />
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream/70 z-10" />

      {/* SVG Flower Decorations - Background */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Large rose top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -top-10 -right-10 md:top-0 md:right-10"
        >
          <RoseSVG size={300} />
        </motion.div>
        
        {/* Peony bottom left */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 20 }}
          animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute -bottom-20 -left-10 md:bottom-10 md:left-10"
        >
          <PeonySVG size={250} />
        </motion.div>
        
        {/* Cherry blossom scattered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 1.2 }}
          className="absolute top-1/4 left-10"
        >
          <CherryBlossomSVG size={100} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2, delay: 1.4 }}
          className="absolute bottom-1/3 right-20"
        >
          <CherryBlossomSVG size={80} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 py-20 max-w-4xl mx-auto">
        {/* Top decoration */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.span 
              className="text-gold text-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✿
            </motion.span>
            <span className="text-rolex/60 text-sm uppercase tracking-[0.3em] font-light">
              Undangan Pernikahan
            </span>
            <motion.span 
              className="text-gold text-lg"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✿
            </motion.span>
          </div>
        </motion.div>

        {/* Main Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-rolex-dark leading-tight">
            Nisa
          </h1>
          <motion.div 
            className="flex items-center justify-center gap-4 my-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <Heart className="w-5 h-5 text-vibrant-pink fill-vibrant-pink" />
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </motion.div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-vibrant-pink leading-tight">
            & Fata
          </h1>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/40 backdrop-blur-sm rounded-full shadow-sm border border-blush/20">
            <span className="text-rolex/70 font-light text-sm md:text-base">
              Sabtu, 6 Juni 2026
            </span>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blush"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onOpenInvitation}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group relative px-10 py-4 bg-rolex text-cream font-sans text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          {/* Shimmer effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          <span className="relative z-10 flex items-center gap-3">
            <span className="text-blush">✿</span>
            <span>Buka Undangan</span>
            <span className="text-blush">✿</span>
          </span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : {}}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-rolex/50"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-light">Scroll</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
