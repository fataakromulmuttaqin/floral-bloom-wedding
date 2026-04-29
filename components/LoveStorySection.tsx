"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Calendar } from "lucide-react";
import { weddingData } from "@/lib/constants";

export default function LoveStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  const milestones = weddingData.loveStory;

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-cream to-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Love Story</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mt-2">
            Kisah Cinta Kami
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Heart className="w-5 h-5 text-vibrant-pink fill-vibrant-pink" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blush via-vibrant-pink to-rolex hidden md:block" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blush/30">
                    <span className="inline-block px-3 py-1 bg-vibrant-pink/10 text-vibrant-pink text-xs font-sans rounded-full mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="font-serif text-xl text-rolex-dark mb-2">
                      {milestone.title}
                    </h3>
                    <div className="flex items-center gap-2 text-rolex/60 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{milestone.date}</span>
                    </div>
                    <p className="text-rolex/80 font-sans text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-vibrant-pink to-rolex flex items-center justify-center shadow-lg flex-shrink-0">
                  <Heart className="w-5 h-5 text-cream fill-cream" />
                </div>

                {/* Empty space for opposite side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <span className="text-3xl">💕</span>
        </motion.div>
      </div>
    </section>
  );
}
