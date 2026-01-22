import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import LinkModel from "@/models/Link";
import { ExternalLink, Link2, Tag } from "lucide-react";
import AddLinkBtn from "@/components/AddLinkBtn";
import { SignOutButton } from "@/components/SignOutButton";

export default async function LinksPage() {
  const session = await auth();
  if (!session) redirect("/login");

  await dbConnect();
  const links = await LinkModel.find({ owner: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* NAVBAR: Identity & Logout only
       */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-6">
            {/* Logo Style */}
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-black text-white font-black text-lg shadow-sm">
                L
              </div>
              {/* Changed xs:block to sm:block */}
              <span className="main-logo text-xl font-black tracking-tighter hidden sm:block">
                LinkStore
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 border-l border-zinc-100 pl-6">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-black">
                <Link2 size={14} strokeWidth={3} /> My Links
              </button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400 hover:text-black transition-colors">
                <Tag size={14} strokeWidth={3} /> Tags
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <SignOutButton />
          </div>
        </div>

        {/* MOBILE SUB-NAV (Below 768px) */}
        <div className="flex md:hidden border-t border-zinc-50 bg-white px-4 py-3 justify-center gap-8">
          <button className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-black">
            <Link2 size={12} strokeWidth={3} /> My Links
          </button>
          <button className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-400">
            <Tag size={12} strokeWidth={3} /> Tags
          </button>
        </div>
      </header>

      {/* FLOATING ACTION BUTTON: Pins to viewport
       */}
      <div className="fixed bottom-6 right-6 z-[60] sm:bottom-10 sm:right-10">
        <AddLinkBtn />
      </div>

      {/* MAIN CONTENT: Clean vertical flow
       */}
      <main className="mx-auto max-w-4xl px-6 py-10 sm:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter leading-none mb-3">
            Library
          </h1>
          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Curated by <span className="text-black">{session.user.email}</span>
          </p>
        </div>

        <div className="grid gap-4">
          {links.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-zinc-100 bg-zinc-50/50 text-zinc-400">
              <p className="text-xs font-black uppercase tracking-widest">
                No resources found
              </p>
            </div>
          ) : (
            links.map((link) => (
              <div
                key={link._id.toString()}
                className="group flex items-center justify-between rounded-[2rem] border border-zinc-100 bg-white p-6 transition-all hover:border-black hover:shadow-2xl"
              >
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="truncate text-xl font-bold leading-tight tracking-tight italic">
                    {link.title}
                  </span>
                  <span className="truncate text-xs font-medium text-zinc-400">
                    {link.url}
                  </span>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  className="ml-4 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 transition-all group-hover:bg-black group-hover:text-white active:scale-90"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
