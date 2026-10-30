"use client";

import Script from "next/script";

interface TawkToChatProps {
  propertyId?: string;
  widgetId?: string;
}

export function TawkToChat({
  propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
  widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "default",
}: TawkToChatProps) {
  // If propertyId is not configured yet, don't load script to prevent 404
  if (!propertyId || propertyId === "YOUR_PROPERTY_ID") {
    return null;
  }

  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function(){
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/${propertyId}/${widgetId}';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  );
}
