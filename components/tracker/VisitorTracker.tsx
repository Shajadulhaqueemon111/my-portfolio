"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    // Only track once per browser session to prevent duplicate spam
    try {
      const alreadyTracked = sessionStorage.getItem("emon_portfolio_visited");
      if (!alreadyTracked) {
        sessionStorage.setItem("emon_portfolio_visited", "true");

        const payload = {
          path: window.location.pathname,
          referrer: document.referrer || "Direct / Bookmark",
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          timestamp: new Date().toISOString()
        };

        // Non-blocking fetch
        fetch("/api/visitor-ping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {
          // Silent catch to prevent any user impact
        });
      }
    } catch {
      // Fallback if sessionStorage is disabled/restricted
    }
  }, []);

  return null;
}
