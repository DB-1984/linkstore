import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import LinkModel from "@/models/Link";
import Link from "next/link";
import { ExternalLink, Link2, Tag } from "lucide-react";
import AddLinkBtn from "@/components/AddLinkBtn";
import { SignOutButton } from "@/components/SignOutButton";
import LinkCard from "@/components/LinkCard";
import EmptyState from "@/components/EmpyState";

// searchParams is a prototype of each NextJS page
// ... (imports remain the same)

export default async function LinksPage({ searchParams }) {
  const session = await auth();
  if (!session) redirect("/login");

  // 1. Unified await for params
  const { tag, q } = await searchParams;

  await dbConnect();

  // 2. Build the query
  const query = { owner: session.user.id };

  if (tag) query.tags = tag;

  if (q) {
    query.$or = [
      // mongoose OR
      { title: { $regex: q, $options: "i" } }, // case-insensitive on the regex
      { url: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ];
  }

  const rawLinks = await LinkModel.find(query).sort({ createdAt: -1 }).lean();
  const links = JSON.parse(JSON.stringify(rawLinks));

  return (
    <div className="min-h-screen text-black selection:bg-black selection:text-white">
      <div className="fixed bottom-6 right-6 z-[60] sm:bottom-10 sm:right-10">
        <AddLinkBtn />
      </div>

      <main className="mx-auto max-w-4xl px-6 py-10 sm:px-8">
        {/* 3. Combined Tag & Search Feedback */}
        {(tag || q) && (
          <div className="mb-8 flex items-center justify-between bg-zinc-50 border border-zinc-100 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                Showing:
              </span>
              {tag && (
                <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full lowercase">
                  #{tag}
                </span>
              )}
              {q && (
                <span className="border-2 border-black text-black text-[10px] font-black px-3 py-0.5 rounded-full uppercase">
                  "{q}"
                </span>
              )}
            </div>
            <Link
              href="/links"
              className="text-[10px] font-black uppercase text-zinc-400 hover:text-black transition-colors underline decoration-2 underline-offset-4"
            >
              Clear
            </Link>
          </div>
        )}

        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter leading-none mb-3">
            Library
          </h1>
          <p className="text-zinc-400 text-[10px] font-black uppercase">
            Curated by <span className="text-black">{session.user.email}</span>
          </p>
        </div>

        <div className="grid gap-4">
          {links.length === 0 ? (
            <EmptyState isSearch={!!(tag || q)} />
          ) : (
            links.map((link) => <LinkCard key={link._id} link={link} />)
          )}
        </div>
      </main>
    </div>
  );
}
