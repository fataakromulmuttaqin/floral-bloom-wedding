"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  Text3D, 
  Center,
  Sparkles,
  Preload
} from "@react-three/drei";
import { 
  EffectComposer, 
  Bloom, 
  DepthOfField,
  Vignette,
  GodRays
} from "@react-three/postprocessing";
import * as THREE from "three";
import FloatingPetals from "./FloatingPetals";
import ProceduralFlower, { FlowerCluster } from "./ProceduralFlower";

// Main 3D Scene for Hero Section
export default function FloralScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
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
  
  // Update scroll position
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      scrollY.current = window.scrollY;
    });
  }

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} color="#FFF5F0" />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        color="#FFF8F0"
        castShadow
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#F8C7D9" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5}
        color="#D4AF77"
      />
      
      {/* Fog for dreamy effect */}
      <fog attach="fog" args={["#FAF6F0", 5, 25]} />

      {/* Background gradient sphere */}
      <BackgroundSphere />
      
      {/* Floating petals */}
      <FloatingPetals count={150} scrollY={scrollY.current} />
      
      {/* Central floral arrangement */}
      <CentralFloralArch />
      
      {/* Floating flower clusters */}
      <FlowerCluster count={8} spread={5} />
      
      {/* Sparkles for magical effect */}
      <Sparkles 
        count={50} 
        scale={10} 
        size={2} 
        speed={0.3}
        color="#D4AF77"
        opacity={0.5}
      />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.8} 
          luminanceSmoothing={0.9}
        />
        <DepthOfField 
          focusDistance={0.01} 
          focalLength={0.05} 
          bokehScale={2}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
      
      <Preload all />
    </>
  );
}

// Background gradient sphere
function BackgroundSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <mesh ref={meshRef} scale={20}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial 
        color="#FAF6F0" 
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Central floral arch for hero section
function CentralFloralArch() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle floating animation
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  // Create arch positions
  const archFlowers = [];
  const archRadius = 2.5;
  const flowerCount = 12;
  
  for (let i = 0; i < flowerCount; i++) {
    const angle = (i / flowerCount) * Math.PI + Math.PI; // Half arch
    const x = Math.cos(angle) * archRadius;
    const y = Math.sin(angle) * archRadius + 1;
    const z = -1 + Math.sin(angle) * 0.5;
    
    const colors = ["#E85D9E", "#F8C7D9", "#FFB6C1", "#D4AF77"];
    const color = colors[i % colors.length];
    
    archFlowers.push(
      <ProceduralFlower
        key={i}
        type={i % 2 === 0 ? "rose" : "peony"}
        position={[x, y, z]}
        scale={0.6}
        color={color}
        bloomSpeed={0.3}
      />
    );
  }

  return (
    <group ref={groupRef}>
      {archFlowers}
      
      {/* Additional center bouquet */}
      <Center position={[0, -0.5, 0]}>
        <FlowerCluster count={6} spread={1.5} />
      </Center>
    </group>
  );
}

// Export components for use in other sections
export { FloatingPetals, ProceduralFlower, FlowerCluster };
