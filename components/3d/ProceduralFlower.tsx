"use client";

import { useRef, useState, useMemo, ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// Types of flowers
type FlowerType = "rose" | "peony" | "lily" | "cherry";

interface ProceduralFlowerProps {
  type?: FlowerType;
  position?: [number, number, number];
  scale?: number;
  color?: string;
  bloomSpeed?: number;
  autoBloom?: boolean;
}

// Generate a single petal
function createPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.1, 0.05, 0.15, 0.15, 0, 0.3);
  shape.bezierCurveTo(-0.15, 0.15, -0.1, 0.05, 0, 0);
  
  const extrudeSettings = {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 3,
  };
  
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.rotateX(-Math.PI / 4);
  return geometry;
}

// Rose petals - multiple layers
function RosePetal({ color, rotation, scale }: { color: string; rotation: [number, number, number]; scale: number }) {
  const petalRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createPetalGeometry(), []);
  
  return (
    <mesh ref={petalRef} geometry={geometry} scale={scale} rotation={rotation}>
      <meshStandardMaterial 
        color={color} 
        side={THREE.DoubleSide}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function ProceduralFlower({
  type = "rose",
  position = [0, 0, 0],
  scale = 1,
  color = "#E85D9E",
  bloomSpeed = 1,
  autoBloom = true,
}: ProceduralFlowerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [bloom, setBloom] = useState(0);
  
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    // Auto bloom animation
    if (autoBloom && bloom < 1) {
      setBloom((prev) => Math.min(prev + delta * bloomSpeed * 0.3, 1));
    }
    
    // Gentle rotation
    groupRef.current.rotation.y += delta * 0.1;
  });

  const petals = useMemo(() => {
    const petalList: ReactNode[] = [];
    const petalCount = type === "rose" ? 12 : type === "peony" ? 10 : 8;
    const layers = type === "rose" ? 3 : 2;
    
    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2 + (layer * Math.PI) / petalCount;
        const layerScale = 1 - layer * 0.2;
        const bloomDelay = layer * 0.2;
        const currentBloom = Math.max(0, Math.min(1, (bloom - bloomDelay) * 2));
        
        petalList.push(
          <RosePetal
            key={`${layer}-${i}`}
            color={color}
            rotation={[
              -0.3 + currentBloom * 0.3,
              angle,
              0.1 * currentBloom
            ]}
            scale={scale * layerScale * currentBloom * 0.8}
          />
        );
      }
    }
    
    return petalList;
  }, [type, color, scale, bloom]);

  // Center of flower (stamen)
  const centerColor = type === "lily" ? "#D4AF77" : "#F8C7D9";

  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={0.3}
      position={position}
    >
      <group ref={groupRef}>
        {/* Petals */}
        {petals}
        
        {/* Flower center */}
        <mesh scale={scale * 0.15 * bloom}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={centerColor} />
        </mesh>
      </group>
    </Float>
  );
}

// Collection of flowers for decoration
export function FlowerCluster({ 
  count = 5, 
  spread = 3,
  colors = ["#E85D9E", "#F8C7D9", "#FFB6C1"]
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
      scale: Math.random() * 0.5 + 0.5,
      color: colors[i % colors.length],
      type: (["rose", "peony", "lily"] as FlowerType[])[i % 3],
      delay: Math.random() * 0.5,
    }));
  }, [count, spread, colors]);

  return (
    <group>
      {flowers.map((flower, i) => (
        <ProceduralFlower
          key={i}
          type={flower.type}
          position={flower.position}
          scale={flower.scale}
          color={flower.color}
          bloomSpeed={0.5 + flower.delay}
          autoBloom={true}
        />
      ))}
    </group>
  );
}
