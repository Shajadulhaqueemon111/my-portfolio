import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    const recipientEmail = process.env.GMAIL_USER || "mdshajdulhaqueemon@gmail.com";
    const appPassword = process.env.GMAIL_APP_PASSWORD;

    let emailSentViaSmtp = false;
    let smtpError: string | null = null;

    // 1. Try sending directly to Gmail via Nodemailer SMTP if app password configured
    if (appPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: recipientEmail,
            pass: appPassword.replace(/\s+/g, ""), // strip any spaces
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${recipientEmail}>`,
          to: recipientEmail,
          replyTo: cleanEmail,
          subject: `⚡ [Portfolio Message] ${cleanSubject} — from ${cleanName}`,
          text: `You received a new message from your portfolio contact form:\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject}\nTime: ${new Date().toLocaleString()}\n\nMessage:\n${cleanMessage}\n\n--\nYou can reply directly to this email to contact ${cleanName} (${cleanEmail}).`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #fafafa; border-radius: 12px; border: 1px solid #27272a; overflow: hidden;">
              <div style="background: #111115; padding: 20px 24px; border-bottom: 1px solid #27272a;">
                <h2 style="margin: 0; color: #10b981; font-size: 18px;">⚡ New Portfolio Message Received</h2>
                <p style="margin: 4px 0 0 0; color: #a1a1aa; font-size: 13px;">Sent from Md Sajedul Haque Emon's Portfolio</p>
              </div>
              <div style="padding: 24px; font-size: 14px; line-height: 1.6;">
                <p style="margin-top: 0;"><strong>Sender Name:</strong> ${cleanName}</p>
                <p><strong>Sender Email:</strong> <a href="mailto:${cleanEmail}" style="color: #38bdf8; text-decoration: underline;">${cleanEmail}</a></p>
                <p><strong>Subject:</strong> ${cleanSubject}</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <hr style="border: none; border-top: 1px solid #27272a; margin: 20px 0;" />
                <p style="font-weight: 600; color: #34d399; margin-bottom: 8px;">Message:</p>
                <div style="background: #18181b; padding: 16px; border-radius: 8px; border: 1px solid #27272a; white-space: pre-wrap; color: #e4e4e7;">${cleanMessage}</div>
                <div style="margin-top: 24px;">
                  <a href="mailto:${cleanEmail}?subject=Re: ${encodeURIComponent(cleanSubject)}" style="display: inline-block; background: #10b981; color: #09090b; font-weight: 600; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 13px;">Reply to ${cleanName}</a>
                </div>
              </div>
              <div style="background: #09090b; padding: 14px 24px; border-top: 1px solid #27272a; color: #71717a; font-size: 12px; text-align: center;">
                Delivered straight to ${recipientEmail} via Nodemailer SMTP.
              </div>
            </div>
          `,
        });

        emailSentViaSmtp = true;
      } catch (err: unknown) {
        console.error("Nodemailer SMTP error:", err);
        smtpError = err instanceof Error ? err.message : "SMTP sending failed";
      }
    }

    // 2. Also try Discord Webhook if configured
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhook) {
      try {
        await fetch(discordWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Portfolio Sentinel",
            avatar_url: "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/mail.svg",
            embeds: [
              {
                title: "📬 New Message from Portfolio Contact Form!",
                color: 0x10b981,
                fields: [
                  { name: "Sender", value: cleanName, inline: true },
                  { name: "Sender Email", value: cleanEmail, inline: true },
                  { name: "Subject", value: cleanSubject, inline: false },
                  { name: "Message", value: cleanMessage, inline: false },
                  { name: "Delivered To", value: recipientEmail, inline: true },
                  { name: "Time", value: new Date().toLocaleString(), inline: true }
                ],
                footer: { text: "Md Sajedul Haque Emon Portfolio" }
              }
            ]
          })
        }).catch((e) => console.error(e));
      } catch {
        // ignore
      }
    }

    // Construct mailto link and web Gmail compose link as direct fallback
    const mailtoSubject = encodeURIComponent(`Portfolio Message: ${cleanSubject}`);
    const mailtoBody = encodeURIComponent(`Hi Emon,\n\nName: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`);
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${mailtoSubject}&body=${mailtoBody}`;
    const whatsappUrl = `https://wa.me/8801405851592?text=${encodeURIComponent(`Hi Emon, I sent a message via your portfolio.\nName: ${cleanName}\nEmail: ${cleanEmail}\nMessage: ${cleanMessage}`)}`;

    return NextResponse.json({
      success: true,
      message: emailSentViaSmtp 
        ? "Your message has been sent directly to Emon's Gmail inbox!" 
        : "Message registered! You can also click below to open directly in Gmail or WhatsApp.",
      emailSentViaSmtp,
      smtpError,
      requiresPasswordConfig: !appPassword,
      gmailComposeUrl,
      whatsappUrl,
      recipientEmail,
    });
  } catch (error) {
    console.error("Contact API handler error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
