"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { weddingData } from "@/lib/constants";
import CountdownTimer from "./ui/CountdownTimer";

export default function SaveDateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-white to-cream"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Save the Date</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mt-2">
            Tanggal Pernikahan
          </h2>
        </motion.div>

        {/* Date info cards */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-blush/30"
          >
            <Calendar className="w-6 h-6 mx-auto mb-2 text-vibrant-pink" />
            <p className="font-serif text-2xl md:text-3xl text-rolex-dark">
              {weddingData.date.date}
            </p>
            <p className="text-rolex/70 text-sm">{weddingData.date.month}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-blush/30"
          >
            <Clock className="w-6 h-6 mx-auto mb-2 text-vibrant-pink" />
            <p className="font-serif text-2xl md:text-3xl text-rolex-dark">
              10:00
            </p>
            <p className="text-rolex/70 text-sm">WIB</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-blush/30"
          >
            <Calendar className="w-6 h-6 mx-auto mb-2 text-vibrant-pink" />
            <p className="font-serif text-2xl md:text-3xl text-rolex-dark">
              2026
            </p>
            <p className="text-rolex/70 text-sm">{weddingData.date.day}</p>
          </motion.div>
        </div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <CountdownTimer targetDate={weddingData.date.timestamp} />
        </motion.div>

        {/* Location hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-rolex/10 rounded-full">
            <MapPin className="w-5 h-5 text-rolex" />
            <span className="text-rolex font-sans">
              {weddingData.events.resepsi.location}
            </span>
          </div>
        </motion.div>

        {/* Decorative flowers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <span className="text-3xl">🌸</span>
          <span className="text-2xl">💐</span>
          <span className="text-3xl">🌸</span>
        </motion.div>
      </div>
    </section>
  );
}
