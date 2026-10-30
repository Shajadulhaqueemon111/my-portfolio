"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { developerInfo } from "@/data/developer";
import { playSound } from "@/lib/audio";

export function Footer() {
  const scrollToTop = () => {
    playSound("pop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/70 backdrop-blur-sm relative z-10 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-mono tracking-tighter text-zinc-100">
              {developerInfo.initials}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-zinc-400 font-mono pl-1">Frontend Developer</span>
          </div>
          <p className="text-xs text-zinc-500 flex items-center gap-1.5">
            Designed &amp; built with passion by Md Sajedul Haque Emon.
          </p>
        </div>

        {/* Center / Social Links */}
        <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
          <a
            href={developerInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("click")}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <span className="text-zinc-700">•</span>
          <a
            href={developerInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("click")}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <span className="text-zinc-700">•</span>
          <a
            href={developerInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("pop")}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <span className="text-zinc-700">•</span>
          <a
            href={`mailto:${developerInfo.email}`}
            onClick={() => playSound("click")}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        {/* Right / Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 font-mono">
            &copy; 2026 Md Sajedul Haque Emon
          </span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800 transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
