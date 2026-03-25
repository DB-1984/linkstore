"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updatePassword } from "@/lib/actions"; // We'll use the action we discussed

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const newPass = formData.get("newPassword");
    const confirmPass = formData.get("confirmPassword");

    if (newPass !== confirmPass) {
      toast.error("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await updatePassword(formData);
      if (res.success) {
        toast.success("Password updated successfully");
        e.target.reset(); // Clear the form
      } else {
        toast.error(res.error || "Failed to update password");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="••••••••"
          className="h-10 bg-white text-black border-gray-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="••••••••"
          className="h-10 bg-white text-black border-gray-200"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
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
          "Update Password"
        )}
      </Button>
    </form>
  );
}
