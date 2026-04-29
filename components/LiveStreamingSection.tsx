"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Video, PlayCircle } from "lucide-react";
import { weddingData } from "@/lib/constants";

export default function LiveStreamingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  if (!weddingData.liveStreaming.enabled) return null;

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-white to-cream"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Live Streaming</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mt-2">
            Saksikan di Mana Saja
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-rolex/80 font-sans mb-8"
        >
          Bagi yang tidak dapat hadir secara langsung, saksikan pernikahan kami
          melalui live streaming berikut ini.
        </motion.p>

        <motion.a
          href={weddingData.liveStreaming.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-vibrant-pink to-blush text-white font-sans text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <PlayCircle className="w-6 h-6" />
          <span>Tonton di {weddingData.liveStreaming.platform}</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <Video className="w-12 h-12 mx-auto text-blush" />
        </motion.div>
      </div>
    </section>
  );
}
