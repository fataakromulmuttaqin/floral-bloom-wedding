"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import * as THREE from "three";
import FloatingPetals from "./FloatingPetals";

// Lightweight 3D Hero Scene
// Performance optimized: no post-processing, minimal particles

export default function FloralScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "low-power", // Low GPU usage
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneContent() {
  const scrollY = useRef(0);
  
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      scrollY.current = window.scrollY;
    }, { passive: true });
  }

  return (
    <>
      {/* Soft ambient lighting */}
      <ambientLight intensity={0.6} color="#FFF8F5" />
      <directionalLight 
        position={[3, 3, 3]} 
        intensity={0.8} 
        color="#FFF5EE"
      />
      <pointLight position={[-3, 2, -2]} intensity={0.4} color="#F8C7D9" />
      <pointLight position={[3, -2, -1]} intensity={0.3} color="#D4AF77" />
      
      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#FAF6F0", 4, 18]} />

      {/* Floating petals - lightweight */}
      <FloatingPetals count={30} scrollY={scrollY.current} />
      
      {/* Central decorative flowers */}
      <CentralFlowers />
      
      {/* Preload assets */}
      <Preload all />
    </>
  );
}

// Simple procedural flower cluster - much lighter than before
function CentralFlowers() {
  const flowers = [
    { position: [0, 0, -1] as [number,number,number], scale: 0.8, color: "#F8C7D9" },
    { position: [-1.2, 0.5, -1.5] as [number,number,number], scale: 0.5, color: "#FFB6C1" },
    { position: [1.3, -0.3, -1.2] as [number,number,number], scale: 0.6, color: "#E8B4BC" },
    { position: [-0.5, 1, -2] as [number,number,number], scale: 0.4, color: "#D4AF77" },
    { position: [0.8, 0.8, -1.8] as [number,number,number], scale: 0.45, color: "#F8C7D9" },
  ];

  return (
    <group>
      {flowers.map((flower, i) => (
        <Float
          key={i}
          speed={1.2}
          rotationIntensity={0.15}
          floatIntensity={0.3}
          position={flower.position}
        >
          <SimpleFlower 
            scale={flower.scale} 
            color={flower.color}
            rotationY={i * 1.2}
          />
        </Float>
      ))}
    </group>
  );
}

// Simple stylized flower - lightweight geometry
function SimpleFlower({ scale = 1, color = "#F8C7D9", rotationY = 0 }: { scale?: number; color?: string; rotationY?: number }) {
  return (
    <group rotation={[0.2, rotationY, 0]} scale={scale}>
      {/* Petals - simple spheres arranged in circle */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.4,
            Math.sin((angle * Math.PI) / 180) * 0.4,
            0,
          ]}
        >
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.6}
            metalness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      {/* Center */}
      <mesh>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial 
          color="#D4AF77" 
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

// Export lightweight components
export { FloatingPetals };
