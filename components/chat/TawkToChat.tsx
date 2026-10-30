"use client";

import Script from "next/script";

interface TawkToChatProps {
  propertyId?: string;
  widgetId?: string;
}

export function TawkToChat({
  propertyId = "6ae4b4fadc4b23347380c3d6",
  widgetId = "1k66m5t4t",
}: TawkToChatProps) {
  // Guard against stale Vercel env variable from previous property
  const activePropertyId =
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID && process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID !== "6ae4b3ee25dc9e346ec8a3dd"
      ? process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
      : "6ae4b4fadc4b23347380c3d6";

  const activeWidgetId =
    process.env.NEXT_PUBLIC_TAWK_WIDGET_ID && process.env.NEXT_PUBLIC_TAWK_WIDGET_ID !== "default"
      ? process.env.NEXT_PUBLIC_TAWK_WIDGET_ID
      : "1k66m5t4t";

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
            s1.src = 'https://embed.tawk.to/${activePropertyId}/${activeWidgetId}';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            if (s0 && s0.parentNode) {
              s0.parentNode.insertBefore(s1, s0);
            } else {
              document.head.appendChild(s1);
            }
          })();
        `,
      }}
    />
  );
}
