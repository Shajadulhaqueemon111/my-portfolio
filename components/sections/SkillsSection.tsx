"use client";

import { useState } from "react";
import { Cpu, Search, Layers, Database, Wrench, Shield, Sparkles, Code2 } from "lucide-react";
import { skillsData } from "@/data/skills";
import { playSound } from "@/lib/audio";
import { ScrollReveal, TextReveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Frontend Engineering", "State & Data Management", "Backend & System Knowledge", "Tools & Development Workflow"];

  const filteredCategories = skillsData
    .map((category) => {
      if (activeCategory !== "All" && category.title !== activeCategory) {
        return null;
      }

      const filteredSkills = category.skills.filter((skill) => {
        const query = searchQuery.toLowerCase();
        return (
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.tags.some((t) => t.toLowerCase().includes(query))
        );
      });

      if (filteredSkills.length === 0) return null;

      return {
        ...category,
        skills: filteredSkills
      };
    })
    .filter(Boolean);

  const handleCategory = (cat: string) => {
    playSound("tab");
    setActiveCategory(cat);
  };

  return (
    <section id="skills" className="py-24 border-t border-zinc-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>Technical Competencies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
                <TextReveal text="Skills & Capabilities." />
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
                Curated tools, libraries, and frameworks I leverage to engineer production-ready frontend systems.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies..."
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-800/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Categories & Skill Cards Grid */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            category && (
              <ScrollReveal key={category.title} delay={0.15}>
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-zinc-200">{category.title}</h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                      {category.badge}
                    </span>
                  </div>

                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.skills.map((skill) => (
                      <StaggerItem key={skill.name}>
                        <Tilt3DCard intensity={8} className="h-full">
                          <div className="h-full group rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/90 p-4 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                                  {skill.name}
                                </h4>
                                <span className="w-2 h-2 rounded-full bg-emerald-500/80 group-hover:scale-125 transition-transform"></span>
                              </div>
                              <p className="text-[11px] font-mono text-zinc-400 mb-2 font-medium">
                                {skill.level}
                              </p>
                              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                                {skill.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-1 pt-2 border-t border-zinc-800/60">
                              {skill.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Tilt3DCard>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </ScrollReveal>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
