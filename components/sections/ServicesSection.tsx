"use client";

import { Layout, Smartphone, Code, Network, BarChart3, ShieldCheck, Zap, Component } from "lucide-react";
import { servicesData } from "@/data/services";
import { ScrollReveal, TextReveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

export function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    layout: <Layout className="w-5 h-5 text-emerald-400" />,
    smartphone: <Smartphone className="w-5 h-5 text-cyan-400" />,
    code: <Code className="w-5 h-5 text-teal-400" />,
    network: <Network className="w-5 h-5 text-indigo-400" />,
    "bar-chart-3": <BarChart3 className="w-5 h-5 text-amber-400" />,
    "shield-check": <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    zap: <Zap className="w-5 h-5 text-yellow-400" />,
    component: <Component className="w-5 h-5 text-purple-400" />
  };

  return (
    <section className="py-24 border-t border-zinc-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal className="space-y-3 mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
            <Layout className="w-3.5 h-3.5" />
            <span>Scope of Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            <TextReveal text="What I Do." />
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Professional frontend services and technical capabilities delivered with production rigor.
          </p>
        </ScrollReveal>

        {/* 8 Services Grid */}
        <StaggerContainer stagger={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesData.map((service) => (
            <StaggerItem key={service.id}>
              <Tilt3DCard intensity={10} className="h-full">
                <div
                  className="h-full rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 p-5 flex flex-col justify-between transition-all duration-300 hover:border-zinc-700 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {iconMap[service.iconName] || <Code className="w-5 h-5 text-emerald-400" />}
                    </div>

                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 space-y-1">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt3DCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
