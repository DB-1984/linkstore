"use client";

import { useState } from "react";
import { createLink } from "@/lib/actions";
import { Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AddLinkBtn() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await createLink(formData);

    if (result?.success) {
      toast.success("Link added");
      setOpen(false);
      e.target.reset(); // Clear the form for next time!
    } else {
      toast.error(result?.error || "Something went wrong");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="rounded-full bg-black text-white size-14 sm:w-auto sm:px-2 shadow-2xl hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center border border-white/10"
        >
          <Plus size={24} strokeWidth={3} />
          <span className="hidden sm:inline font-black text-sm">Add Link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2rem] border-zinc-200 sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            Add Resource
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <Input
            name="title"
            placeholder="Title"
            className="rounded-xl border-zinc-200 h-11"
            required
          />
          <Input
            name="description"
            placeholder="Short description (optional)..."
            className="rounded-xl border-zinc-200 h-11"
          />
          <Input
            name="url"
            type="url"
            placeholder="https://..."
            className="rounded-xl border-zinc-200 h-11"
            required
          />
          <Input
            name="tags"
            placeholder="tags (comma separated)"
            className="rounded-xl border-zinc-200 h-11"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-xl h-11 font-bold"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Save Link"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
