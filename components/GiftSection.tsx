"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Gift, Copy, Check, CreditCard, MapPin, Phone, Heart } from "lucide-react";
import { weddingData } from "@/lib/constants";

interface CopyButtonProps {
  text: string;
  label: string;
}

function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans
        transition-all duration-300
        ${copied 
          ? "bg-green-500 text-white" 
          : "bg-rolex text-cream hover:bg-rolex-dark"
        }
      `}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center gap-1"
          >
            <Check className="w-4 h-4" />
            <span>Tersalin!</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center gap-1"
          >
            <Copy className="w-4 h-4" />
            <span>Salin</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function GiftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-white to-cream"
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Wedding Gift</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mt-2">
            Hadiah Pernikahan
          </h2>
          <p className="text-rolex/70 font-sans mt-4 max-w-md mx-auto">
            Kehadiran Anda adalah hadiah terindah. Namun, jika Anda ingin memberikan
            sesuatu, kami sangat menghargainya.
          </p>
        </motion.div>

        {/* Bank accounts */}
        <div className="space-y-4 mb-8">
          {weddingData.gifts.bankAccounts.map((account, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blush/30"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rolex to-rolex-dark flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-cream" />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-rolex-dark">{account.bank}</p>
                    <p className="text-rolex/80 font-mono text-lg">{account.accountNumber}</p>
                    <p className="text-rolex/60 font-sans text-sm">{account.accountName}</p>
                  </div>
                </div>
                <CopyButton text={account.accountNumber} label={`Salin nomor ${account.bank}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gift address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blush/30 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vibrant-pink to-blush flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-rolex-dark mb-2">Alamat Pengiriman Kado</h3>
              <div className="flex items-start gap-2 text-rolex/80 font-sans text-sm mb-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{weddingData.gifts.giftAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-rolex/80 font-sans text-sm">
                <Phone className="w-4 h-4 text-vibrant-pink" />
                <span>{weddingData.gifts.whatsapp}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thank you note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Heart className="w-8 h-8 mx-auto text-vibrant-pink fill-vibrant-pink mb-4" />
          <p className="text-rolex/70 font-sans italic">
            "Terima kasih atas kebaikan dan doa restu Anda"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
