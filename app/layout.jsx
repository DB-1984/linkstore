import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative bg-white">
        {/* THE BACKGROUND ENGINE */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="bg-studio-grid absolute inset-0" />
          <div className="grain-overlay absolute inset-0 opacity-[0.03]" />
        </div>

        {/* THE CONTENT */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>

        {/* RESTORED: The Toaster component */}
        <Toaster position="top-center" expand={false} richColors />
      </body>
    </html>
  );
}
