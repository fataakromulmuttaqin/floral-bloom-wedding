"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";

// Components
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollProgress from "@/components/ui/ScrollProgress";
import MusicToggle from "@/components/ui/MusicToggle";
import HeroSection from "@/components/HeroSection";
import SalamSection from "@/components/SalamSection";
import MempelaiSection from "@/components/MempelaiSection";
import SaveDateSection from "@/components/SaveDateSection";
import EventSection from "@/components/EventSection";
import LiveStreamingSection from "@/components/LiveStreamingSection";
import LoveStorySection from "@/components/LoveStorySection";
import MomentsSection from "@/components/MomentsSection";
import GiftSection from "@/components/GiftSection";
import WishesSection from "@/components/WishesSection";
import ClosingSection from "@/components/ClosingSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showInvitation, setShowInvitation] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenInvitation = () => {
    setShowInvitation(true);
    // Smooth scroll to content after animation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Music Toggle */}
      <MusicToggle />

      {/* Main Content */}
      <main ref={mainRef}>
        {/* Hero Section - Always visible initially */}
        <div className={`transition-opacity duration-1000 ${showInvitation ? "hidden" : ""}`}>
          <HeroSection onOpenInvitation={handleOpenInvitation} />
          
          {/* Invitation gate */}
          <div className="fixed inset-0 z-40 bg-rolex-dark/90 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center px-8 max-w-lg"
            >
              <div className="text-6xl mb-6">💐</div>
              <h2 className="font-serif text-3xl text-cream mb-4">
                Anda Invited!
              </h2>
              <p className="text-cream/80 font-sans mb-8">
                Kepada Yth.<br />
                Bapak/Ibu/Saudara/i<br />
                Di Tempat
              </p>
              <motion.button
                onClick={handleOpenInvitation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-vibrant-pink to-blush text-cream font-sans text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Buka Undangan ✿
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* All Sections - Shown after opening */}
        <AnimatePresence>
          {showInvitation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <HeroSection onOpenInvitation={handleOpenInvitation} />
              <SalamSection />
              <MempelaiSection />
              <SaveDateSection />
              <EventSection />
              <LiveStreamingSection />
              <LoveStorySection />
              <MomentsSection />
              <GiftSection />
              <WishesSection />
              <ClosingSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
