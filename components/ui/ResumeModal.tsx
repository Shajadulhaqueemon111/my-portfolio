"use client";

import { useState } from "react";
import { X, Download, FileText, Check, ExternalLink, Briefcase, GraduationCap, Code } from "lucide-react";
import { playSound } from "@/lib/audio";
import confetti from "canvas-confetti";
import { developerInfo } from "@/data/developer";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    playSound("success");
    setDownloaded(true);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Trigger download or fallback printable preview
    const link = document.createElement("a");
    link.href = developerInfo.resumeUrl;
    link.download = "Md_Sajedul_Haque_Emon_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleCopyEmail = () => {
    playSound("pop");
    navigator.clipboard.writeText(developerInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-100">Resume / Curriculum Vitae</h3>
              <p className="text-xs text-zinc-400">Md Sajedul Haque Emon • Frontend Developer</p>
            </div>
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

        {/* Content Preview */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-medium">
                Professional Profile
              </span>
              <span className="text-xs text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50">
                1+ Year Real Experience
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Frontend Developer specializing in React.js, Next.js, and TypeScript. Engineering production-grade web applications with a focus on reusable component architecture, RTK Query state management, responsive UI systems, and zero-compromise performance.
            </p>
          </div>

          {/* Current Experience */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Current Position</span>
            </div>
            <div className="pl-4 border-l-2 border-emerald-500/40 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between text-xs">
                <span className="font-medium text-zinc-100">Junior Software Engineer / Frontend Developer</span>
                <span className="text-zinc-400 font-mono">2025 – Present</span>
              </div>
              <p className="text-xs text-emerald-400/90 font-medium">M360ICT • Dhaka, Bangladesh</p>
              <ul className="text-xs text-zinc-400 space-y-1 list-disc pl-4 pt-1">
                <li>Developing high-performance, responsive web interfaces using React.js, Next.js & TypeScript.</li>
                <li>Architecting modular UI components with Tailwind CSS and modern CSS systems.</li>
                <li>Integrating REST APIs and handling cache flow with Redux Toolkit & RTK Query.</li>
                <li>Collaborating with backend engineers to streamline API payloads and UI contracts.</li>
              </ul>
            </div>
          </div>

          {/* Core Technical Arsenal */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
              <Code className="w-4 h-4 text-emerald-400" />
              <span>Core Tech Stack</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/70">
                <span className="font-medium text-zinc-200 block">Frontend</span>
                <span className="text-[11px] text-zinc-400">React, Next.js, TypeScript, Tailwind</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/70">
                <span className="font-medium text-zinc-200 block">State & Data</span>
                <span className="text-[11px] text-zinc-400">Redux Toolkit, RTK Query, Axios</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/70">
                <span className="font-medium text-zinc-200 block">Backend & Auth</span>
                <span className="text-[11px] text-zinc-400">Node.js, Express, MongoDB, JWT/RBAC</span>
              </div>
            </div>
          </div>

          {/* Contact Verification */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-200 font-medium">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>Available for Mid-level &amp; Junior Frontend positions</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Email: <span className="text-zinc-200 font-mono">{developerInfo.email}</span> • WhatsApp: <a href={developerInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono">{developerInfo.phone}</a>
              </p>
            </div>
            <button
              onClick={handleCopyEmail}
              className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center gap-1 cursor-pointer self-start sm:self-auto bg-zinc-900 px-2.5 py-1.5 rounded border border-zinc-800"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
              <span>{copied ? "Copied!" : "Copy Email"}</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-zinc-500">
            Official PDF Document • Last Updated 2026
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playSound("pop");
                onClose();
              }}
              className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs rounded-lg shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{downloaded ? "Downloaded!" : "Download Resume PDF"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
