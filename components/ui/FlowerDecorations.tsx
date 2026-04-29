"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

// Beautiful SVG Rose - for hero and section decorations
export function RoseSVG({ className = "", size = 200 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {/* Outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, rotate: angle }}
          animate={{ scale: 1, rotate: angle + 360 }}
          transition={{ delay: i * 0.1, duration: 1.5, ease: "easeOut" }}
        >
          <ellipse
            cx="50"
            cy="30"
            rx="12"
            ry="20"
            fill="#F8C7D9"
            opacity="0.7"
            transform={`rotate(${angle} 50 50)`}
          />
        </motion.g>
      ))}
      {/* Middle petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <motion.g
          key={`mid-${i}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.08, duration: 1 }}
        >
          <ellipse
            cx="50"
            cy="35"
            rx="10"
            ry="16"
            fill="#E8B4BC"
            opacity="0.8"
            transform={`rotate(${angle} 50 50)`}
          />
        </motion.g>
      ))}
      {/* Center */}
      <motion.circle
        cx="50"
        cy="50"
        r="12"
        fill="#D4AF77"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="8"
        fill="#E8B4BC"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
    </svg>
  );
}

// Peony SVG - large lush flower
export function PeonySVG({ className = "", size = 300 }: { className?: string; size?: number }) {
  const layers = [
    { count: 8, radius: 45, size: 25, color: "#F8C7D9", delay: 0 },
    { count: 10, radius: 35, size: 20, color: "#FFB6C1", delay: 0.3 },
    { count: 8, radius: 25, size: 15, color: "#E8B4BC", delay: 0.6 },
    { count: 6, radius: 15, size: 12, color: "#E85D9E", delay: 0.9 },
  ];
  
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {layers.map((layer, li) =>
        Array.from({ length: layer.count }).map((_, i) => {
          const angle = (i / layer.count) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * layer.radius * 0.4;
          const y = 50 + Math.sin(rad) * layer.radius * 0.4;
          return (
            <motion.ellipse
              key={`${li}-${i}`}
              cx={x + 50}
              cy={y + 50}
              rx={layer.size * 0.3}
              ry={layer.size * 0.5}
              fill={layer.color}
              opacity="0.75"
              transform={`rotate(${angle} ${x + 50} ${y + 50})`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.75 }}
              transition={{ delay: layer.delay + i * 0.05, duration: 1.2, ease: "easeOut" }}
            />
          );
        })
      )}
      <motion.circle
        cx="50"
        cy="50"
        r="8"
        fill="#D4AF77"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
    </svg>
  );
}

// Cherry Blossom SVG
export function CherryBlossomSVG({ className = "", size = 150 }: { className?: string; size?: number }) {
  const petals = [
    { angle: 0, delay: 0 },
    { angle: 72, delay: 0.1 },
    { angle: 144, delay: 0.2 },
    { angle: 216, delay: 0.3 },
    { angle: 288, delay: 0.4 },
  ];
  
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {petals.map((p, i) => (
        <motion.g key={i} transform={`rotate(${p.angle} 50 50)`}>
          <motion.ellipse
            cx="50"
            cy="25"
            rx="8"
            ry="20"
            fill="#FFB6C1"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 15 }}
            transition={{ delay: p.delay, duration: 1, ease: "easeOut" }}
          />
        </motion.g>
      ))}
      {/* Stamens */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.line
          key={`st-${i}`}
          x1="50"
          y1="50"
          x2={50 + Math.cos((angle * Math.PI) / 180) * 20}
          y2={50 + Math.sin((angle * Math.PI) / 180) * 20}
          stroke="#D4AF77"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 + i * 0.05 }}
        />
      ))}
      <motion.circle
        cx="50"
        cy="50"
        r="5"
        fill="#D4AF77"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      />
    </svg>
  );
}

// Small decorative flower for backgrounds
export function SmallFlowerSVG({ className = "", size = 60, color = "#F8C7D9" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.circle
          key={i}
          cx={25 + Math.cos((angle * Math.PI) / 180) * 10}
          cy={25 + Math.sin((angle * Math.PI) / 180) * 10}
          r="6"
          fill={color}
          opacity="0.6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
      <motion.circle
        cx="25"
        cy="25"
        r="5"
        fill="#D4AF77"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      />
    </svg>
  );
}

// Vine/branch decoration
export function VineSVG({ className = "", width = 200, height = 100 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 200 100" className={className} fill="none">
      <motion.path
        d="M10 80 Q50 60 100 70 T190 50"
        stroke="#006039"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2 }}
      />
      {[30, 80, 130, 180].map((x, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5 + i * 0.2 }}
        >
          <ellipse cx={x} cy={60 + (i % 2) * 15} rx="8" ry="12" fill="#F8C7D9" opacity="0.6" transform={`rotate(${-20 + (i % 2) * 40} ${x} ${60 + (i % 2) * 15})`} />
        </motion.g>
      ))}
    </svg>
  );
}
