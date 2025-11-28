"use server";

import { Resend } from "resend";
import { auth } from "@clerk/nextjs/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailParams {
  to: string;
  subject: string;
  message: string;
  senderName?: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  message,
  senderName = "Pulsea Support",
  replyTo,
}: SendEmailParams) {
  try {
    // Verify user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: `${senderName} <onboarding@resend.dev>`, // You'll need to update this with your verified domain
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Pulsea</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>This email was sent from Pulsea Feedback Management System</p>
          </div>
        </div>
      `,
      replyTo: replyTo,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
