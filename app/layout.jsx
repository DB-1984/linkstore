import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative isolate bg-white text-zinc-900">
        {/* Background Layers */}
        <div className="bokeh-container">
          <div className="bokeh-blob blob-1" />
          <div className="bokeh-blob blob-2" />
          <div className="bokeh-blob blob-3" />
        </div>

        <div className="grain opacity-[0.03]" />
        <div className="studio-spotlight pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          {children}
        </div>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
