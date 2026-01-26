"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import TagPill from "@/components/TagPill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you installed this!
import {
  ExternalLink,
  Trash2,
  X,
  Pencil,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { deleteLink, updateLink } from "@/lib/actions";
import { toast } from "sonner";

export default function LinkCard({ link }) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget); // sent from edit form
    const res = await updateLink(link._id, formData);

    if (res.success) {
      toast.success("Updated successfully");
      setIsEditing(false); // Go back to view mode
    } else {
      toast.error(res.error || "Failed to update");
    }
    setLoading(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Permanently delete this resource?")) {
      const res = await deleteLink(link._id);
      if (res.success) {
        setOpen(false);
        toast.success("Resource removed");
      }
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) setIsEditing(false); // Reset to view mode when drawer closes
      }}
    >
      <DrawerTrigger asChild>
        <div className="group relative mx-auto w-full max-w-[600px] cursor-pointer active:scale-[0.98]">
          {/* THE CARD BODY */}
          <div className="flex items-center justify-between rounded-2xl border border-zinc-200/50 bg-white/40 p-6 backdrop-blur-xl transition-all duration-300 group-hover:bg-white/60 group-hover:shadow-xl group-hover:shadow-black/[0.02]">
            <div className="flex flex-col gap-1 overflow-hidden">
              <span className="truncate text-xl font-bold tracking-tight text-zinc-900">
                {link.title}
              </span>

              {link.description && (
                <p className="text-xs text-zinc-500 line-clamp-1 mb-1">
                  {link.description}
                </p>
              )}

              <div className="flex items-center gap-2">
                <span className="truncate text-xs text-zinc-400 font-medium">
                  {new URL(link.url).hostname}
                </span>
                {link.tags?.length > 0 && (
                  <span className="rounded-full bg-zinc-100/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-zinc-500">
                    {link.tags[0]}
                  </span>
                )}
              </div>
            </div>

            {/* THE ICON CONTAINER */}
            <div className="flex size-12 items-center justify-center rounded-xl bg-zinc-900/5 text-zinc-400 transition-all duration-300 group-hover:bg-black group-hover:text-white">
              <ExternalLink size={20} />
            </div>
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="rounded-t-[2rem] p-6 pb-10">
        <div className="mx-auto max-w-sm mt-4 w-full">
          <DrawerHeader className="px-0  pt-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-3xl font-black tracking-tighter">
                {isEditing ? "Edit" : "Manage"}
              </DrawerTitle>
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
              ) : (
                <DrawerClose asChild>
                  <button className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
                    <X size={16} />
                  </button>
                </DrawerClose>
              )}
            </div>
          </DrawerHeader>

          {!isEditing ? (
            /* VIEW MODE: This is your restored layout */
            <>
              <div className="mb-6 mt-2">
                <h3 className="text-xl font-bold leading-tight mb-2">
                  {link.title}
                </h3>
                {link.description && (
                  <p className="text-sm text-zinc-600 mt-4 mb-4">
                    {link.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  {link.tags?.map((tag) => (
                    <TagPill key={tag} name={tag} />
                  ))}
                </div>
                <p className="text-sm mt-4 font-mono text-zinc-600 truncate uppercase tracking-widest border-t border-zinc-50 pt-4">
                  {link.url}
                </p>
              </div>

              <div className="py-4">
                <Button
                  asChild
                  className="w-full bg-black text-white rounded-2xl h-16 font-bold text-lg shadow-xl active:scale-95 transition-all"
                >
                  <a href={link.url} target="_blank" rel="noreferrer">
                    Open Resource <ExternalLink className="ml-2" size={20} />
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-zinc-100">
                <Button
                  variant="outline"
                  className="rounded-2xl h-14 font-black text-sm border-zinc-200"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil size={14} className="mr-2" /> Edit Link
                </Button>

                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="rounded-2xl h-14 font-black text-sm border-red-100 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </Button>
              </div>
            </>
          ) : (
            /* EDIT MODE: The Morphing Form */
            <form onSubmit={handleUpdate} className="space-y-4 py-4">
              <Input
                name="title"
                defaultValue={link.title}
                placeholder="Title"
                className="rounded-xl h-11 border-zinc-200"
                required
              />
              <Textarea
                name="description"
                defaultValue={link.description}
                placeholder="Description"
                className="rounded-xl border-zinc-200 min-h-[80px]"
              />
              <Input
                name="url"
                defaultValue={link.url}
                type="url"
                placeholder="URL"
                className="rounded-xl h-11 border-zinc-200"
                required
              />
              <Input
                name="tags"
                defaultValue={link.tags?.join(", ")}
                placeholder="tags (comma separated)"
                className="rounded-xl h-11 border-zinc-200"
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
