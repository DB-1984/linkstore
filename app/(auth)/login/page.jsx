"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link as LinkIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/links");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f5] p-4 lg:p-8">
      {/* Main Split Container */}
      <div className="flex w-full max-w-[900px] min-h-[600px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        {/* LEFT SIDE: The Form */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-16">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-black">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-500">
              Login to your LinkStore account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="h-11 rounded-xl border-slate-200 bg-white focus:ring-1 focus:ring-black"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" size="sm">
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-xs text-slate-500 hover:text-black hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="h-11 rounded-xl border-slate-200 bg-white focus:ring-1 focus:ring-black"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="h-11 w-full rounded-xl bg-[#18181b] font-medium text-white hover:bg-black">
              Login
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs text-slate-400">
              <span className="bg-white px-2 uppercase tracking-tight">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Buttons Row */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => signIn("google", { callbackUrl: "/links" })}
              className="h-11 w-full rounded-xl border-slate-200 hover:bg-slate-50"
            >
              <span className="font-bold">G</span>
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-black underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE: Content Area */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#f4f4f5] items-center justify-center p-12">
          <div className="relative flex h-full w-full items-center justify-center rounded-[1.5rem] border border-slate-200/50 bg-white/50">
            {/* Abstract Placeholder Graphic */}
            <div className="flex flex-col items-center gap-4 text-center opacity-20">
              <div className="h-16 w-16 rounded-full border-2 border-slate-400" />
              <div className="h-4 w-32 rounded-full bg-slate-400" />
              <div className="h-4 w-24 rounded-full bg-slate-400" />
            </div>

            {/* You could put a cool quote or a feature list here later */}
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-sm font-medium text-slate-400">
                "The simplest way to manage your digital life."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
