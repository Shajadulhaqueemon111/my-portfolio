import { PhilosophyStep } from "@/lib/types";

export const philosophyData: PhilosophyStep[] = [
  {
    step: "01",
    title: "Understand",
    shortDesc: "Understand the product and user requirements.",
    fullDesc: "Before writing a single line of code, I dive into the core problem: user mental models, technical constraints, data schemas, and edge cases to ensure our solution targets real business objectives.",
    deliverables: ["Product requirements breakdown", "Component dependency map", "User interaction states", "API schema contract review"]
  },
  {
    step: "02",
    title: "Design",
    shortDesc: "Create clean, intuitive and responsive interfaces.",
    fullDesc: "Translating functional requirements into clear visual hierarchy. Establishing consistent typography, spacing scales, accessible color contrast, micro-interactions, and adaptive layouts for all screen sizes.",
    deliverables: ["Component anatomy & variants", "Responsive breakpoints plan", "Accessibility & contrast checks", "State transitions & micro-interactions"]
  },
  {
    step: "03",
    title: "Build",
    shortDesc: "Write scalable, reusable and maintainable code.",
    fullDesc: "Implementing modular components with strict TypeScript types, predictable unidirectional state flow, clean separation of concerns, and robust error handling.",
    deliverables: ["Type-safe React / Next.js code", "Modular & reusable components", "Redux/RTK Query integration", "Resilient network fallbacks"]
  },
  {
    step: "04",
    title: "Refine",
    shortDesc: "Test, optimize and continuously improve.",
    fullDesc: "A product is only complete when it feels effortless. I profile bundle footprints, eliminate unnecessary re-renders, test across real mobile devices, and optimize for Core Web Vitals.",
    deliverables: ["Lighthouse performance audits", "Cross-browser & mobile testing", "Animation 60fps profiling", "SEO & metadata verification"]
  }
];
