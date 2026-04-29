"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: number; // timestamp
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            {/* Glass card */}
            <div className="relative bg-white/30 backdrop-blur-md rounded-2xl p-3 md:p-4 min-w-[70px] md:min-w-[90px] shadow-lg border border-white/50 overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blush/30" />
              
              <div className="relative z-10">
                <motion.span
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="block text-3xl md:text-5xl font-serif text-rolex-dark text-center"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </div>
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-1">
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span className="w-1 h-1 rounded-full bg-blush" />
              <span className="w-1 h-1 rounded-full bg-gold" />
            </div>
          </div>
          
          <span className="mt-2 text-xs md:text-sm text-rolex/80 font-sans uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
