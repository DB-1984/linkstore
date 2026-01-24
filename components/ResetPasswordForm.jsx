// components/ResetPasswordForm.jsx
"use client";

import { useState } from "react";
import { updatePassword } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await updatePassword(formData);

    if (res.success) {
      toast.success("Security credentials updated");
      e.target.reset();
    } else {
      toast.error(res.error || "Update failed");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">
          Current Password
        </label>
        <input
          name="currentPassword"
          type="password"
          required
          className="studio-input" // Powered by your globals.css!
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">
            New Password
          </label>
          <input
            name="newPassword"
            type="password"
            required
            className="studio-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">
            Confirm
          </label>
          <input
            name="confirmPassword"
            type="password"
            required
            className="studio-input"
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="w-full bg-primary text-primary-foreground h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <>
            <ShieldCheck
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            Commit Changes
          </>
        )}
      </button>
    </form>
  );
}
