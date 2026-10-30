"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "@/components/3d/ParticleField";

export default function ParticleCanvas() {
  const [mounted, setMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(400);

  useEffect(() => {
    setMounted(true);

    // Optimize count based on screen width
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768;
      const isLowPower = window.navigator.hardwareConcurrency ? window.navigator.hardwareConcurrency <= 4 : false;
      if (isMobile || isLowPower) {
        setParticleCount(160);
      } else {
        setParticleCount(450);
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60 transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none" }}
      >
        <ParticleField count={particleCount} />
      </Canvas>
    </div>
  );
}
