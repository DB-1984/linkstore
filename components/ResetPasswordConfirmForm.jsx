"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { confirmPasswordReset } from "@/lib/actions";

export default function ResetPasswordConfirmForm({ token }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const newPass = formData.get("password");
    const confirmPass = formData.get("confirm");

    if (newPass !== confirmPass) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await confirmPasswordReset(formData);
      if (res.success) {
        toast.success("Password reset successfully! Please log in.");
        router.push("/login");
      } else {
        toast.error(res.error || "Failed to reset password");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* This hidden input passes the token from the URL to the Server Action */}
      <input type="hidden" name="token" value={token} />

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="h-10 bg-white text-black border-gray-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm New Password</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          placeholder="••••••••"
          className="h-10 bg-white text-black border-gray-200"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-10 mt-2 bg-black text-white hover:bg-gray-800 rounded-lg transition-all"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
