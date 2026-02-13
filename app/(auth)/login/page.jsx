"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { LinkIcon, Loader2, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  // 1. Define the missing state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Invalid credentials");
      setLoading(false);
    } else {
      toast.success("Welcome back!", {
        description: "Redirecting to your dashboard...",
      });

      // Give the toast 1.5 seconds to be seen
      setTimeout(() => {
        window.location.href = "/links";
      }, 1500);
    }
  };

  return (
    /* The Main Card Container - No longer has min-h-screen or background grid */
    <div className="flex w-fit lg:w-full lg:max-w-[900px] overflow-hidden rounded-[2rem] border border-gray-200 bg-white/90 backdrop-blur-sm shadow-2xl">
      {/* LEFT: Form Section */}
      <div className="flex w-full flex-col justify-center items-center p-8 lg:w-1/2 lg:p-14 lg:items-start bg-white">
        <div className="w-[300px] sm:w-[340px] lg:w-full">
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-lg shadow-sm main-logo">
                L
              </div>
              <h1 className="main-logo text-xl font-bold text-black tracking-tighter">
                LinkStore
              </h1>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-black">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 mt-1">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="h-10 bg-white text-black border-gray-200 focus:ring-1 focus:ring-black"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  size="sm"
                  className="text-xs text-gray-400 hover:text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="h-10 bg-white text-black border-gray-200 focus:ring-1 focus:ring-black"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <span className="relative bg-white px-2 text-[10px] uppercase tracking-widest text-gray-300">
              Or continue with
            </span>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/links?login=success",
                prompt: "select_account",
              })
            }
            className="w-full flex gap-3 h-11 border-zinc-200 hover:bg-zinc-50 transition-all font-medium rounded-lg"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-gray-400 lg:text-left">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-black font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
          <Link
            href="/about"
            className="flex mt-4 items-center gap-2 text-sm font-bold tracking-tighter text-zinc-600 hover:text-black transition-colors"
          >
            <HelpCircle size={14} strokeWidth={3} /> What is LinkStore?
          </Link>
        </div>
      </div>

      {/* RIGHT: Visual Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f4f4f5] items-center justify-center p-12 relative overflow-hidden">
        {/* The Content Card */}
        <div className="relative z-10 w-full h-full rounded-[1.5rem] border border-gray-200/50 bg-white/70 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center shadow-black/[0.03]">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-4 shadow-lg shadow-black/20">
            <LinkIcon className="text-white" size={24} />
          </div>
          <h3 className="font-bold text-xl text-black tracking-tight">
            Organize your internet
          </h3>
          <p className="text-sm text-gray-400 mt-2 max-w-[240px] leading-relaxed">
            The simplest way to manage your digital collection.
          </p>
        </div>
      </div>
    </div>
  );
}
