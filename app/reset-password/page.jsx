import ResetPasswordConfirmForm from "@/components/ResetPasswordConfirmForm";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { notFound } from "next/navigation";

export default async function ResetPasswordPage({ searchParams }) {
  // In Next.js 15+, searchParams is a Promise
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    notFound();
  }

  await dbConnect();

  // Verify token exists and hasn't expired
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold">Invalid or Expired Link</h1>
        <p className="text-zinc-500">
          Please request a new password reset link.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter mb-1">
          New Password
        </h1>
        <p className="text-zinc-500 text-sm">
          Set a new password for{" "}
          <span className="text-black font-bold">{user.email}</span>
        </p>
      </header>

      <ResetPasswordConfirmForm token={token} />
    </div>
  );
}
