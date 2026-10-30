"use client";

import { useState } from "react";
import { Check, Copy, Terminal, Eye, Code2, Sparkles, Layers } from "lucide-react";
import { playSound } from "@/lib/audio";

export function CodeWindow() {
  const [activeTab, setActiveTab] = useState<"profile" | "architecture" | "preview">("profile");
  const [copied, setCopied] = useState(false);
  const [counter, setCounter] = useState(1);
  const [liked, setLiked] = useState(false);

  const snippets = {
    profile: `// EmonProfile.tsx — Modern Frontend Architecture
import React from 'react';

export const DeveloperProfile: React.FC = () => {
  const developer = {
    name: "Md Sajedul Haque Emon",
    role: "Frontend Developer",
    currentCompany: "M360ICT",
    experience: "1+ Year Professional Experience",
    coreStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    stateFlow: ["Redux Toolkit", "RTK Query"],
    mindset: "Crafting zero-lag, accessible interfaces",
    openToWork: true
  };

  return (
    <div className="engineered-for-performance">
      <h1>Building Interfaces That Feel Exceptional</h1>
      <p>Clean UI • Reusable Components • Type-safe</p>
    </div>
  );
};`,
    architecture: `// StateArchitecture.ts — Scalable Data Flow
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const enterpriseApi = createApi({
  reducerPath: 'enterpriseApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      headers.set('Authorization', \`Bearer \${getJwtToken()}\`);
      return headers;
    }
  }),
  tagTypes: ['Applications', 'Telemetry', 'UserSession'],
  endpoints: (builder) => ({
    getPipelineStages: builder.query<Stage[], void>({
      query: () => '/pipeline/stages',
      providesTags: ['Applications'],
    }),
  }),
});`
  };

  const handleCopy = () => {
    playSound("pop");
    const code = activeTab === "architecture" ? snippets.architecture : snippets.profile;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (tab: "profile" | "architecture" | "preview") => {
    playSound("tab");
    setActiveTab(tab);
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/90 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-zinc-700/70">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-zinc-800/80 bg-zinc-900/60 gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:opacity-100 transition-opacity"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:opacity-100 transition-opacity"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 hidden xl:flex items-center gap-1.5 ml-1">
            <Terminal className="w-3 h-3 text-zinc-400 shrink-0" />
            <span>emon@m360ict:~/portfolio</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:flex xl:hidden items-center gap-1.5 ml-1">
            <Terminal className="w-3 h-3 text-zinc-400 shrink-0" />
            <span>~/portfolio</span>
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-lg border border-zinc-800/80 shrink-0">
          <button
            onClick={() => handleTabChange("profile")}
            className={`px-2 sm:px-2.5 py-1 text-xs font-mono rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === "profile"
                ? "bg-zinc-800 text-emerald-400 shadow-sm border border-zinc-700/60 font-medium"
                : "text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>Profile.tsx</span>
          </button>
          <button
            onClick={() => handleTabChange("architecture")}
            className={`px-2 sm:px-2.5 py-1 text-xs font-mono rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === "architecture"
                ? "bg-zinc-800 text-emerald-400 shadow-sm border border-zinc-700/60 font-medium"
                : "text-zinc-400 hover:text-zinc-200"
              }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>DataFlow.ts</span>
          </button>
          {/* <button
            onClick={() => handleTabChange("preview")}
            className={`px-2 sm:px-2.5 py-1 text-xs font-mono rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === "preview"
                ? "bg-emerald-500/10 text-emerald-400 shadow-sm border border-emerald-500/30 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Live UI</span>
          </button> */}
        </div>

        {/* Copy Button */}
        {activeTab !== "preview" ? (
          <button
            onClick={handleCopy}
            className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-800 transition-colors shrink-0"
            title="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        ) : (
          <div className="w-7 shrink-0"></div>
        )}
      </div>

      {/* Code Window Body */}
      <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto min-h-[300px]">
        {activeTab === "profile" && (
          <pre className="text-zinc-300 leading-relaxed font-mono">
            <code>
              <span className="text-zinc-500">// EmonProfile.tsx — Modern Frontend Architecture</span>
              {"\n"}
              <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-emerald-300">&apos;react&apos;</span>;
              {"\n\n"}
              <span className="text-purple-400">export const</span> <span className="text-cyan-400">DeveloperProfile</span>: React.FC = () =&gt; {"{"}
              {"\n"}  <span className="text-purple-400">const</span> developer = {"{"}
              {"\n"}    name: <span className="text-emerald-300">&quot;Md Sajedul Haque Emon&quot;</span>,
              {"\n"}    role: <span className="text-emerald-300">&quot;Frontend Developer&quot;</span>,
              {"\n"}    company: <span className="text-emerald-300">&quot;M360ICT&quot;</span>,
              {"\n"}    experience: <span className="text-emerald-300">&quot;1+ Year Professional&quot;</span>,
              {"\n"}    coreStack: [<span className="text-emerald-300">&quot;React&quot;</span>, <span className="text-emerald-300">&quot;Next.js&quot;</span>, <span className="text-emerald-300">&quot;TypeScript&quot;</span>],
              {"\n"}    stateFlow: [<span className="text-emerald-300">&quot;Redux Toolkit&quot;</span>, <span className="text-emerald-300">&quot;RTK Query&quot;</span>],
              {"\n"}    openToWork: <span className="text-amber-400">true</span>
              {"\n"}  {"}"};
              {"\n\n"}  <span className="text-purple-400">return</span> (
              {"\n"}    &lt;<span className="text-rose-400">div</span> <span className="text-amber-300">className</span>=<span className="text-emerald-300">&quot;engineered-for-performance&quot;</span>&gt;
              {"\n"}      &lt;<span className="text-rose-400">h1</span>&gt;Building Interfaces That Feel Exceptional&lt;/<span className="text-rose-400">h1</span>&gt;
              {"\n"}    &lt;/<span className="text-rose-400">div</span>&gt;
              {"\n"}  );
              {"\n"}{"}"};
            </code>
          </pre>
        )}

        {activeTab === "architecture" && (
          <pre className="text-zinc-300 leading-relaxed font-mono">
            <code>
              <span className="text-zinc-500">// StateArchitecture.ts — Predictable Data Flow</span>
              {"\n"}
              <span className="text-purple-400">import</span> {"{"} createApi, fetchBaseQuery {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-300">&apos;@reduxjs/toolkit/query/react&apos;</span>;
              {"\n\n"}
              <span className="text-purple-400">export const</span> <span className="text-cyan-400">enterpriseApi</span> = createApi({"{"}
              {"\n"}  reducerPath: <span className="text-emerald-300">&apos;enterpriseApi&apos;</span>,
              {"\n"}  baseQuery: fetchBaseQuery({"{"}
              {"\n"}    baseUrl: <span className="text-emerald-300">&apos;/api/v1&apos;</span>,
              {"\n"}    prepareHeaders: (headers) =&gt; {"{"}
              {"\n"}      headers.set(<span className="text-emerald-300">&apos;Authorization&apos;</span>, <span className="text-emerald-300">&grave;Bearer \${"{getAuthToken()}"}&grave;</span>);
              {"\n"}      <span className="text-purple-400">return</span> headers;
              {"\n"}    {"}"}
              {"\n"}  {"}"}),
              {"\n"}  tagTypes: [<span className="text-emerald-300">&apos;Applications&apos;</span>, <span className="text-emerald-300">&apos;Telemetry&apos;</span>],
              {"\n"}  endpoints: (builder) =&gt; ({"{"}
              {"\n"}    getApplications: builder.query({"{"}
              {"\n"}      query: () =&gt; <span className="text-emerald-300">&apos;/applications&apos;</span>,
              {"\n"}      providesTags: [<span className="text-emerald-300">&apos;Applications&apos;</span>]
              {"\n"}    {"}"})
              {"\n"}  {"}"})
              {"\n"}{"}"});
            </code>
          </pre>
        )}

        {activeTab === "preview" && (
          <div className="h-full flex flex-col justify-center space-y-4 font-sans py-2">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-zinc-100">Live Component Sandbox</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                  Interactive State
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-normal">
                This micro-widget is running real React state in real-time. Click to test reactivity and synthesized audio:
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    playSound("click");
                    setCounter((c) => c + 1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono border border-zinc-700/60 active:scale-95 transition-all cursor-pointer"
                >
                  Increment: <span className="text-emerald-400 font-bold">{counter}</span>
                </button>

                <button
                  onClick={() => {
                    playSound("pop");
                    setLiked(!liked);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ${liked
                    ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                    : "bg-zinc-800 border-zinc-700/60 text-zinc-300 hover:bg-zinc-700"
                    }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{liked ? "Fired (Clean UI)" : "Test Micro-interaction"}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 px-1 font-mono">
              <span>Latency: &lt; 1ms</span>
              <span>Framework: Next.js 16 + React 19</span>
            </div>
          </div>
        )}
      </div>

      {/* Window Footer Status Bar */}
      <div className="px-4 py-2 border-t border-zinc-800/60 bg-zinc-950 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            TypeScript Strict Mode
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="hidden sm:inline">UTF-8</span>
        </div>
        {/* <span className="text-zinc-400">100% Production Ready</span> */}
      </div>
    </div>
  );
}
