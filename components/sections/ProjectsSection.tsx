"use client";

import { useState } from "react";
import { ExternalLink, ArrowUpRight, Sparkles, FolderGit2, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsData } from "@/data/projects";
import { Project } from "@/lib/types";
import { playSound } from "@/lib/audio";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { ScrollReveal, TextReveal, StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Frontend", "Full Stack", "Dashboard", "System"];

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  const handleFilter = (cat: string) => {
    playSound("tab");
    setFilter(cat);
  };

  return (
    <section id="projects" className="py-24 border-t border-zinc-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Portfolio Gallery</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
                <TextReveal text="Selected Work." />
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
                A collection of products, applications and interfaces I&apos;ve built with modern frontend engineering principles.
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    filter === cat
                      ? "bg-zinc-800 text-emerald-400 border border-zinc-700/80 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid with Stagger & 3D Tilt */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <Tilt3DCard intensity={10} className="h-full">
                <div className="h-full group rounded-2xl border border-zinc-800/90 bg-zinc-900/40 hover:bg-zinc-900/80 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-300 hover:border-zinc-700 hover:shadow-xl relative overflow-hidden">
                  {/* Subtle Ambient Hover Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>

              {/* Card Header & Category */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 font-semibold">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound("click");
                        }}
                        aria-label={`GitHub source for ${project.title}`}
                        className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-zinc-800 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSound("pop");
                        }}
                        aria-label={`Live demo for ${project.title}`}
                        className="p-1.5 text-zinc-400 hover:text-emerald-400 rounded-md hover:bg-zinc-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mb-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Highlight Features */}
                <ul className="space-y-1.5 mb-5 text-[11px] text-zinc-400">
                  {project.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                      <span className="text-emerald-400 font-bold shrink-0">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tech Badges & View Details */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/80"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    playSound("tab");
                    onSelectProject(project);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-medium border border-zinc-800 transition-colors cursor-pointer"
                >
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
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
