"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkIcon, Loader2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your registration logic here
    setTimeout(() => setLoading(false), 1000);
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
            <h1 className="main-logo text-xl font-bold text-black mb-6">
              LinkStore
            </h1>
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
            type="button" // Important: prevents form submission
            onClick={() => signIn("google", { callbackUrl: "/links" })}
            className="w-full border-gray-200 text-black hover:bg-gray-50 rounded-lg h-10 font-medium"
          >
            Google
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
