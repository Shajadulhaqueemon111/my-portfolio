"use client";

import { MapPin, Briefcase, Code, CheckCircle, Sparkles, Terminal, ArrowUpRight } from "lucide-react";
import { developerInfo } from "@/data/developer";
import { playSound } from "@/lib/audio";

export function AboutSection() {
  const pillars = [
    { title: "Clean UI", desc: "Crafting interfaces that feel intuitive and visually balanced." },
    { title: "Reusable Components", desc: "Building modular, DRY component hierarchies with composable props." },
    { title: "Responsive Systems", desc: "Pixel-perfect fidelity across mobile, tablet, and wide desktop viewports." },
    { title: "API Integration", desc: "Resilient asynchronous data fetching, error boundaries, and optimistic mutations." },
    { title: "Performance First", desc: "Zero layout shifts, sub-second route transitions, and memoized renders." },
    { title: "Modern Architecture", desc: "Strict TypeScript types, Next.js App Router, and Redux Toolkit state flow." }
  ];

  return (
    <section id="about" className="py-24 border-t border-zinc-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            Turning Ideas Into Interfaces.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Transitioned from dedicated personal projects into professional software engineering, delivering real-world web apps with modern frontend standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              <p>
                I am a <strong className="text-zinc-100 font-semibold">Frontend Developer</strong> with <strong className="text-emerald-400 font-semibold">1+ year of professional experience</strong> currently engineering production web applications at <strong className="text-zinc-100 font-semibold">M360ICT</strong>.
              </p>
              <p className="text-zinc-400 text-sm">
                Having transitioned from project-based learning into production software development, I specialize in building maintainable client-side architectures using <strong className="text-zinc-200">React, Next.js, and TypeScript</strong>. My day-to-day work centers on turning complex business requirements into fluid, accessible, and responsive user experiences.
              </p>
              <p className="text-zinc-400 text-sm">
                I place high value on clean component abstraction, deterministic state management via Redux Toolkit and RTK Query, and close collaboration with backend engineers to ensure seamless REST API integration.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                What Guides My Work
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/70 hover:border-zinc-700/80 transition-all space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <h4 className="text-xs font-semibold text-zinc-200">{pillar.title}</h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-normal pl-3.5">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Developer Profile Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-md space-y-6 relative overflow-hidden group hover:border-zinc-700 transition-all">
              {/* Subtle Card Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none"></div>

              {/* Developer Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-md">
                  <div className="w-full h-full rounded-[14px] bg-zinc-950 flex items-center justify-center font-mono font-bold text-lg text-emerald-400">
                    EM
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">{developerInfo.name}</h3>
                  <p className="text-xs font-mono text-emerald-400">{developerInfo.role}</p>
                </div>
              </div>

              {/* Key Attributes */}
              <div className="space-y-3 border-y border-zinc-800/80 py-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Specialization</span>
                  </span>
                  <span className="font-medium text-zinc-200">React • Next.js • TypeScript</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Experience</span>
                  </span>
                  <span className="font-medium text-emerald-400">1+ Year Professional</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Location</span>
                  </span>
                  <span className="font-medium text-zinc-200">{developerInfo.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Status</span>
                  </span>
                  <span className="font-medium text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Open for Opportunities
                  </span>
                </div>
              </div>

              {/* Honest Highlights Strip */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <span className="block text-xl font-bold font-mono text-zinc-100">1+ Year</span>
                  <span className="text-[11px] text-zinc-400">At M360ICT</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <span className="block text-xl font-bold font-mono text-emerald-400">100%</span>
                  <span className="text-[11px] text-zinc-400">Production Code Focus</span>
                </div>
              </div>

              {/* Action */}
              <a
                href="#contact"
                onClick={() => playSound("click")}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-700 transition-colors"
              >
                <span>Connect with Sajedul</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
