import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import LinkModel from "@/models/Link";
import Link from "next/link";
import { Library } from "lucide-react";
import AddLinkBtn from "@/components/AddLinkBtn";
import { SignOutButton } from "@/components/SignOutButton";
import LinkCard from "@/components/LinkCard";
import EmptyState from "@/components/EmpyState";
import WelcomeToast from "@/components/WelcomeToast";

export async function generateMetadata({ searchParams }) {
  const { tag, q } = await searchParams;

  if (tag) return { title: `#${tag} Collection` };
  if (q) return { title: `Search: ${q}` };
  return { title: "My Library" };
}

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
    <div className="text-black selection:bg-black selection:text-white">
      <WelcomeToast user={session.user} />
      <div className="fixed bottom-6 right-6 z-[60] sm:bottom-10 sm:right-10">
        <AddLinkBtn />
      </div>

      <main className="mx-auto max-w-4xl px-6 py-10 sm:px-8">
        {/* 3. Combined Tag & Search Feedback */}
        {(tag || q) && (
          <div className="mb-10 mt-1 flex items-center justify-between bg-white border-2 border-zinc-900 p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-tight text-zinc-600 font-mono">
                Showing:
              </span>
              {tag && (
                <span className="bg-zinc-900 text-white text-[10px] font-black px-3 py-1 rounded-lg lowercase tracking-tight">
                  #{tag}
                </span>
              )}
              {q && (
                <span className="bg-indigo-50 text-indigo-600 border border-indigo-200 text-[10px] font-black px-3 py-1 rounded-lg uppercase">
                  "{q}"
                </span>
              )}
            </div>
            <Link
              href="/links"
              className="group flex items-center gap-2 text-[10px] font-black tracking-tight uppercase text-zinc-800 hover:text-black transition-colors"
            >
              <span>Clear Filter</span>
              <span className="text-lg leading-none">×</span>
            </Link>
          </div>
        )}

        <div className="mb-12">
          {/* The Flex container for the Icon and Title */}
          <div className="flex items-center gap-3 mb-3">
            {/* Black Icon Box matching the Tags style */}
            <div className="size-10 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
              <Library size={20} />
            </div>

            <h1 className="text-5xl font-black tracking-tighter leading-none">
              Library
            </h1>
          </div>

          {/* Curated by section */}
          <Link
            href="/account"
            className="group block w-fit transition-all active:scale-95"
          >
            <p className="text-black group-hover:text-indigo-600 transition-colors decoration-zinc-200 underline-offset-4 group-hover:decoration-indigo-200">
              Curated by{" "}
              <span className="text-black group-hover:text-indigo-600 transition-colors font-bold decoration-zinc-200 underline-offset-4 group-hover:decoration-indigo-200">
                {session.user.email}
              </span>
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
