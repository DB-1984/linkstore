"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { LinkIcon, Loader2 } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5] p-4">
      {/* Container */}
      <div className="flex w-full max-w-[900px] min-h-[550px] overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm text-left">
        {/* LEFT: Form Section */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-14">
          <div className="mb-8">
            {/* Flex container to hold Logo and Brand Name */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-lg shadow-sm">
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

          {/* 2. Form with handleSubmit */}
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
                className="h-10 bg-white text-black border-gray-200"
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
                  className="text-xs text-gray-400 hover:text-black hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="h-10 bg-white text-black border-gray-200"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-2 bg-black text-white hover:bg-gray-800 rounded-lg"
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
            onClick={() => signIn("google", { callbackUrl: "/links" })}
            className="w-full flex gap-3 h-11 border-zinc-200 hover:bg-zinc-50 transition-all font-medium"
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-black font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT: Visual Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#f4f4f5] items-center justify-center p-12">
          <div className="w-full h-full rounded-[1.5rem] border border-gray-200/50 bg-white/50 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
              <LinkIcon className="text-black" size={24} />
            </div>
            <h3 className="font-semibold text-lg text-black">
              Organize your internet
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-[240px]">
              The simplest way to manage your digital collection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
