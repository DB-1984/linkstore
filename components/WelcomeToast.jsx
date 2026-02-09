"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function WelcomeToast({ user }) {
  useEffect(() => {
    if (user?.provider !== "google") return;

    const greeted = sessionStorage.getItem("g_greeted");

    if (!greeted) {
      // Add a 500ms heartbeat delay to let the UI settle
      const timer = setTimeout(() => {
        toast.success("Welcome back!", {
          description: `Signed in as ${user.email}`,
        });
        sessionStorage.setItem("g_greeted", "true");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [user]);

  return null;
}
