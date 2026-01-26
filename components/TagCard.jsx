"use client";

import Link from "next/link";
import { Hash, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteTagGlobally } from "@/lib/actions"; // Match your action name
import { toast } from "sonner";

export default function TagCard({ tag }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm(`Remove #${tag} from all Links?`)) {
      setIsDeleting(true);
      const res = await deleteTagGlobally(tag);
      if (res.success) {
        toast.success(`Tag #${tag} removed`);
      } else {
        toast.error("Failed to delete tag");
        setIsDeleting(false);
      }
    }
  };

  return (
    <Link
      href={`/links?tag=${encodeURIComponent(tag)}`}
      className="group relative flex items-center gap-2 px-6 py-4 rounded-[2rem] border border-zinc-100 bg-white transition-all hover:shadow-xl hover:shadow-black/[0.02] active:scale-95"
    >
      <Hash
        size={14}
        className="text-zinc-300 group-hover:text-black transition-colors"
      />
      <span className="font-bold text-lg tracking-tight lowercase">{tag}</span>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="ml-2 p-1.5 rounded-full bg-zinc-50 text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
      >
        {isDeleting ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <X size={14} strokeWidth={3} />
        )}
      </button>
    </Link>
  );
}
