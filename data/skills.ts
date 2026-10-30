import { SkillCategory } from "@/lib/types";

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    badge: "Core Expertise",
    skills: [
      {
        name: "React.js",
        level: "Production Proficient",
        icon: "react",
        description: "Component architecture, custom hooks, virtual DOM optimization, concurrent features, and lifecycle management.",
        tags: ["Hooks", "Custom Hooks", "Context API", "Profiler", "Memoization"]
      },
      {
        name: "Next.js",
        level: "Production Proficient",
        icon: "nextjs",
        description: "App Router, Server & Client Components, Server Actions, Route Handlers, SEO optimization, and Image optimization.",
        tags: ["App Router", "SSR / SSG", "Server Components", "API Routes"]
      },
      {
        name: "TypeScript",
        level: "Strict Mode Native",
        icon: "typescript",
        description: "Strict typing, generics, utility types, discriminated unions, and end-to-end type safety across UI and API layers.",
        tags: ["Generics", "Utility Types", "Type Guards", "Interfaces"]
      },
      {
        name: "JavaScript (ES6+)",
        level: "Deep Core Understanding",
        icon: "javascript",
        description: "Asynchronous programming, event loop, closures, prototypes, DOM manipulation, promises, and modern ES syntax.",
        tags: ["Async/Await", "Event Loop", "Closures", "Destructuring"]
      },
      {
        name: "Tailwind CSS",
        level: "Rapid & Scalable Styling",
        icon: "tailwind",
        description: "Utility-first design systems, custom theme configuration, responsive breakpoints, dynamic states, and micro-animations.",
        tags: ["Responsive", "Dark Mode", "Custom Themes", "Fluid Typography"]
      },
      {
        name: "Shadcn/UI & Headless UI",
        level: "Design System Assembly",
        icon: "palette",
        description: "Accessible, unstyled primitive components, keyboard navigation, ARIA standards, and bespoke design systems.",
        tags: ["Radix UI", "Accessibility", "WAI-ARIA", "Composable Components"]
      },
      {
        name: "HTML5 & Semantic Markup",
        level: "Standards Compliant",
        icon: "html",
        description: "Clean semantic structure, accessibility (a11y), SEO tags, microdata, and structured web layouts.",
        tags: ["Semantic Tags", "Accessibility", "SEO Tags", "Audio/Video"]
      },
      {
        name: "CSS3 & Modern Layouts",
        level: "Advanced Layouts",
        icon: "css",
        description: "Flexbox, CSS Grid, keyframe animations, CSS variables, subgrid, container queries, and glassmorphism.",
        tags: ["CSS Grid", "Flexbox", "Keyframes", "Custom Properties"]
      }
    ]
  },
  {
    title: "State & Data Management",
    badge: "Architectural State",
    skills: [
      {
        name: "Redux Toolkit (RTK)",
        level: "Production Proficient",
        icon: "layers",
        description: "Centralized immutable state, slices, createAsyncThunk, custom middleware, and developer tooling.",
        tags: ["createSlice", "Thunk", "Redux DevTools", "Predictable State"]
      },
      {
        name: "RTK Query",
        level: "Data Fetching & Cache",
        icon: "database",
        description: "Declarative endpoints, automatic cache management, optimistic updates, automated re-fetching, and polling.",
        tags: ["Cache Invalidation", "Optimistic Updates", "Polling", "Normalized Data"]
      },
      {
        name: "REST API Integration",
        level: "Contract & Integration",
        icon: "network",
        description: "Robust error boundary handling, pagination, query params, multipart uploads, and status code management.",
        tags: ["Status Codes", "Pagination", "Data Normalization", "Error Handling"]
      },
      {
        name: "Axios",
        level: "HTTP Client Mastery",
        icon: "link",
        description: "Request/response interceptors, automatic JWT bearer attachment, silent token refresh cycles, and abort controllers.",
        tags: ["Interceptors", "Token Refresh", "Timeout", "Cancellation"]
      }
    ]
  },
  {
    title: "Backend & System Knowledge",
    badge: "Full Stack Fluency",
    skills: [
      {
        name: "Node.js",
        level: "Server Runtime",
        icon: "server",
        description: "Event-driven architecture, file system, streams, environment configuration, and npm package management.",
        tags: ["Event Loop", "Modules", "npm", "Async I/O"]
      },
      {
        name: "Express.js",
        level: "RESTful Services",
        icon: "cpu",
        description: "Middleware pipelines, RESTful routing, request validation, CORS management, and error handling middleware.",
        tags: ["Middleware", "Routing", "CORS", "Controllers"]
      },
      {
        name: "MongoDB & Mongoose",
        level: "NoSQL Modeling",
        icon: "database",
        description: "Schema definitions, relationships, aggregation pipelines, validation rules, and indexing for query performance.",
        tags: ["Schemas", "Aggregations", "Indexes", "CRUD"]
      },
      {
        name: "JWT Authentication",
        level: "Security Foundations",
        icon: "shield",
        description: "Stateless authentication, access token issuance, refresh token rotation, payload verification, and cookie security.",
        tags: ["Access/Refresh Tokens", "HMAC/RSA", "HTTP-Only Cookies"]
      },
      {
        name: "Role-Based Access (RBAC)",
        level: "Permission Control",
        icon: "lock",
        description: "Granular authorization, role hierarchy (Admin, Staff, User), route guards, and UI permission gates.",
        tags: ["Guards", "Permission Matrix", "Protected Routes", "Policy Check"]
      }
    ]
  },
  {
    title: "Tools & Development Workflow",
    badge: "Productivity & Shipping",
    skills: [
      {
        name: "Git & GitHub",
        level: "Version Control",
        icon: "git",
        description: "Branching strategies, atomic commits, pull requests, code reviews, merge conflict resolution, and CI/CD triggers.",
        tags: ["Branching", "Pull Requests", "Code Reviews", "Rebase"]
      },
      {
        name: "VS Code",
        level: "Power User",
        icon: "code",
        description: "Tailored debugging workflows, ESLint/Prettier integration, custom snippets, and terminal automation.",
        tags: ["Debugging", "Extensions", "Snippets", "Multi-cursor"]
      },
      {
        name: "Figma",
        level: "Design-to-Code Translation",
        icon: "figma",
        description: "Inspecting design tokens, auto-layout replication, component variants, spacing rhythm, and responsive layout audits.",
        tags: ["Design Tokens", "Auto Layout", "Components", "Asset Export"]
      },
      {
        name: "Vercel",
        level: "Continuous Deployment",
        icon: "vercel",
        description: "Edge network deployment, preview branches, environment variable secrets, analytics, and speed optimization.",
        tags: ["Deployments", "Preview URLs", "Edge Caching", "Build Logs"]
      }
    ]
  }
];
