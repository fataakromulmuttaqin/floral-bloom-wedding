"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RoseSVG, SmallFlowerSVG } from "./ui/FlowerDecorations";
import { weddingData } from "@/lib/constants";

export default function SalamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-gradient-to-b from-cream to-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          className="absolute top-20 -left-10"
        >
          <RoseSVG size={200} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: 30 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-20 -right-10"
        >
          <RoseSVG size={180} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="absolute top-1/3 right-10"
        >
          <SmallFlowerSVG size={80} color="#FFB6C1" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2, delay: 0.9 }}
          className="absolute bottom-1/3 left-16"
        >
          <SmallFlowerSVG size={60} color="#E8B4BC" />
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        {/* Salam */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.span 
              className="text-gold text-xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🌸
            </motion.span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rolex-dark mb-4 leading-relaxed">
            {weddingData.salam}
          </h2>
          
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold">✿</span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>

        {/* Opening text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <p className="font-sans text-rolex/75 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Dengan memohon rahmat dan ridho Allah SWT, serta mengikuti Sunnah Rasulullah SAW,
            kami bermaksud mengundang Bapak/Ibu/Saudara/i pada acara pernikahan putra-putri kami:
          </p>
        </motion.div>

        {/* Couple names - large and elegant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.span 
              className="text-vibrant-pink text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.span>
          </div>
          <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-rolex-dark">
            Nisa & Fata
          </h3>
        </motion.div>

        {/* Quran verse - elegant card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-blush/30 max-w-2xl mx-auto"
        >
          {/* Decorative corners */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-5xl text-blush/40">"</span>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-5xl text-blush/40 rotate-180">"</span>
          
          <p className="font-sans text-rolex-dark/85 text-base md:text-lg leading-relaxed italic mb-6">
            {weddingData.quranVerse.text}
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <p className="font-serif text-gold text-lg tracking-wide">
              {weddingData.quranVerse.surah} {weddingData.quranVerse.chapter}:{weddingData.quranVerse.verse}
            </p>
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: ["#F8C7D9", "#D4AF77", "#FFB6C1"][i] }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
