"use client";

import { useRef, useState, useMemo, ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// Simplified lightweight flower for decorations
// Uses basic geometries instead of complex procedural meshes

interface SimpleFlower3DProps {
  type?: "rose" | "peony" | "blossom";
  position?: [number, number, number];
  scale?: number;
  color?: string;
  bloomSpeed?: number;
}

export default function SimpleFlower3D({
  type = "rose",
  position = [0, 0, 0],
  scale = 1,
  color = "#F8C7D9",
  bloomSpeed = 1,
}: SimpleFlower3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [bloom, setBloom] = useState(0);
  
  useFrame((_, delta) => {
    if (bloom < 1) {
      setBloom((prev) => Math.min(prev + delta * bloomSpeed * 0.4, 1));
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const petalCount = type === "peony" ? 8 : type === "blossom" ? 5 : 6;
  const petalSize = type === "peony" ? 0.25 : type === "blossom" ? 0.15 : 0.2;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4} position={position}>
      <group ref={groupRef} scale={scale}>
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (i / petalCount) * Math.PI * 2;
          const x = Math.cos(angle) * 0.3;
          const z = Math.sin(angle) * 0.3;
          return (
            <mesh
              key={i}
              position={[x * bloom, 0, z * bloom]}
              scale={[bloom, bloom * 0.5, bloom]}
            >
              <sphereGeometry args={[petalSize, 8, 8]} />
              <meshStandardMaterial
                color={color}
                roughness={0.7}
                transparent
                opacity={0.85}
              />
            </mesh>
          );
        })}
        <mesh scale={bloom * 0.6}>
          <sphereGeometry args={[0.15, 10, 10]} />
          <meshStandardMaterial color="#D4AF77" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// Cluster of simple flowers
export function SimpleFlowerCluster({ 
  count = 3, 
  spread = 1.5,
  colors = ["#F8C7D9", "#FFB6C1", "#E8B4BC"]
}: { 
  count?: number; 
  spread?: number;
  colors?: string[];
}) {
  const flowers = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.4,
      color: colors[i % colors.length],
      type: (["rose", "peony", "blossom"] as const)[i % 3],
    }));
  }, [count, spread, colors]);

  return (
    <group>
      {flowers.map((f, i) => (
        <SimpleFlower3D
          key={i}
          type={f.type}
          position={f.position}
          scale={f.scale}
          color={f.color}
        />
      ))}
    </group>
  );
}
