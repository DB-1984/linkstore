import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import LinkModel from "@/models/Link";
import { ExternalLink, Plus } from "lucide-react";

// Shadcn Shell Components
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default async function LinksPage() {
  const session = await auth();
  if (!session) redirect("/login");

  await dbConnect();

  // Fetch only this user's links
  const links = await LinkModel.find({ owner: session.user.id })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* HEADER AREA */}
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-white">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="main-logo text-lg font-bold">LinkStore</h1>
          </div>

          {/* We'll put the "Add Link" button here later */}
          <Button size="sm" className="rounded-full gap-2 px-4">
            <Plus size={16} />
            Add Link
          </Button>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="p-6 md:p-10 max-w-6xl mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-black">
              Latest Links
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Manage your saved collection for {session.user.email}
            </p>
          </div>

          <div className="space-y-3">
            {links.length === 0 ? (
              <div className="p-20 border-2 border-dashed rounded-[2rem] text-center text-gray-400 bg-gray-50/50">
                <p>No links found yet.</p>
                <p className="text-xs mt-1">
                  Click the "Add Link" button to get started.
                </p>
              </div>
            ) : (
              links.map((link) => (
                <div
                  key={link._id.toString()}
                  className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-black leading-none">
                      {link.title}
                    </span>
                    <span className="text-xs text-gray-400 truncate max-w-[200px] md:max-w-md">
                      {link.url}
                    </span>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              ))
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
