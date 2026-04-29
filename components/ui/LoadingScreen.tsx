"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ProceduralFlower from "../3d/ProceduralFlower";

interface LoadingScreenProps {
  onComplete?: () => void;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            fill="none"
            stroke="#F8C7D9"
            strokeWidth="4"
            opacity="0.3"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            fill="none"
            stroke="#006039"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 377} 377`}
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-rolex-dark font-serif text-lg">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 opacity-20">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <ProceduralFlower 
                position={[0, 0, 0]} 
                scale={2} 
                color="#E85D9E"
                bloomSpeed={0.5}
              />
            </Canvas>
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Loader />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-serif text-3xl text-rolex-dark mb-2">
                Nisa & Fata
              </h1>
              <p className="text-rolex/80 font-sans text-sm">
                Preparing your invitation...
              </p>
            </motion.div>
          </div>
          
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-blush"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
