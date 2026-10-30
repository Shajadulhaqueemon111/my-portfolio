import { ServiceItem } from "@/lib/types";

export const servicesData: ServiceItem[] = [
  {
    id: "frontend-development",
    title: "Frontend Engineering",
    description: "Building production-grade client interfaces with high visual polish, semantic accessibility, and clean component architecture.",
    iconName: "layout",
    deliverables: ["Modern React & Next.js", "Type-safe TypeScript", "Design system consistency", "Cross-browser fidelity"]
  },
  {
    id: "responsive-ui",
    title: "Responsive UI Development",
    description: "Crafting fluid layouts that look exceptional and function effortlessly across smartphones, tablets, laptops, and ultra-wide screens.",
    iconName: "smartphone",
    deliverables: ["Mobile-first design", "Touch gesture friendly", "Fluid typography & scaling", "Zero horizontal overflow"]
  },
  {
    id: "react-nextjs-apps",
    title: "React / Next.js Applications",
    description: "Engineering scalable web applications utilizing the Next.js App Router, Server Components, and optimized client interactivity.",
    iconName: "code",
    deliverables: ["App Router architecture", "Server & Client components", "Optimized routing", "SEO-ready metadata"]
  },
  {
    id: "api-integration",
    title: "API Integration & State Flow",
    description: "Connecting backend REST endpoints, handling real-time data caching, optimistic UI updates, and resilient network error states.",
    iconName: "network",
    deliverables: ["Redux Toolkit & RTK Query", "Axios interceptors", "Optimistic mutations", "Robust error boundaries"]
  },
  {
    id: "dashboard-development",
    title: "Dashboard & Admin Interfaces",
    description: "Developing data-dense operational dashboards featuring interactive data tables, analytics charts, and intuitive command bars.",
    iconName: "bar-chart-3",
    deliverables: ["Interactive telemetry", "Filterable data tables", "Clean metric widgets", "Actionable workflows"]
  },
  {
    id: "auth-rbac",
    title: "Authentication & RBAC Systems",
    description: "Implementing secure identity workflows, protected client routes, JWT token refresh mechanisms, and role-based interface views.",
    iconName: "shield-check",
    deliverables: ["Role-based UI gates", "JWT token lifecycle", "Protected route guards", "Security-first forms"]
  },
  {
    id: "performance-optimization",
    title: "Performance & Core Web Vitals",
    description: "Auditing and optimizing bundle sizes, eliminating layout shifts (CLS), reducing interaction delay (INP), and achieving 60fps animations.",
    iconName: "zap",
    deliverables: ["Code-splitting & lazy loads", "Lighthouse 95+ score audits", "Sub-second load times", "Memory leak prevention"]
  },
  {
    id: "ui-component-systems",
    title: "UI Component Systems",
    description: "Creating standardized, reusable design tokens and composable component libraries inspired by Tailwind CSS and Shadcn/UI.",
    iconName: "component",
    deliverables: ["Reusable UI library", "ARIA accessibility compliant", "Consistent spacing rhythm", "Design token variables"]
  }
];
