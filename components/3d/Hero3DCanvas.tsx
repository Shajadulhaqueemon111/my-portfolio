"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { DeveloperWorkspace3D } from "@/components/3d/DeveloperWorkspace3D";
import { OrbitControls } from "@react-three/drei";
import { Sparkles, RotateCw } from "lucide-react";

export default function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[380px] rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 animate-pulse">
          <Sparkles className="w-4 h-4" />
          <span>Initializing 3D Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl border border-zinc-800/80 bg-zinc-950/90 shadow-2xl backdrop-blur-xl overflow-hidden group">
      {/* 3D Canvas Scene */}
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <DeveloperWorkspace3D />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.5}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Suspense>
      </Canvas>

      {/* Floating Interactive Badge Helper */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800/80 pointer-events-none">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: "8s" }} />
          <span>Interactive 3D Workspace</span>
        </div>
        <span className="hidden sm:inline text-zinc-500">Drag to rotate • Hover tech icons</span>
      </div>
    </div>
  );
}
