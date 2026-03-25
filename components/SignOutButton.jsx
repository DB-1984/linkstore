"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function SignOutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignout = () => {
    setIsLoggingOut(true);

    // 1. Show the initial toast
    toast.info("Logging out...", {
      duration: 2000, // Keep it visible
    });

    // 2. Set a timeout to wait before actually triggering the auth change
    setTimeout(async () => {
      await signOut({ callbackUrl: "/login" });
    }, 500); // 2-second delay
  };

  return (
    <button
      onClick={handleSignout}
      disabled={isLoggingOut}
      className={`p-2 transition-all rounded-full hover:bg-zinc-50 ${
        isLoggingOut
          ? "text-zinc-200 animate-pulse"
          : "text-zinc-400 hover:text-black"
      }`}
      title="Logout"
    >
      <LogOut size={18} />
    </button>
  );
}
