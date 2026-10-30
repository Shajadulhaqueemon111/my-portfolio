"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function Tilt3DCard({
  children,
  className = "",
  intensity = 15,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse percentage across card (0 to 1) for spotlight
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseFromLeft = e.clientX - rect.left;
    const mouseFromTop = e.clientY - rect.top;

    // Normalized from -0.5 to 0.5
    x.set(mouseFromLeft / width - 0.5);
    y.set(mouseFromTop / height - 0.5);

    // Glare coordinates in percentages
    glareX.set((mouseFromLeft / width) * 100);
    glareY.set((mouseFromTop / height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{ duration: 0.2 }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Specular Radial Glare Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl z-20 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(circle 280px at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.7), transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
