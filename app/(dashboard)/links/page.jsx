import { auth } from "@/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import LinkModel from "@/models/Link";
import { ExternalLink } from "lucide-react";

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
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Latest Links
        </h1>
        <p className="text-slate-500">Manage your saved collection.</p>
      </header>

      <div className="space-y-4">
        {links.length === 0 ? (
          <div className="p-12 border-2 border-dashed rounded-xl text-center text-slate-400">
            No links found for {session.user.email}.
          </div>
        ) : (
          links.map((link) => (
            <div
              key={link._id.toString()}
              className="flex items-center justify-between p-4 border rounded-xl bg-white shadow-sm"
            >
              <div className="flex flex-col">
                <span className="font-semibold">{link.title}</span>
                <span className="text-sm text-slate-500">{link.url}</span>
              </div>
              <a
                href={link.url}
                target="_blank"
                className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
