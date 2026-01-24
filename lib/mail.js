import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email, token) => {
  // Use NEXTAUTH_URL for the base link so it works in both dev and prod
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "LinkStore <onboarding@resend.dev>", // Resend provides this for testing
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 12px;">
          <h2 style="font-weight: 900; letter-spacing: -0.05em;">LinkStore</h2>
          <p style="color: #71717a; line-height: 1.5;">Someone requested a password reset for your account. If this wasn't you, ignore this email.</p>
          <a href="${resetLink}" style="display: inline-block; background: black; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">
            Reset Password
          </a>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false };
  }
};
