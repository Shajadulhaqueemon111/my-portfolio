import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VisitorTracker } from "@/components/tracker/VisitorTracker";
import { LiveChatWidget } from "@/components/ui/LiveChatWidget";
import { TawkToChat } from "@/components/chat/TawkToChat";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://emon-portfolio.vercel.app"),
  title: "Md Sajedul Haque Emon | Frontend Developer",
  description: "Md Sajedul Haque Emon is a Frontend Developer specializing in React, Next.js, TypeScript and modern web application development.",
  keywords: [
    "Md Sajedul Haque Emon",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "M360ICT",
    "Software Engineer",
    "UI/UX Developer",
    "Web Developer Bangladesh"
  ],
  authors: [{ name: "Md Sajedul Haque Emon", url: "https://github.com/Shajadulhaqueemon111" }],
  creator: "Md Sajedul Haque Emon",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emon-portfolio.vercel.app",
    title: "Md Sajedul Haque Emon | Frontend Developer",
    description: "Frontend Developer focused on building modern, scalable, and high-performance web applications with React, Next.js, and TypeScript.",
    siteName: "Md Sajedul Haque Emon Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Md Sajedul Haque Emon - Frontend Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Sajedul Haque Emon | Frontend Developer",
    description: "Frontend Developer specializing in React, Next.js, TypeScript and modern UI engineering.",
    images: ["/og-image.png"],
    creator: "@emon_frontend"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-emerald-500/20 selection:text-emerald-400">
        <SmoothScrollProvider>
          <VisitorTracker />
          {children}
          <LiveChatWidget />
          <TawkToChat />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
