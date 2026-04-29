"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Image as ImageIcon, Heart } from "lucide-react";

interface PhotoCardProps {
  src: string;
  alt: string;
  index: number;
}

function PhotoCard({ src, alt, index }: PhotoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = (e.clientX - rect.left - width / 2) / width;
    const mouseYFromCenter = (e.clientY - rect.top - height / 2) / height;
    x.set(mouseXFromCenter);
    y.set(mouseYFromCenter);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Placeholder gradient backgrounds
  const gradients = [
    "from-blush/40 to-vibrant-pink/40",
    "from-rolex/30 to-blush/40",
    "from-gold/30 to-blush/30",
    "from-vibrant-pink/30 to-gold/30",
    "from-blush/50 to-light-pink/40",
    "from-rolex/20 to-blush/50",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      <div 
        className={`relative aspect-[4/3] rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} overflow-hidden shadow-xl border border-white/50 transition-transform duration-300 group-hover:shadow-2xl`}
      >
        {/* Placeholder image indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-white/60" />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-rolex-dark/0 group-hover:bg-rolex-dark/20 transition-all duration-300" />
        
        {/* Heart icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart className="w-10 h-10 text-white fill-white" />
        </div>
        
        {/* Caption on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-rolex-dark/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-cream font-sans text-sm">Momen Spesial #{index + 1}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MomentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false });

  // Placeholder photos (replace with actual photos)
  const photos = Array.from({ length: 6 }, (_, i) => ({
    src: `/images/photo-${i + 1}.jpg`,
    alt: `Wedding moment ${i + 1}`,
  }));

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest">Gallery</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rolex-dark mt-2">
            Our Moments
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="w-16 h-0.5 bg-gradient-to-r from-transparent to-gold" />
            <Heart className="w-5 h-5 text-vibrant-pink fill-vibrant-pink" />
            <span className="w-16 h-0.5 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <PhotoCard
              key={index}
              src={photo.src}
              alt={photo.alt}
              index={index}
            />
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-rolex/60 font-sans text-sm mt-8 italic"
        >
          "Setiap momen bersama kamu adalah harta berharga dalam hidupku"
        </motion.p>
      </div>
    </section>
  );
}
