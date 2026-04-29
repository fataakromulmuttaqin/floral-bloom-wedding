"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Calendar, User, Shirt } from "lucide-react";
import { weddingData } from "@/lib/constants";

export default function EventSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-cream to-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Our Events</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mt-2">
            Akad & Resepsi
          </h2>
        </motion.div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Akad */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-blush/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rolex to-rolex-dark flex items-center justify-center">
                <User className="w-6 h-6 text-cream" />
              </div>
              <h3 className="font-serif text-2xl text-rolex-dark">
                {weddingData.events.akad.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-vibrant-pink" />
                <span className="text-rolex font-sans">
                  {weddingData.events.akad.date}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-vibrant-pink" />
                <span className="text-rolex font-sans">
                  {weddingData.events.akad.time}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-vibrant-pink flex-shrink-0 mt-0.5" />
                <span className="text-rolex font-sans">
                  {weddingData.events.akad.location}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-rolex/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vibrant-pink to-blush flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="font-serif text-2xl text-rolex-dark">
                {weddingData.events.resepsi.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-vibrant-pink" />
                <span className="text-rolex font-sans">
                  {weddingData.events.resepsi.date}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-vibrant-pink" />
                <span className="text-rolex font-sans">
                  {weddingData.events.resepsi.time}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-vibrant-pink flex-shrink-0 mt-0.5" />
                <span className="text-rolex font-sans">
                  {weddingData.events.resepsi.location}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-blush/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63338.5778!2d109.6!3d-7.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8000b0f0e0e0%3A0x0!2sKlapasawit!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: "1rem" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Location"
            />
          </div>
        </motion.div>

        {/* Dresscode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-rolex/10 via-blush/20 to-rolex/10 rounded-3xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shirt className="w-6 h-6 text-rolex" />
            <h3 className="font-serif text-2xl text-rolex-dark">
              {weddingData.dresscode.name}
            </h3>
          </div>
          <p className="text-rolex/80 font-sans">
            {weddingData.dresscode.description}
          </p>
          <p className="text-vibrant-pink font-sans mt-2 text-sm">
            {weddingData.dresscode.colorHint}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
