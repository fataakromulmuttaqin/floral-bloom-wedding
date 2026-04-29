"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import 3D components to avoid SSR issues
const FloralScene = dynamic(() => import("./3d/FloralScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-cream" />
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <FloralScene />
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-transparent to-cream/80 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 bg-rolex/10 text-rolex text-sm font-sans rounded-full">
            ✿ Undangan Pernikahan ✿
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-rolex-dark mb-4"
        >
          The Wedding Of
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-vibrant-pink mb-2">
            Nisa & Fata
          </h2>
          <div className="flex items-center justify-center gap-4">
            <motion.span 
              className="w-12 h-0.5 bg-gold"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            <span className="text-gold font-serif text-lg">
              06 . 06 . 2026
            </span>
            <motion.span 
              className="w-12 h-0.5 bg-gold"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-sans text-rolex/80 text-lg mb-10"
        >
          Sabtu, 6 Juni 2026
        </motion.p>

        <motion.button
          onClick={onOpenInvitation}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-10 py-4 bg-rolex text-cream font-sans text-lg rounded-full shadow-xl overflow-hidden group"
        >
          {/* Shimmer effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          <span className="relative z-10 flex items-center gap-2">
            <span>✿</span>
            <span>Buka Undangan</span>
            <span>✿</span>
          </span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-rolex/60"
          >
            <span className="text-xs font-sans uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
