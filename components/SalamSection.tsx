"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { weddingData } from "@/lib/constants";

export default function SalamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-cream to-white"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Decorative flower */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl mb-8"
        >
          🌸
        </motion.div>

        {/* Salam */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl md:text-4xl text-rolex-dark mb-8"
        >
          {weddingData.salam}
        </motion.p>

        {/* Opening text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4 mb-12"
        >
          <p className="font-sans text-rolex/80 text-lg leading-relaxed">
            Dengan memohon rahmat dan ridho Allah SWT, serta mengikuti Sunnah Rasulullah SAW,
            kami bermaksud menyembahyangkan dan mengundang Bapak/Ibu/Saudara/i pada acara
            pernikahan putra-putri kami:
          </p>
        </motion.div>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-vibrant-pink mb-2">
            Nisa & Fata
          </h2>
        </motion.div>

        {/* Quran verse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-blush/30"
        >
          {/* Quote marks */}
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-blush/50">"</span>
          
          <p className="font-sans text-rolex-dark/90 text-base md:text-lg leading-relaxed italic mb-4">
            {weddingData.quranVerse.text}
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-0.5 bg-gold" />
            <p className="font-serif text-gold text-lg">
              {weddingData.quranVerse.surah} {weddingData.quranVerse.chapter}:{weddingData.quranVerse.verse}
            </p>
            <span className="w-8 h-0.5 bg-gold" />
          </div>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <span className="text-2xl">🌺</span>
          <span className="text-gold">✿</span>
          <span className="text-2xl">🌺</span>
        </motion.div>
      </div>
    </section>
  );
}
