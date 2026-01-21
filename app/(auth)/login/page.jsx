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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Your original Background Layer */}
      <div className="absolute inset-0 z-0 bg-dot-pattern mask-radial pointer-events-none" />

      {/* The Central Card with your original classes */}
      <div className="z-10 w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="mb-6 flex flex-col items-center gap-1 text-center">
          <h1 className="main-logo flex items-center gap-2 text-2xl font-bold tracking-tight">
            <span>LinkStore</span>
            <LinkIcon className="h-6 w-6" strokeWidth={2.5} />
          </h1>
          <h2 className="text-xl font-semibold mt-2">Sign in to LinkStore</h2>
          <p className="text-sm text-slate-500">
            Keep all your Links in one place.
          </p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-500 text-center font-medium">
                {error}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address*</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password*</Label>
                <Link
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full bg-slate-900 py-6 text-base font-semibold text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700">
              Sign in to LinkStore
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 dark:bg-slate-900">
                or
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/links" })}
            className="w-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
          >
            Sign in with google
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          New on our platform?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
