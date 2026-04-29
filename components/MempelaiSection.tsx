"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { RoseSVG } from "./ui/FlowerDecorations";
import { weddingData } from "@/lib/constants";

export default function MempelaiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  const { male, female } = weddingData.couple;

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white to-cream/50 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 -left-20"
        >
          <RoseSVG size={250} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-1/4 -right-20"
        >
          <RoseSVG size={200} />
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-gold text-sm uppercase tracking-[0.3em] font-light inline-block mb-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Mempelai
          </motion.span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark">
            Kedua Mempelai
          </h2>
          <motion.div 
            className="flex items-center justify-center gap-3 mt-4"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold" />
            <Heart className="w-4 h-4 text-vibrant-pink fill-vibrant-pink" />
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold" />
          </motion.div>
        </motion.div>

        {/* Couple cards - elegant side by side */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Bride card */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white to-blush/20 rounded-3xl p-8 shadow-xl border border-blush/30 overflow-hidden">
              {/* Top decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-vibrant-pink/10 to-transparent rounded-bl-full" />
              
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring" }}
                className="relative w-28 h-28 mx-auto mb-6"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blush to-vibrant-pink/30" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blush/80 to-light-pink flex items-center justify-center shadow-inner">
                  <span className="text-5xl">👰</span>
                </div>
                {/* Ring */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-vibrant-pink to-blush text-white text-xs font-sans rounded-full shadow-lg">
                  Putri
                </div>
              </motion.div>

              <div className="text-center relative z-10">
                <motion.h3 
                  className="font-serif text-2xl md:text-3xl text-rolex-dark mb-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  {female.fullName}
                </motion.h3>
                
                <motion.p 
                  className="text-vibrant-pink/80 font-sans text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  {female.position}
                </motion.p>

                <motion.div 
                  className="space-y-1 text-rolex/70 font-sans text-sm mb-6"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <p>{female.father}</p>
                  <p className="text-blush/60">&</p>
                  <p>{female.mother}</p>
                </motion.div>

                <motion.a
                  href={female.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-vibrant-pink to-blush text-white rounded-full text-sm font-sans shadow-md hover:shadow-lg transition-shadow"
                >
                  <span>📷</span>
                  <span>@{female.nickName.toLowerCase()}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Groom card */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white to-rolex/5 rounded-3xl p-8 shadow-xl border border-rolex/20 overflow-hidden">
              {/* Top decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rolex/10 to-transparent rounded-bl-full" />
              
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.7, type: "spring" }}
                className="relative w-28 h-28 mx-auto mb-6"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rolex/20 to-rolex-dark/30" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-rolex/30 to-rolex flex items-center justify-center shadow-inner">
                  <span className="text-5xl">🤵</span>
                </div>
                {/* Ring */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-rolex to-rolex-dark text-cream text-xs font-sans rounded-full shadow-lg">
                  Putra
                </div>
              </motion.div>

              <div className="text-center relative z-10">
                <motion.h3 
                  className="font-serif text-2xl md:text-3xl text-rolex-dark mb-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  {male.fullName}
                </motion.h3>
                
                <motion.p 
                  className="text-vibrant-pink/80 font-sans text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  {male.position}
                </motion.p>

                <motion.div 
                  className="space-y-1 text-rolex/70 font-sans text-sm mb-6"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                >
                  <p>{male.father}</p>
                  <p className="text-rolex/30">&</p>
                  <p>{male.mother}</p>
                </motion.div>

                <motion.a
                  href={male.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rolex to-rolex-dark text-cream rounded-full text-sm font-sans shadow-md hover:shadow-lg transition-shadow"
                >
                  <span>📷</span>
                  <span>@{male.nickName.toLowerCase()}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connection symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center mt-8"
        >
          <motion.div 
            className="w-14 h-14 rounded-full bg-gradient-to-br from-vibrant-pink to-rolex flex items-center justify-center shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-2xl">💍</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
