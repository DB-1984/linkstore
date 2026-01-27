// For OAuth
"use client"
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function WelcomeToast({ user }) {
  const hasToasted = useRef(false)

  useEffect(() => {
    if (!hasToasted.current && user) {
      const timer = setTimeout(() => {
        toast.success('Welcome back!')
      }, 500)
      hasToasted.current = true
      return () => clearTimeout(timer)
    }
  }, [user])

  return null 
}