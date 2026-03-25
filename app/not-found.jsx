import Link from "next/link";
import { Home } from "lucide-react";

// Remove force-dynamic unless you specifically need headers/cookies here
// Next.js handles Not Found pages best as static or simple dynamic components

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      {/* Studio Style Icon */}
      <div className="size-12 bg-black rounded-2xl flex items-center justify-center text-white mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <span className="font-black text-xl">?</span>
      </div>

      <h2 className="text-6xl font-black tracking-tighter mb-2">404</h2>

      <p className="text-zinc-500 mb-8 font-medium max-w-[250px]">
        This page doesn't exist in this app.
      </p>
      <a
        href="/"
        className="group flex items-center gap-3 px-8 py-3 bg-white border-2 border-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
      >
        <Home size={16} />
        Return to Library
      </a>
    </div>
  );
}
