"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Floating flower petals particle system
// Creates soft, romantic petal effects that follow mouse and scroll

interface FloatingPetalsProps {
  count?: number;
  color?: string;
  scrollY?: number;
}

// Create custom petal geometry
function createPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.05, 0.05, 0.05, 0.1, 0, 0.15);
  shape.bezierCurveTo(-0.05, 0.1, -0.05, 0.05, 0, 0);
  
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.01,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  
  geometry.rotateX(Math.PI / 2);
  geometry.translate(-0.025, 0, -0.075);
  return geometry;
}

export default function FloatingPetals({ 
  count = 100, 
  color = "#F8C7D9",
  scrollY = 0 
}: FloatingPetalsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse } = useThree();
  
  // Create custom petal geometry once
  const petalGeo = useMemo(() => createPetalGeometry(), []);
  
  // Generate random petal data
  const { positions, velocities, rotations, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const rotations = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Random position across the viewport
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Random velocities for natural movement
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = Math.random() * 0.02 + 0.005; // fall down slowly
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      
      // Random rotations
      rotations[i * 3] = Math.random() * Math.PI * 2;
      rotations[i * 3 + 1] = Math.random() * Math.PI * 2;
      rotations[i * 3 + 2] = Math.random() * Math.PI * 2;
      
      // Random scales
      scales[i] = Math.random() * 0.15 + 0.05;
    }
    
    return { positions, velocities, rotations, scales };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const mouseInfluence = 0.5;
    
    for (let i = 0; i < count; i++) {
      // Update positions with gentle movement
      positions[i * 3] += velocities[i * 3] + mouse.x * mouseInfluence * 0.001;
      positions[i * 3 + 1] -= velocities[i * 3 + 1]; // fall down
      positions[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Scroll effect - petals move up as user scrolls
      positions[i * 3 + 1] += scrollY * 0.0001;
      
      // Add gentle wave motion
      positions[i * 3] += Math.sin(time * 0.5 + i) * 0.002;
      positions[i * 3 + 2] += Math.cos(time * 0.3 + i) * 0.001;
      
      // Reset petals that fall below or go too far
      if (positions[i * 3 + 1] < -10) {
        positions[i * 3 + 1] = 10;
        positions[i * 3] = (Math.random() - 0.5) * 20;
      }
      
      // Update dummy object
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      
      // Gentle rotation
      dummy.rotation.set(
        Math.sin(time + i) * 0.5,
        Math.cos(time * 0.7 + i) * 0.5,
        rotations[i * 3 + 2] + time * 0.1
      );
      
      dummy.scale.setScalar(scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[petalGeo, undefined, count]}>
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.7} 
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
