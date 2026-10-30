"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, Copy, Check, MapPin, Sparkles, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { developerInfo } from "@/data/developer";
import { playSound } from "@/lib/audio";
import confetti from "canvas-confetti";
import { ScrollReveal, TextReveal } from "@/components/motion/MotionWrapper";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [sentDirectly, setSentDirectly] = useState(false);
  const [gmailUrl, setGmailUrl] = useState("");
  const [waUrl, setWaUrl] = useState("");

  const handleCopyEmail = () => {
    playSound("pop");
    navigator.clipboard.writeText(developerInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage("Please enter a message of at least 5 characters.");
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
          subject: subject || "Portfolio Contact Form Inquiry",
          message,
          type: "contact"
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setSentDirectly(Boolean(data.emailSentViaSmtp));
        setGmailUrl(data.gmailComposeUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${developerInfo.email}&su=${encodeURIComponent(subject || "Portfolio Inquiry")}&body=${encodeURIComponent(message)}`);
        setWaUrl(data.whatsappUrl || developerInfo.whatsappUrl);
        playSound("success");
        try {
          confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to dispatch message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. Please contact directly via email.");
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal className="space-y-3 mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            <TextReveal text="Let's Build Something Great." />
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Interested in discussing a frontend opportunity, engineering collaboration, or modern web interfaces? Reach out directly.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Socials */}
          <ScrollReveal direction="left" distance={20} className="lg:col-span-5 space-y-6">
            <Tilt3DCard intensity={5}>
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md space-y-6 shadow-xl">
                <h3 className="text-base font-bold text-zinc-100">Contact Channels</h3>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <span className="text-xs font-mono text-zinc-500 block uppercase">Primary Email</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${developerInfo.email}`}
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors break-all"
                  >
                    {developerInfo.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location & Response Badge */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{developerInfo.location}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Response time: Typically within 24 hours</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <span className="text-xs font-mono text-zinc-500 block uppercase">Professional Networks</span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={developerInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={developerInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("click")}
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-medium transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={developerInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound("pop")}
                    className="flex-1 min-w-[100px] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 hover:text-emerald-200 text-xs font-medium transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </Tilt3DCard>
        </ScrollReveal>

          {/* Right Column: Contact Form */}
          <ScrollReveal direction="right" distance={20} className="lg:col-span-7">
            <Tilt3DCard intensity={4}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl">
              {status === "success" ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100">
                    {sentDirectly ? "Delivered to Gmail!" : "Message Prepared & Registered!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-zinc-100">{name}</strong>! {sentDirectly 
                      ? "Your email was dispatched directly to mdshajdulhaqueemon@gmail.com via SMTP."
                      : "Your message has been processed. You can also send it directly via Gmail or WhatsApp in 1 click below:"
                    }
                  </p>

                  {/* Direct 1-Click Send Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                    {gmailUrl && (
                      <a
                        href={gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound("pop")}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition-all"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Gmail Web</span>
                      </a>
                    )}
                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound("pop")}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>Send via WhatsApp</span>
                      </a>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setMessage("");
                        setSubject("");
                      }}
                      className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Frontend Developer Role / Project Inquiry"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about the position, product, or ideas you'd like to collaborate on..."
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 resize-none transition-colors"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-xl border border-rose-900/50">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Dispatching Message...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
              </div>
            </Tilt3DCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
