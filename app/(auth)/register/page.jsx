"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { registerUser } from "@/lib/actions"; // Your new action
import { signIn } from "next-auth/react"; // NextAuth client-side helper
import { LinkIcon, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // 1. Create the user
      const res = await registerUser(formData);

      if (!res.success) {
        toast.error(res.error || "Registration failed");
        setLoading(false); // Stop loading if DB creation fails
        return;
      }

      // 2. If we reach here, user creation was successful
      toast.success("Account created! Logging you in...");

      // 3. Attempt Sign In
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // We handle the redirect manually below
      });

      if (result?.error) {
        toast.error("Auto-login failed. Please login manually.");
        router.push("/login");
      } else {
        // 4. Force a hard refresh to the dashboard to sync the session
        window.location.href = "/links";
      }
    } catch (err) {
      // Only show "Unexpected Error" if it's NOT a redirect signal
      if (err.message !== "NEXT_REDIRECT") {
        console.error("Register Error:", err);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      // We don't necessarily need setLoading(false) here if we are redirecting,
      // but it's safe to keep it for the failure cases.
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5] p-4">
      <div className="flex w-full max-w-[950px] min-h-[650px] overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm text-left">
        {/* LEFT: Visual Section (Same as Login for brand consistency) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#f4f4f5] items-center justify-center p-12">
          <div className="w-full h-full rounded-[1.5rem] border border-gray-200/50 bg-white/50 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-4">
              <LinkIcon className="text-black" size={24} />
            </div>
            <h3 className="font-semibold text-lg text-black">
              Start your collection
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-[240px]">
              Join thousands of developers organizing their digital resources in
              one place.
            </p>
          </div>
        </div>

        {/* RIGHT: Form Section */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-14">
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black text-white font-black text-lg shadow-sm">
                L
              </div>
              <h1 className="main-logo text-xl font-bold text-black tracking-tighter">
                LinkStore
              </h1>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-black">
              Create an account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                className="h-10 bg-white text-black border-gray-200 focus:ring-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                className="h-10 bg-white text-black border-gray-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="h-10 bg-white text-black border-gray-200"
                required
              />
            </div>

            <Button className="w-full h-10 mt-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-all">
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-300">
              <span className="bg-white px-2">Or join with</span>
            </div>
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black font-semibold hover:underline inline-flex items-center gap-1"
            >
              Login <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
