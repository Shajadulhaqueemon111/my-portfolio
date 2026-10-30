"use client";

import { X, ExternalLink, CheckCircle2, Layers, Cpu, Database } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Project } from "@/lib/types";
import { playSound } from "@/lib/audio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div>
            <span className="text-[11px] font-mono font-medium text-emerald-400 uppercase tracking-wider">
              {project.category} Architecture
            </span>
            <h3 className="text-lg font-bold text-zinc-100">{project.title}</h3>
          </div>
          <button
            onClick={() => {
              playSound("pop");
              onClose();
            }}
            aria-label="Close modal"
            className="p-2 text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Subtitle & Full Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-200">{project.subtitle}</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Engineering Features */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
              Key Architecture & Features
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Tech Stack Breakdown */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
              Technology Stack Breakdown
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Frontend</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.frontend.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.techStack.stateManagement && (
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-400">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>State & Data</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.stateManagement.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.techStack.backend && (
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-400">
                    <Database className="w-3.5 h-3.5" />
                    <span>Backend & Database</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.backend.concat(project.techStack.database || []).map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-mono">
            Clean Architecture • Tested UI
          </span>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("pop")}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
