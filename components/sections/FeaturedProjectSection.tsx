"use client";

import { useState } from "react";
import { ExternalLink, Sparkles, CheckCircle2, Kanban, FileSearch, Users, Layers, Shield } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsData } from "@/data/projects";
import { playSound } from "@/lib/audio";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { ScrollReveal, TextReveal } from "@/components/motion/MotionWrapper";

export function FeaturedProjectSection() {
  const featured = projectsData.find((p) => p.featured) || projectsData[0];
  const [activeTab, setActiveTab] = useState<"kanban" | "ats" | "hr">("kanban");

  const handleTab = (tab: "kanban" | "ats" | "hr") => {
    playSound("tab");
    setActiveTab(tab);
  };

  return (
    <section className="py-24 border-t border-zinc-800/60 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/8 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="space-y-3 mb-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spotlight Project</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
              <TextReveal text={featured.title} />
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              {featured.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Browser Mockup Shell with 3D Tilt */}
        <ScrollReveal delay={0.15}>
          <Tilt3DCard intensity={5} className="w-full">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
          {/* Browser Chrome Header */}
          <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            {/* Window Dots & URL Bar */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <div className="px-3 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <span className="text-emerald-400">https://</span>
                <span>job-tracker.emon.dev/pipeline</span>
              </div>
            </div>

            {/* Mockup Interactive Navigation Tabs */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => handleTab("kanban")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === "kanban"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Kanban Pipeline</span>
              </button>
              <button
                onClick={() => handleTab("ats")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === "ats"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <FileSearch className="w-3.5 h-3.5" />
                <span>ATS Analyzer</span>
              </button>
              <button
                onClick={() => handleTab("hr")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === "hr"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>HR / RBAC Portal</span>
              </button>
            </div>
          </div>

          {/* Browser Screen Content Area */}
          <div className="p-5 sm:p-8 bg-zinc-950/60 min-h-[380px]">
            {activeTab === "kanban" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-200">Active Applications Pipeline</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                      Optimistic RTK Query Updates
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">Total Tracked: 18 Roles</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Column 1: Applied */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        Applied
                      </span>
                      <span className="font-mono text-zinc-500">4</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-950/90 border border-zinc-800 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">Linear App</span>
                        <span className="text-[10px] text-zinc-500 font-mono">2d ago</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">Frontend Engineer (React/TS)</p>
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400">Remote</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300">ATS 94%</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-950/90 border border-zinc-800 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">Vercel</span>
                        <span className="text-[10px] text-zinc-500 font-mono">4d ago</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">UI Platform Engineer</p>
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400">Next.js</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300">ATS 91%</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Interviewing */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        Interview Scheduled
                      </span>
                      <span className="font-mono text-zinc-500">2</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-950/90 border border-amber-500/30 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">Stripe</span>
                        <span className="text-[10px] text-amber-400 font-mono">Tomorrow 3 PM</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">Technical Frontend Round</p>
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400">System Design</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300">Round 2</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Offer */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
                      <span className="flex items-center gap-1.5 text-zinc-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Offer Extended
                      </span>
                      <span className="font-mono text-zinc-500">1</span>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-950/90 border border-emerald-500/40 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-200">Modern SaaS Corp</span>
                        <span className="text-[10px] text-emerald-400 font-mono">Reviewing</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">Frontend Software Engineer</p>
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300">Competitive Package</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ats" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileSearch className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-semibold text-zinc-200">ATS Keyword Match Engine</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                      Match Score: 92%
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Compares uploaded PDF resumes against targeted job description keywords using tokenized string matching and role requirements.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-1.5">
                      <span className="text-emerald-400 font-medium">✓ Matched High-Weight Keywords</span>
                      <div className="flex flex-wrap gap-1">
                        {["React.js", "Next.js", "TypeScript", "Redux Toolkit", "RTK Query", "REST API", "Tailwind CSS"].map((k) => (
                          <span key={k} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-1.5">
                      <span className="text-amber-400 font-medium">△ Recommended Additions</span>
                      <div className="flex flex-wrap gap-1">
                        {["GraphQL", "Microfrontends", "Jest/Playwright", "Webpack / Turbopack"].map((k) => (
                          <span key={k} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hr" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-semibold text-zinc-200">Role-Based Access (HR / Recruiter View)</h4>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                      Role: Hiring Admin
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    HR portal with permission guards allowing recruiters to review applicants, schedule interview rounds, post feedback notes, and update statuses.
                  </p>
                  <div className="space-y-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-zinc-200">Candidate: Md Sajedul Haque Emon</span>
                        <span className="block text-[11px] text-zinc-400">Frontend Developer • Dhaka</span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                        Passed Technical Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Browser Mockup Footer */}
          <div className="px-6 py-4 bg-zinc-900/80 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {featured.githubUrl && (
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("click")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {featured.liveUrl && (
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("pop")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Application</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Tilt3DCard>
    </ScrollReveal>
  </div>
</section>
  );
}
