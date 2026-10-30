"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Download, Sparkles, Layers, ShieldCheck, Zap, Code2, Box } from "lucide-react";
import { developerInfo } from "@/data/developer";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { playSound } from "@/lib/audio";
import { ScrollReveal, TextReveal } from "@/components/motion/MotionWrapper";

const Hero3DCanvas = dynamic(() => import("@/components/3d/Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-center">
      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 animate-pulse">
        <Sparkles className="w-4 h-4" />
        <span>Loading 3D Studio...</span>
      </div>
    </div>
  ),
});

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [viewMode, setViewMode] = useState<"code" | "3d">("code");

  const scrollTo = (id: string) => {
    playSound("click");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const techHighlights = [
    "React.js",
    "Next.js (App Router)",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn/UI",
    "Redux Toolkit",
    "RTK Query",
    "REST APIs"
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 md:py-32 flex flex-col justify-center overflow-hidden">
      {/* Ambient Radial Glow and Grid Backdrop */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/8 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Availability Badge */}
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-zinc-300 tracking-tight">
                  {developerInfo.availability}
                </span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <div className="space-y-2">
              <ScrollReveal delay={0.15}>
                <p className="text-sm sm:text-base font-mono font-medium text-emerald-400 tracking-wide uppercase">
                  {developerInfo.title} • {developerInfo.experienceBadge}
                </p>
              </ScrollReveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.08]">
                <TextReveal text="Building Interfaces That Feel" />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Exceptional.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <ScrollReveal delay={0.25}>
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
                I build modern, responsive, and scalable web experiences using React, Next.js, and TypeScript with a passion for clean UI architecture, predictable state, and zero-compromise performance.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal delay={0.35}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => scrollTo("projects")}
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 cursor-pointer"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    playSound("pop");
                    onOpenResume();
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 font-medium text-sm border border-zinc-700/80 hover:border-zinc-600 transition-all duration-200 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Resume</span>
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                  className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-emerald-400 px-3 py-2 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Let&apos;s Connect</span>
                  <span className="text-emerald-400">→</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Experience Pill */}
            <ScrollReveal delay={0.45}>
              <div className="pt-4 flex items-center gap-4 text-xs text-zinc-400 border-t border-zinc-800/60 max-w-lg">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-zinc-300">{developerInfo.currentCompany}</span>
                  <span className="text-zinc-600">({developerInfo.currentCompanyPeriod})</span>
                </div>
                <span className="text-zinc-700">•</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Production Frontend Engineering</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Code Sandbox & 3D Studio */}
          <div className="lg:col-span-6 relative w-full">
            {/* Mode Switcher */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
                <button
                  onClick={() => {
                    playSound("tab");
                    setViewMode("code");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === "code"
                      ? "bg-zinc-800 text-emerald-400 border border-zinc-700/60 shadow-sm font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code Sandbox</span>
                </button>
                <button
                  onClick={() => {
                    playSound("pop");
                    setViewMode("3d");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === "3d"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3D Studio</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Three.js + R3F Powered</span>
              </span>
            </div>

            {viewMode === "code" ? <CodeWindow /> : <Hero3DCanvas />}
          </div>
        </div>

        {/* Tech Arsenal Quick Strip */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 pt-8 border-t border-zinc-800/60">
            <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4 text-center sm:text-left">
              Core Production Technologies
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
              {techHighlights.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-all font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
