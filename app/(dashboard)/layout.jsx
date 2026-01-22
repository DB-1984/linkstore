import { auth } from "@/auth";
import Link from "next/link";
import { LayoutGrid, Tag, PlusCircle, LogOut } from "lucide-react"; // Nice icons
import AddLinkBtn from "@/components/AddLinkBtn"; // The component we discussed!

export default async function DashboardLayout({ children }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <aside className="w-64 border-r bg-white p-6 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="main-logo font-bold text-2xl tracking-tight mb-8 text-blue-600 px-3">
            LinkStore
          </div>

          {/* THE PRIMARY ACTION */}
          <div className="mb-6 px-3">
            <AddLinkBtn />
          </div>

          <nav className="space-y-1">
            <Link
              href="/links"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors text-slate-700 font-medium"
            >
              <LayoutGrid size={18} />
              My Links
            </Link>
            <Link
              href="/tags"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors text-slate-700 font-medium"
            >
              <Tag size={18} />
              Tags
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Account
          </div>
          <div className="px-3 py-2 text-sm font-medium text-slate-900 truncate">
            {session?.user?.name || "User"}
          </div>
          {/* We'll handle the real Logout logic later */}
          <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
