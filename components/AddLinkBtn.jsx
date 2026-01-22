"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createLink } from "@/lib/actions";
import { PlusCircle, Loader2, X } from "lucide-react";

// 1. This is a helper component, not exported
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center disabled:opacity-50 transition-colors"
    >
      {pending ? (
        <Loader2 className="animate-spin mr-2" size={18} />
      ) : (
        "Save Link"
      )}
    </button>
  );
}

// 2. This MUST be the default export that layout.jsx is looking for
export default function AddLinkBtn() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData) {
    const result = await createLink(formData);
    if (result?.success) {
      setIsOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-3 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-shadow shadow-sm font-medium"
      >
        <PlusCircle size={18} />
        <span>Add New Link</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border text-left">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-slate-900">Add New Link</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form action={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  name="title"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  placeholder="e.g. My GitHub"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  URL
                </label>
                <input
                  name="url"
                  type="url"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                  placeholder="dev, tools, web"
                />
              </div>

              <div className="pt-2">
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
