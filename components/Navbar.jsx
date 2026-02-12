"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, Tag, User } from "lucide-react";
import SignOutButton from "@/components/SignOutButton";
import SearchForm from "@/components/SearchForm";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/about",
  ].includes(pathname);

  return (
    <header className="sticky top-0 py-2 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/links" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-black text-white font-black text-lg shadow-sm">
              L
            </div>
            <span className="main-logo text-xl font-black tracking-tighter hidden sm:block">
              LinkStore
            </span>
          </Link>

          {/* Desktop Nav Items - Only if NOT an auth page */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center gap-6 border-l border-zinc-100 pl-6">
              <Link
                href="/links"
                className={`flex items-center gap-2 tracking-tighter text-sm transition-colors ${
                  isActive("/links")
                    ? "text-black font-black"
                    : "text-zinc-400 font-bold hover:text-black"
                }`}
              >
                <Link2 size={14} strokeWidth={3} /> Links
              </Link>
              <Link
                href="/tags"
                className={`flex items-center gap-2 tracking-tighter text-sm transition-colors ${
                  isActive("/tags")
                    ? "text-black font-black"
                    : "text-zinc-400 font-bold hover:text-black"
                }`}
              >
                <Tag size={14} strokeWidth={3} /> Tags
              </Link>
              <Link
                href="/account"
                className={`flex items-center gap-2 tracking-tighter text-sm transition-colors ${
                  isActive("/account")
                    ? "text-black font-black"
                    : "text-zinc-400 font-bold hover:text-black"
                }`}
              >
                <User size={14} strokeWidth={3} /> Account
              </Link>
            </nav>
          )}
        </div>

        {/* Right Side - Search and SignOut hidden on Auth pages */}
        {!isAuthPage && (
          <div className="flex items-center gap-4">
            <SearchForm className="hidden lg:block w-64" />
            <SignOutButton />
          </div>
        )}
      </div>

      {/* MOBILE SUB-NAV - Only if NOT an auth page */}
      {!isAuthPage && (
        <div className="md:hidden border-t border-zinc-100 bg-white/80 backdrop-blur-md px-6 py-4">
          <div className="flex flex-col gap-6">
            {" "}
            {/* Increased gap between search and icons */}
            <div className="lg:hidden">
              <SearchForm />
            </div>
            {/* 1. Removed gap-12 
          2. Added w-full and justify-around 
      */}
            <div className="flex w-full justify-around items-center">
              <Link
                href="/links"
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive("/links") ? "text-black" : "text-zinc-400"
                }`}
              >
                <Link2 size={22} strokeWidth={isActive("/links") ? 3 : 2} />
              </Link>

              <Link
                href="/tags"
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive("/tags") ? "text-black" : "text-zinc-400"
                }`}
              >
                <Tag size={22} strokeWidth={isActive("/tags") ? 3 : 2} />
              </Link>

              <Link
                href="/account"
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive("/account") ? "text-black" : "text-zinc-400"
                }`}
              >
                <User size={22} strokeWidth={isActive("/account") ? 3 : 2} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
