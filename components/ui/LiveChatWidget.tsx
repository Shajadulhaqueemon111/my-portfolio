"use client";

import { useState } from "react";
import { MessageSquare, X, Send, CheckCircle2, Sparkles, Volume2, VolumeX, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { developerInfo } from "@/data/developer";
import { playSound, toggleMute, getMuteState } from "@/lib/audio";
import confetti from "canvas-confetti";

export function LiveChatWidget() {
  const isTawkActive = Boolean(process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [muted, setMuted] = useState(false);

  const handleToggle = () => {
    playSound("pop");
    setIsOpen(!isOpen);
  };

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) playSound("pop");
  };

  const setQuickMessage = (text: string) => {
    playSound("tab");
    setMessage(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    playSound("click");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          subject: "Live Quick Chat Inquiry",
          type: "live-chat"
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        playSound("success");
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.85, x: 0.9 }
          });
        } catch {
          // ignore confetti if blocked
        }
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to deliver. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. Please try emailing sajedul.emon.dev@gmail.com directly.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setMessage("");
    setName("");
    setEmail("");
  };

  if (isTawkActive) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          id="live-chat-toggle-btn"
          aria-label="Open live chat with Md Sajedul Haque Emon"
          className="group relative flex items-center gap-3 px-4 py-3 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 rounded-full border border-zinc-700/60 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:rotate-6 transition-transform" />
            <span className="text-sm font-medium tracking-tight">Quick Message</span>
          </div>
          <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 font-mono">
            Online
          </span>
        </button>
      )}

      {/* Live Chat Floating Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] bg-zinc-950/95 border border-zinc-800/80 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="px-5 py-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-bold text-sm text-black shadow-inner">
                  EM
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-semibold text-zinc-100">Emon</h4>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/30">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">Junior Software Engineer</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleSoundToggle}
                aria-label={muted ? "Unmute sounds" : "Mute sounds"}
                title={muted ? "Unmute sounds" : "Mute sounds"}
                className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-800 transition-colors"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleToggle}
                aria-label="Close chat"
                className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 max-h-[460px] overflow-y-auto">
            {status === "success" ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="text-base font-semibold text-zinc-100">Message Delivered!</h5>
                <p className="text-xs text-zinc-400 leading-relaxed px-4">
                  Thank you! Your note has been dispatched to Emon via real-time webhook. I typically respond within a few hours.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-4 text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/70 text-xs text-zinc-300 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Drop a quick note or recruiter inquiry. Sends directly to my mobile notifications.</span>
                </div>

                {/* Quick Prompts */}
                <div className="space-y-1.5">
                  <p className="text-[11px] text-zinc-400 font-medium">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setQuickMessage("Hi Emon, we have a Frontend Developer role we’d love to discuss with you.")}
                      className="text-[11px] px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors text-left"
                    >
                      💼 Frontend Role
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickMessage("Hi Emon, I saw your work on the AI Job Tracker and wanted to connect.")}
                      className="text-[11px] px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors text-left"
                    >
                      🚀 Connect on Work
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickMessage("Hi Emon, are you available for freelance or full-time opportunities?")}
                      className="text-[11px] px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors text-left"
                    >
                      🤝 Availability
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div>
                  <label htmlFor="quick-chat-name" className="block text-[11px] font-medium text-zinc-400 mb-1">
                    Your Name
                  </label>
                  <input
                    id="quick-chat-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full text-xs px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/80 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="quick-chat-email" className="block text-[11px] font-medium text-zinc-400 mb-1">
                    Your Email
                  </label>
                  <input
                    id="quick-chat-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full text-xs px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/80 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="quick-chat-message" className="block text-[11px] font-medium text-zinc-400 mb-1">
                    Message
                  </label>
                  <textarea
                    id="quick-chat-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full text-xs px-3 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/80 resize-none transition-colors"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/50">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium text-xs shadow-md shadow-emerald-500/20 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                      Dispatching...
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>

                <a
                  href={developerInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound("pop")}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 text-emerald-300 text-xs font-medium transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chat directly on WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-1 text-[10px] text-zinc-500 pt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500/70" />
                  <span>Real-time webhook alert • No spam guaranteed</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
