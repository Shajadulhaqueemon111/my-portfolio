"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2, Building, ShieldCheck, ArrowRight } from "lucide-react";
import { experienceData } from "@/data/experience";
import { playSound } from "@/lib/audio";
import { ScrollReveal, TextReveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 border-t border-zinc-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <ScrollReveal className="space-y-3 mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            <TextReveal text="Professional Experience." />
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Real-world software development track record engineering production client interfaces and modern frontend systems.
          </p>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-800 space-y-12 max-w-4xl">
          <StaggerContainer stagger={0.15}>
            {experienceData.map((item) => (
              <StaggerItem key={item.id} className="relative group mb-12 last:mb-0">
                {/* Glowing Pulse Node on Timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform"></span>
                </div>

                {/* Experience Card wrapped in 3D Tilt */}
                <Tilt3DCard intensity={6}>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/80">
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-800/40 font-medium mb-2">
                          {item.badge}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">
                          {item.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
                          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5" />
                            {item.company}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                            {item.location}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span className="flex items-center gap-1 font-mono text-zinc-300">
                            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                            {item.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Brief Summary */}
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Responsibilities Bullets */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        Core Engineering Responsibilities
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {item.responsibilities.map((resp, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Badges */}
                    <div className="pt-4 border-t border-zinc-800/80">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Technologies Applied
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-mono transition-colors hover:border-emerald-500/50 hover:text-emerald-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
