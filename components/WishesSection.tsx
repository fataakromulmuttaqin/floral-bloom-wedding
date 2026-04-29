"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Heart, User } from "lucide-react";

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

export default function WishesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: "Siti Aminah",
      message: "Selamat ya Nisa dan Fata! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Semoga segera dikaruniai keturunan yang shaleh.",
      timestamp: "2 hari yang lalu",
    },
    {
      id: 2,
      name: "Ahmad Rizki",
      message: "Happy wedding Nisa & Fata! Semoga langkah kalian selalu dalam lindungan Allah SWT. Aamiin.",
      timestamp: "1 hari yang lalu",
    },
  ]);

  const [form, setForm] = useState({ name: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newWish: Wish = {
      id: Date.now(),
      name: form.name,
      message: form.message,
      timestamp: "Baru saja",
    };

    setWishes([newWish, ...wishes]);
    setForm({ name: "", message: "" });
    setSubmitting(false);
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-cream"
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Wishes</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mt-2">
            Doa & Ucapan
          </h2>
          <p className="text-rolex/70 font-sans mt-4 max-w-md mx-auto">
            Kirimkan doa dan harapan terbaik Anda untuk kedua mempelai
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-blush/30 mb-8"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-rolex-dark font-sans text-sm mb-2">
                Nama Anda
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rolex/40" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Masukkan nama Anda"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-cream/50 border border-blush/30 text-rolex-dark placeholder:text-rolex/40 font-sans focus:outline-none focus:ring-2 focus:ring-vibrant-pink/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-rolex-dark font-sans text-sm mb-2">
                Doa & Ucapan
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-rolex/40" />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis doa dan ucapan terbaik Anda..."
                  required
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-cream/50 border border-blush/30 text-rolex-dark placeholder:text-rolex/40 font-sans focus:outline-none focus:ring-2 focus:ring-vibrant-pink/50 transition-all resize-none"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full py-4 rounded-xl font-sans text-lg flex items-center justify-center gap-2
                transition-all duration-300
                ${submitting 
                  ? "bg-rolex/50 text-cream/50" 
                  : submitted
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-rolex to-rolex-dark text-cream hover:shadow-lg"
                }
              `}
            >
              {submitted ? (
                <>
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Terima Kasih!</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{submitting ? "Mengirim..." : "Kirim Doa & Ucapan"}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Wishes list */}
        <div className="space-y-4">
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blush/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush to-vibrant-pink flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-serif text-sm">
                      {wish.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-serif text-lg text-rolex-dark">{wish.name}</h4>
                      <span className="text-rolex/50 text-xs font-sans">{wish.timestamp}</span>
                    </div>
                    <p className="text-rolex/80 font-sans text-sm leading-relaxed">
                      {wish.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
