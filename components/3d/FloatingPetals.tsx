"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Ultra-lightweight floating petals - only 30 particles
// Optimized for mobile performance

interface FloatingPetalsProps {
  count?: number;
  scrollY?: number;
}

function createPetalShape(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // Elegant petal shape
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.08, 0.02, 0.12, 0.08, 0.08, 0.15);
  shape.bezierCurveTo(0.04, 0.2, -0.04, 0.2, -0.08, 0.15);
  shape.bezierCurveTo(-0.12, 0.08, -0.08, 0.02, 0, 0);
  
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.008,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  
  geometry.rotateX(-Math.PI / 3);
  geometry.translate(0, 0, -0.1);
  return geometry;
}

export default function FloatingPetals({ count = 30, scrollY = 0 }: FloatingPetalsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse } = useThree();
  
  const petalGeo = useMemo(() => createPetalShape(), []);
  
  const { positions, velocities, rotations, scales, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const rotations = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    const palette = [
      new THREE.Color("#F8C7D9"), // blush
      new THREE.Color("#FFB6C1"), // light pink
      new THREE.Color("#E8B4BC"), // muted rose
      new THREE.Color("#D4AF77").multiplyScalar(0.8), // gold tint
      new THREE.Color("#FAF6F0"), // cream
    ];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = -0.008 - Math.random() * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      
      rotations[i * 3] = Math.random() * Math.PI;
      rotations[i * 3 + 1] = Math.random() * Math.PI * 2;
      rotations[i * 3 + 2] = Math.random() * Math.PI;
      
      scales[i] = 0.4 + Math.random() * 0.5;
      
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    
    return { positions, velocities, rotations, scales, colors };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      // Gentle movement
      positions[i * 3] += velocities[i * 3] + Math.sin(time * 0.3 + i * 0.5) * 0.002;
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Mouse influence (subtle)
      positions[i * 3] += mouse.x * 0.001;
      positions[i * 3 + 2] += mouse.y * 0.0005;
      
      // Scroll effect
      positions[i * 3 + 1] += scrollY * 0.00005;
      
      // Reset when falling below
      if (positions[i * 3 + 1] < -8) {
        positions[i * 3 + 1] = 8;
        positions[i * 3] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      }
      
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.rotation.set(
        rotations[i * 3] + time * 0.2,
        rotations[i * 3 + 1] + time * 0.15,
        rotations[i * 3 + 2]
      );
      dummy.scale.setScalar(scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      // Set color
      color.setRGB(
        colors[i * 3],
        colors[i * 3 + 1],
        colors[i * 3 + 2]
      );
      meshRef.current.setColorAt(i, color);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[petalGeo, undefined, count]}>
      <meshBasicMaterial 
        vertexColors
        transparent 
        opacity={0.85} 
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
