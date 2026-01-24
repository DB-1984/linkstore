"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { requestPasswordReset } from "@/lib/actions";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await requestPasswordReset(formData);

    setLoading(false);

    if (res.success) {
      setIsSubmitted(true);
      toast.success("Reset link sent!");
    } else {
      toast.error(res.error || "Something went wrong. Please try again.");
    }
  }

  // Success State: Show this after they submit the email using isSubmitted state update in handleSubmit
  if (isSubmitted) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
        <div className="w-full max-w-[400px] text-center space-y-6">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-zinc-100">
            <MailCheck className="size-8 text-black" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              Check your inbox
            </h1>
            <p className="text-zinc-500 text-sm">
              We've sent a password reset link to your email. The link will
              expire in 1 hour.
            </p>
          </div>
          <Link
            href="/login"
            className="inline-block text-sm font-bold uppercase tracking-widest underline underline-offset-8 hover:text-zinc-500 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  // Initial State: The Form
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
      <div className="w-full max-w-[400px] space-y-8">
        <Link
          href="/login"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={3} /> Back to Login
        </Link>

        <header className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter">
            Forgot Password
          </h1>
          <p className="text-zinc-500 text-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400"
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="h-12 border-zinc-200 bg-white text-black focus-visible:ring-black"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-black text-white hover:bg-zinc-800 font-bold rounded-xl transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
