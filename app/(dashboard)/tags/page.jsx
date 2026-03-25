import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import LinkModel from "@/models/Link";
import { Tag } from "lucide-react";
import TagCard from "@/components/TagCard";

export default async function TagsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  await dbConnect();

  const uniqueTags = await LinkModel.distinct("tags", {
    owner: session.user.id,
  });

  const sortedTags = uniqueTags.sort((a, b) => a.localeCompare(b));

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 bg-black rounded-2xl flex items-center justify-center text-white">
            <Tag size={20} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter">Tags</h1>
        </div>
        <p className="text-black group-hover:text-indigo-600 transition-colors decoration-zinc-200 underline-offset-4 group-hover:decoration-indigo-200">
          Explore by category
        </p>
      </div>

      {sortedTags.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {sortedTags.map((tag) => (
            <TagCard key={tag} tag={tag} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border-2 border-dashed border-zinc-100 rounded-[3rem]">
          <p className="text-zinc-400 text-xs font-black uppercase tracking-widest">
            No tags found.
          </p>
        </div>
      )}
    </main>
  );
}
