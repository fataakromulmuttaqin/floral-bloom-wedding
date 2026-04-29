"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music2, Volume2, VolumeX } from "lucide-react";

interface MusicToggleProps {
  src?: string;
}

export default function MusicToggle({ src = "/audio/wedding-music.mp3" }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Try to autoplay (will be blocked by browser until user interacts)
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked, user needs to click
        });
      }
      document.removeEventListener("click", handleFirstInteraction);
    };
    
    document.addEventListener("click", handleFirstInteraction);
    
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-14 top-1/2 -translate-y-1/2 bg-rolex-dark text-cream px-3 py-1.5 rounded-lg text-sm whitespace-nowrap shadow-lg"
          >
            {isPlaying ? "Matikan Musik" : "Putar Musik"}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={toggleMusic}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          relative w-14 h-14 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg
          ${isPlaying 
            ? "bg-rolex text-cream" 
            : "bg-cream text-rolex border-2 border-rolex/20"
          }
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Music2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Music className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Playing indicator */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-vibrant-pink rounded-full flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vibrant-pink opacity-75"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
