"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/lib/constants";

export default function MempelaiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  const { male, female } = weddingData.couple;

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Mempelai</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mt-2">
           Kedua Mempelai
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="w-16 h-0.5 bg-gradient-to-r from-transparent to-gold" />
            <Heart className="w-5 h-5 text-vibrant-pink fill-vibrant-pink" />
            <span className="w-16 h-0.5 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>

        {/* Couple cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Female card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative bg-gradient-to-br from-blush/20 to-light-pink/20 rounded-3xl p-8 backdrop-blur-sm border border-blush/30 shadow-xl overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-vibrant-pink/20 to-transparent rounded-bl-full" />
              
              <div className="relative z-10 text-center">
                {/* Avatar placeholder */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blush to-vibrant-pink opacity-20" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blush to-light-pink flex items-center justify-center">
                    <span className="text-5xl">👰</span>
                  </div>
                  {/* Ring decoration */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-rolex text-cream text-xs rounded-full">
                    Putri
                  </div>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-rolex-dark mb-2">
                  {female.fullName}
                </h3>
                
                <p className="text-vibrant-pink font-sans mb-4">{female.position}</p>

                <div className="space-y-2 text-rolex/80 font-sans text-sm mb-6">
                  <p>{female.father}</p>
                  <p>&</p>
                  <p>{female.mother}</p>
                </div>

                <a
                  href={female.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-vibrant-pink to-blush text-white rounded-full text-sm font-sans hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-sm">📷</span>
                  <span>@{female.nickName.toLowerCase()}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Male card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            <div className="relative bg-gradient-to-br from-rolex/10 to-blush/10 rounded-3xl p-8 backdrop-blur-sm border border-rolex/20 shadow-xl overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rolex/20 to-transparent rounded-bl-full" />
              
              <div className="relative z-10 text-center">
                {/* Avatar placeholder */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rolex to-rolex-dark opacity-20" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-rolex/30 to-rolex flex items-center justify-center">
                    <span className="text-5xl">🤵</span>
                  </div>
                  {/* Ring decoration */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-vibrant-pink text-cream text-xs rounded-full">
                    Putra
                  </div>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-rolex-dark mb-2">
                  {male.fullName}
                </h3>
                
                <p className="text-vibrant-pink font-sans mb-4">{male.position}</p>

                <div className="space-y-2 text-rolex/80 font-sans text-sm mb-6">
                  <p>{male.father}</p>
                  <p>&</p>
                  <p>{male.mother}</p>
                </div>

                <a
                  href={male.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-rolex to-rolex-dark text-cream rounded-full text-sm font-sans hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-sm">📷</span>
                  <span>@{male.nickName.toLowerCase()}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connection symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-vibrant-pink to-rolex flex items-center justify-center shadow-lg">
            <span className="text-2xl">💍</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
