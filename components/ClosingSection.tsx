"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { weddingData } from "@/lib/constants";

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-cream via-blush/20 to-rolex-dark overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float-slow">💐</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-float-slow" style={{ animationDelay: "1s" }}>🌸</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float-slow" style={{ animationDelay: "2s" }}>🌺</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float-slow" style={{ animationDelay: "0.5s" }}>💕</div>
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Sparkles className="w-10 h-10 mx-auto text-gold mb-6" />
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mb-4">
            Terima Kasih
          </h2>
          <p className="font-serif text-2xl md:text-3xl text-vibrant-pink mb-6">
            Nisa & Fata
          </p>
          <p className="text-rolex/80 font-sans max-w-lg mx-auto leading-relaxed">
            Merupakan suatu kehormatan dan kebahagian bagi kami apabila Bapak/Ibu/Saudara/i
            berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
        </motion.div>

        {/* Quran verse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 mb-12"
        >
          <p className="text-rolex-dark/80 font-sans italic text-sm leading-relaxed mb-3">
            "Jadilah bagian dari cerita kami, karena kehadiran Anda adalah
            doa yang paling berharga."
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-0.5 bg-gold" />
            <Heart className="w-4 h-4 text-vibrant-pink fill-vibrant-pink" />
            <span className="w-8 h-0.5 bg-gold" />
          </div>
        </motion.div>

        {/* Digital signatures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Bride signature */}
          <div className="text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-blush/30">
              <p className="text-rolex/60 font-sans text-sm mb-4">Dengan penuh cinta,</p>
              <p className="font-serif text-2xl text-rolex-dark mb-2">
                {weddingData.couple.female.fullName}
              </p>
              <p className="text-vibrant-pink font-sans text-sm">Putri Pertama</p>
              <div className="mt-4 pt-4 border-t border-blush/30">
                <div className="font-serif text-rolex/60 text-3xl italic">
                  Nisa
                </div>
              </div>
            </div>
          </div>

          {/* Groom signature */}
          <div className="text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-rolex/20">
              <p className="text-rolex/60 font-sans text-sm mb-4">Dengan segenap cinta,</p>
              <p className="font-serif text-2xl text-rolex-dark mb-2">
                {weddingData.couple.male.fullName}
              </p>
              <p className="text-vibrant-pink font-sans text-sm">Putra Ketiga</p>
              <div className="mt-4 pt-4 border-t border-rolex/20">
                <div className="font-serif text-rolex/60 text-3xl italic">
                  Fata
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-4 text-3xl">
            <span>🌸</span>
            <span>💒</span>
            <span>🌸</span>
          </div>
          
          <p className="font-serif text-xl text-rolex-dark">
            Save the Date
          </p>
          
          <p className="font-sans text-rolex/70">
            {weddingData.date.full}
          </p>

          <Heart className="w-8 h-8 mx-auto text-vibrant-pink fill-vibrant-pink mt-4" />
          
          <p className="font-sans text-rolex/60 text-sm mt-4">
            Kami yang berbahagia,
          </p>
          <p className="font-serif text-lg text-rolex-dark">
            Keluarga Besar {weddingData.couple.male.father.split(" ")[1]} & {weddingData.couple.female.father.split(" ")[1]}
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 py-4 text-center">
        <p className="text-cream/60 font-sans text-xs">
          Made with 💕 | Undangan Pernikahan Nisa & Fata 2026
        </p>
      </div>
    </section>
  );
}
