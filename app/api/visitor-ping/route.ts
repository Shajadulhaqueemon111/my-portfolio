import { NextRequest, NextResponse } from "next/server";

interface VisitorLog {
  id: string;
  timestamp: string;
  ipMasked: string;
  deviceType: string;
  userAgent: string;
  referrer: string;
  language: string;
  screenResolution?: string;
  path: string;
}

// In-memory circular buffer for recent visits (last 50 visits)
const recentVisits: VisitorLog[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    // Mask IP for privacy (e.g. 192.168.xxx.xxx)
    const ipParts = ip.split(".");
    const ipMasked = ipParts.length === 4 ? `${ipParts[0]}.${ipParts[1]}.***.***` : "Internal/Edge";

    const userAgent = req.headers.get("user-agent") || "Unknown Browser";
    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
    const deviceType = isMobile ? "📱 Mobile" : "💻 Desktop";

    const logEntry: VisitorLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      ipMasked,
      deviceType,
      userAgent,
      referrer: body.referrer || req.headers.get("referer") || "Direct Navigation",
      language: req.headers.get("accept-language")?.split(",")[0] || "en",
      screenResolution: body.screenResolution || "Unknown",
      path: body.path || "/"
    };

    recentVisits.unshift(logEntry);
    if (recentVisits.length > 50) recentVisits.pop();

    // 1. Check for Discord Webhook Notification
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhook) {
      try {
        await fetch(discordWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Portfolio Sentinel",
            avatar_url: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/bell-ring.svg",
            embeds: [
              {
                title: "⚡ New Visitor on Portfolio!",
                description: `Someone just landed on **Md Sajedul Haque Emon**'s Portfolio.`,
                color: 0x10b981, // Emerald Green
                fields: [
                  { name: "Device", value: deviceType, inline: true },
                  { name: "Screen", value: logEntry.screenResolution || "N/A", inline: true },
                  { name: "Referrer", value: logEntry.referrer.substring(0, 80), inline: false },
                  { name: "Path", value: logEntry.path, inline: true },
                  { name: "Time", value: new Date().toLocaleString(), inline: true }
                ],
                footer: { text: "Emon's Real-time Visitor Alert System" }
              }
            ]
          })
        }).catch((err) => console.error("Discord ping error:", err));
      } catch (err) {
        console.error("Error dispatching Discord ping:", err);
      }
    }

    // 2. Check for Telegram Bot Notification
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChatId) {
      try {
        const text = `⚡ *Portfolio Visit Alert*\nSomeone visited your portfolio!\n• Device: ${deviceType}\n• Referrer: ${logEntry.referrer}\n• Time: ${new Date().toLocaleTimeString()}`;
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChatId,
            text,
            parse_mode: "Markdown"
          })
        }).catch((err) => console.error("Telegram ping error:", err));
      } catch (err) {
        console.error("Telegram notify failed:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Visitor ping registered",
      alertDispatched: Boolean(discordWebhook || (tgToken && tgChatId)),
      configured: {
        discord: Boolean(discordWebhook),
        telegram: Boolean(tgToken && tgChatId)
      }
    });
  } catch (error) {
    console.error("Visitor ping handler error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "Real-time Portfolio Visitor Tracking Service",
    recentVisitsCount: recentVisits.length,
    instructions: "Set DISCORD_WEBHOOK_URL or TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID in .env.local for instant push alerts to your phone."
  });
}
