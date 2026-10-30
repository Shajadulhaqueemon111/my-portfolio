import { Project } from "@/lib/types";

export const projectsData: Project[] = [
  {
    id: "ai-job-tracker",
    title: "AI Job Application Tracker",
    subtitle: "Intelligent Pipeline & ATS Management Platform",
    description: "A modern job application management platform designed to help candidates organize applications, track hiring progress, manage tailored resumes, and monitor application status with role-based dashboards.",
    longDescription: "Engineered to eliminate spreadsheet chaos for tech job seekers, this application streamlines the entire hiring journey. Features a visual drag-and-drop Kanban pipeline, intelligent resume-to-job ATS keyword analysis, role-based access for applicants and hiring managers, and comprehensive analytics tracking response rates and interview timelines.",
    category: "Full Stack",
    featured: true,
    image: "/projects/job-tracker.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "RTK Query", "JWT Auth", "REST API"],
    features: [
      "JWT Authentication with secure HTTP-only cookies and token refresh handling",
      "Role-Based Access Control (RBAC) separating Applicant and HR/Recruiter views",
      "Interactive Kanban Pipeline tracking stages: Wishlist, Applied, Screening, Interview, Offer",
      "Resume Management & ATS-friendly keyword comparison against job descriptions",
      "HR & Recruiter Dashboard with applicant filtering and status update workflows",
      "Real-time search, multi-field filtering, and application archive management",
      "Optimistic UI updates via RTK Query for instant status changes and zero latency",
      "Responsive, high-contrast dark interface crafted with clean modern typography"
    ],
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lucide Icons"],
      stateManagement: ["Redux Toolkit", "RTK Query"],
      backend: ["Node.js", "Express.js", "REST API"],
      database: ["MongoDB", "Mongoose"]
    },
    liveUrl: "https://job-tracker-demo.vercel.app", // placeholder variable
    githubUrl: "https://github.com/Shajadulhaqueemon111/ai-job-application-tracker", // placeholder variable
  },
  {
    id: "collaborative-note-system",
    title: "NoteStream Workspace",
    subtitle: "Real-time Note Management & Team Collaboration",
    description: "A sleek, distraction-free markdown note-taking and knowledge base application featuring rich-text editing, categorized workspaces, tag filtering, and instant state persistence.",
    longDescription: "Built for modern developers and knowledge workers, NoteStream offers instantaneous search, nested notebook hierarchies, and offline-resilient local sync. Implemented using React, TypeScript, and Redux Toolkit with responsive sidebar navigation and keyboard shortcuts.",
    category: "Frontend",
    image: "/projects/notestream.png",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "REST API"],
    features: [
      "Distraction-free Markdown editor with live side-by-side preview mode",
      "Notebook and tag organizational system with instant full-text filtering",
      "Pinning, favoriting, and color-coded priority labeling",
      "Debounced auto-save with state synchronization via Redux Toolkit",
      "Light and dark themes with custom accent color switcher",
      "Mobile-friendly drawer navigation with accessible keyboard shortcuts"
    ],
    techStack: {
      frontend: ["React.js", "TypeScript", "Tailwind CSS"],
      stateManagement: ["Redux Toolkit", "Local Storage Sync"],
      backend: ["Node.js", "Express.js REST API"]
    },
    liveUrl: "https://notestream-demo.vercel.app", // placeholder variable
    githubUrl: "https://github.com/Shajadulhaqueemon111/notestream-collaboration", // placeholder variable
  },
  {
    id: "saas-analytics-dashboard",
    title: "Apex SaaS Analytics Suite",
    subtitle: "Financial & User Telemetry Dashboard",
    description: "An enterprise-grade SaaS analytics and operations dashboard delivering high-density telemetry, interactive timeline charts, revenue metrics, and responsive data tables.",
    longDescription: "Designed with Linear-style aesthetic principles, this dashboard gives executive teams a real-time overview of monthly recurring revenue (MRR), churn analysis, customer cohorts, and recent transaction history. Focuses on fast rendering under heavy data loads with memoized computations.",
    category: "Dashboard",
    image: "/projects/saas-dashboard.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "RTK Query", "Data Tables"],
    features: [
      "Interactive revenue charts with date-range picker and comparison overlays",
      "Virtual scrolling data tables with multi-column sorting and CSV export",
      "Real-time event feed powered by polling and RTK Query cache invalidation",
      "Role-based privilege guards for admin, financial analyst, and viewer roles",
      "Compact command-menu (Cmd+K) for quick navigation across dashboard routes",
      "Accessible high-contrast UI with optimized chart rendering"
    ],
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "SVG Charts"],
      stateManagement: ["Redux Toolkit", "RTK Query"],
      backend: ["REST API", "Express.js"]
    },
    liveUrl: "https://apex-saas-dashboard.vercel.app", // placeholder variable
    githubUrl: "https://github.com/Shajadulhaqueemon111/apex-saas-analytics", // placeholder variable
  },
  {
    id: "modern-ecommerce-storefront",
    title: "Lumina Commerce",
    subtitle: "High-Performance Modern E-Commerce Platform",
    description: "A fast, headless e-commerce storefront with instantaneous client-side product filtering, slide-out cart drawer, variant selector, and responsive checkout UX.",
    longDescription: "Engineered for maximum conversion and speed, Lumina Commerce provides seamless browsing across product categories, dynamic price calculations based on chosen attributes, persistent cart state across sessions, and toast notifications for user actions.",
    category: "Frontend",
    image: "/projects/lumina-ecommerce.png",
    tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Cart Management"],
    features: [
      "Instant faceted filtering by category, price range, brand, and availability",
      "Interactive product gallery with thumbnail slider and image zoom preview",
      "Persistent slide-out shopping cart drawer with quantity counters",
      "Coupon code validation and real-time shipping estimate calculations",
      "Responsive checkout flow with step-by-step form validation",
      "Skeleton loading states and lazy-loaded image assets"
    ],
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      stateManagement: ["Redux Toolkit (Cart & Filter state)"],
      backend: ["REST API", "Axios"]
    },
    liveUrl: "https://lumina-commerce.vercel.app", // placeholder variable
    githubUrl: "https://github.com/Shajadulhaqueemon111/lumina-ecommerce-storefront", // placeholder variable
  },
  {
    id: "auth-rbac-system",
    title: "AuthShield RBAC Portal",
    subtitle: "Enterprise Identity & Access Management System",
    description: "A production-grade authentication and Role-Based Access Control (RBAC) portal featuring secure JWT token lifecycle, permissions matrix, and audit logging.",
    longDescription: "Built to demonstrate secure modern authentication architecture, AuthShield implements silent JWT token refreshes, route protection guards, permission matrices for users, managers, and superadmins, and interactive session inspection.",
    category: "System",
    image: "/projects/auth-shield.png",
    tags: ["React.js", "TypeScript", "JWT Auth", "RBAC", "Node.js", "Express.js"],
    features: [
      "Dual-token authentication flow (Short-lived Access Token + HTTP-only Refresh Token)",
      "Granular permission matrix (Create, Read, Update, Delete per resource)",
      "Route middleware guards redirecting unauthorized access with flash notices",
      "Password strength validator, reset password flow, and email verification UI",
      "User session manager allowing remote termination of active logins",
      "Clean administrative user directory with bulk role assignment"
    ],
    techStack: {
      frontend: ["React.js", "TypeScript", "Tailwind CSS"],
      stateManagement: ["Redux Toolkit", "Axios Interceptors"],
      backend: ["Node.js", "Express.js", "JWT", "MongoDB"]
    },
    liveUrl: "https://authshield-portal.vercel.app", // placeholder variable
    githubUrl: "https://github.com/Shajadulhaqueemon111/authshield-rbac-system", // placeholder variable
  },
  {
    id: "devpulse-community-platform",
    title: "DevPulse Community",
    subtitle: "Developer Publishing & Discussion Platform",
    description: "A full-featured developer social and article publishing platform with markdown parsing, code snippet highlighting, comment trees, and user profiles.",
    longDescription: "A community platform inspired by modern technical publications. Allows developers to publish technical articles, bookmark snippets, participate in threaded discussions, and follow fellow engineers with real-time UI notifications.",
    category: "Full Stack",
    image: "/projects/devpulse.png",
    tags: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "MERN Stack"],
    features: [
      "Interactive post feed with trending, latest, and bookmarked tabs",
      "Syntax-highlighted code blocks with one-click copy functionality",
      "Nested comment hierarchy with optimistic like and reply counters",
      "Developer public profile showcasing articles, tech badges, and bio",
      "Debounced search across authors, tags, and article bodies",
      "Fully responsive layout optimized for mobile reading"
    ],
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      stateManagement: ["Redux Toolkit", "RTK Query"],
      backend: ["Node.js", "Express.js", "MongoDB", "Mongoose"]
    },
    liveUrl: "https://devpulse-hub.vercel.app", // placeholder variable
    githubUrl: "https://github.com/Shajadulhaqueemon111/devpulse-community-platform", // placeholder variable
  }
];
