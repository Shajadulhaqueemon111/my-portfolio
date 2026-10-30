"use client";

import { Download, ArrowRight, Sparkles, Mail } from "lucide-react";
import { playSound } from "@/lib/audio";

interface ResumeCtaSectionProps {
  onOpenResume: () => void;
}

export function ResumeCtaSection({ onOpenResume }: ResumeCtaSectionProps) {
  const scrollToContact = () => {
    playSound("click");
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 border-t border-zinc-800/60 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next Steps</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
          Have a project or opportunity in mind?
        </h2>

        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
          I&apos;m always interested in building meaningful products and exploring new opportunities. Let&apos;s build something exceptional together.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              playSound("pop");
              onOpenResume();
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>

          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-medium text-sm border border-zinc-700/80 hover:border-zinc-600 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Contact Me</span>
            <ArrowRight className="w-4 h-4 text-zinc-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
