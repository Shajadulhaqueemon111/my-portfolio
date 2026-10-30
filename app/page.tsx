"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjectSection } from "@/components/sections/FeaturedProjectSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ResumeCtaSection } from "@/components/sections/ResumeCtaSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Project } from "@/lib/types";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Sticky Blur Navbar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onOpenResume={() => setResumeOpen(true)} />

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. Experience Section (M360ICT 1+ Year) */}
        <ExperienceSection />

        {/* 4. Featured Project Spotlight (AI Job Application Tracker) */}
        <FeaturedProjectSection />

        {/* 5. Projects Section (Selected Work) */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 6. Skills Section (No fake percentages, interactive) */}
        <SkillsSection />

        {/* 7. Development Philosophy (How I Build) */}
        <PhilosophySection />

        {/* 8. Services / What I Do */}
        <ServicesSection />

        {/* 9. Resume CTA */}
        <ResumeCtaSection onOpenResume={() => setResumeOpen(true)} />

        {/* 10. Contact Section */}
        <ContactSection />
      </main>

      {/* Minimal Premium Footer */}
      <Footer />

      {/* Modals */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
