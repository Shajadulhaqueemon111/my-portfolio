"use client";

import { useState } from "react";
import { Compass, CheckCircle2, ArrowRight } from "lucide-react";
import { philosophyData } from "@/data/philosophy";
import { playSound } from "@/lib/audio";

export function PhilosophySection() {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const handleStepClick = (idx: number) => {
    playSound("tab");
    setSelectedStep(idx);
  };

  return (
    <section className="py-24 border-t border-zinc-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>Development Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            How I Build.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            A disciplined four-phase approach ensuring every product ships with intentional design, scalable code, and verified performance.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {philosophyData.map((item, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <div
                key={item.step}
                onClick={() => handleStepClick(idx)}
                className={`group rounded-2xl border p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-zinc-900/90 border-emerald-500/50 shadow-xl shadow-emerald-500/5 -translate-y-1"
                    : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-2xl font-mono font-bold ${
                        isSelected ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-400"
                      }`}
                    >
                      {item.step}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? "bg-emerald-400 animate-pulse" : "bg-zinc-800"
                      }`}
                    ></span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-100 mb-2">{item.title}</h3>
                  <p className="text-xs text-zinc-400 font-mono mb-3 leading-normal">
                    {item.shortDesc}
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {item.fullDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Deliverables</span>
                  {item.deliverables.slice(0, 2).map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="line-clamp-1">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
