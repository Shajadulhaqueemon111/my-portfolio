"use client";

import { useState, useEffect } from "react";
import { FileText, Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { developerInfo } from "@/data/developer";
import { playSound } from "@/lib/audio";

interface NavbarProps {
  onOpenResume: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "about", "experience", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    playSound("pop");
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playSound("click");
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="group flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl font-bold font-mono tracking-tighter text-zinc-100 group-hover:text-emerald-400 transition-colors">
            {developerInfo.initials}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-800 text-emerald-400 shadow-sm border border-zinc-700/60"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Icons & Resume */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* GitHub */}
          <a
            href={developerInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("click")}
            aria-label="GitHub Profile"
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* LinkedIn */}
          <a
            href={developerInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("click")}
            aria-label="LinkedIn Profile"
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* WhatsApp */}
          <a
            href={developerInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound("pop")}
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className="p-2 text-zinc-400 hover:text-emerald-400 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          {/* Resume CTA */}
          <button
            onClick={() => {
              playSound("pop");
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-medium rounded-full border border-zinc-700/80 hover:border-emerald-500/50 shadow-sm transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-900"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              playSound("tab");
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle mobile menu"
            className="p-2 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-900 border border-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800/80 backdrop-blur-xl px-4 py-5 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-900 text-emerald-400 border border-zinc-800"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href={developerInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-100"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={developerInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-100"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={developerInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 hover:text-emerald-300 border border-emerald-800/40"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-zinc-950 font-semibold text-xs rounded-lg shadow"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
