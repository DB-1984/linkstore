import "@/app/globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative isolate bg-background">
        {/* These two divs create the depth globally */}
        <div className="grain" />
        <div className="studio-spotlight" />

        {/* This wrapper holds your content (Sidebar, Nav, etc.) above the background */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
