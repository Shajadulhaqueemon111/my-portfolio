"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
}

export function ParticleField({ count = 480 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate randomized 3D particle positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#10b981"), // Emerald
      new THREE.Color("#06b6d4"), // Cyan
      new THREE.Color("#8b5cf6"), // Violet / Purple
      new THREE.Color("#38bdf8"), // Sky Blue
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across a 3D volume
      pos[i3] = (Math.random() - 0.5) * 36;
      pos[i3 + 1] = (Math.random() - 0.5) * 36;
      pos[i3 + 2] = (Math.random() - 0.5) * 28;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  // Track window mouse movement smoothly
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smoothly lerp mouse target
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.04);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.04);

    // Continuous orbital rotation with gentle mouse influence
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.03 + mouseRef.current.x * 0.25;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1 + mouseRef.current.y * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
