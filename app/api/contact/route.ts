import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json().catch(() => null);

    if (!data) {
      return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
    }

    const { name, email, message, subject, type } = data;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: "Please provide a valid name (at least 2 characters)" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address" }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ success: false, error: "Please write a message of at least 5 characters" }, { status: 400 });
    }

    const cleanName = name.trim().substring(0, 100);
    const cleanEmail = email.trim().substring(0, 100);
    const cleanSubject = (subject || (type === "live-chat" ? "Live Quick Message" : "Portfolio Inquiry")).trim().substring(0, 150);
    const cleanMessage = message.trim().substring(0, 2000);
    const isLiveChat = type === "live-chat";

    // 1. Dispatch to Discord Webhook if configured
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    let discordSent = false;
    if (discordWebhook) {
      try {
        const response = await fetch(discordWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: isLiveChat ? "Portfolio Live Messenger" : "Portfolio Contact Form",
            avatar_url: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/mail.svg",
            embeds: [
              {
                title: isLiveChat ? "💬 Live Chat Message Received!" : "📬 New Contact Inquiry!",
                color: isLiveChat ? 0x06b6d4 : 0x10b981,
                fields: [
                  { name: "Sender", value: cleanName, inline: true },
                  { name: "Email", value: cleanEmail, inline: true },
                  { name: "Subject", value: cleanSubject, inline: false },
                  { name: "Message", value: cleanMessage, inline: false },
                  { name: "Received At", value: new Date().toLocaleString(), inline: true }
                ],
                footer: { text: "Md Sajedul Haque Emon Portfolio Notification System" }
              }
            ]
          })
        });
        discordSent = response.ok;
      } catch (err) {
        console.error("Discord contact webhook failed:", err);
      }
    }

    // 2. Dispatch to Telegram Bot if configured
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    let telegramSent = false;
    if (tgToken && tgChatId) {
      try {
        const tgText = `🔔 *New Message on Portfolio!*\n\n*From:* ${cleanName}\n*Email:* ${cleanEmail}\n*Type:* ${isLiveChat ? "Live Chat" : "Contact Form"}\n*Subject:* ${cleanSubject}\n\n*Message:*\n${cleanMessage}`;
        const response = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: tgText,
            parse_mode: "Markdown"
          })
        });
        telegramSent = response.ok;
      } catch (err) {
        console.error("Telegram contact notification failed:", err);
      }
    }

    // Also support custom generic webhook (e.g. Zapier, Make, n8n, Slack)
    const customWebhook = process.env.CUSTOM_WEBHOOK_URL;
    if (customWebhook) {
      try {
        await fetch(customWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage,
            timestamp: new Date().toISOString(),
            type: isLiveChat ? "live-chat" : "contact"
          })
        });
      } catch (err) {
        console.error("Custom webhook failed:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been received. I will get back to you shortly.",
      channelStatus: {
        discord: discordSent,
        telegram: telegramSent,
        webhookActive: Boolean(discordWebhook || (tgToken && tgChatId) || customWebhook)
      }
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message. Please try again or email directly." }, { status: 500 });
  }
}
