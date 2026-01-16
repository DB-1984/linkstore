// app/(dashboard)/layout.jsx
import Link from "next/link";

export default function DashboardLayout({ children }) {
  // Logic for your "Burger Menu" would go here
  // For now, we'll build the desktop-first sidebar structure

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* SIDEBAR */}
      <aside className="w-64 border-r bg-white p-6 flex flex-col justify-between">
        <div>
          <div className="font-bold text-2xl tracking-tight mb-8 text-blue-600">
            LinkStore
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md hover:bg-slate-100 transition-colors text-slate-700"
            >
              Latest Links
            </Link>
            <Link
              href="/tags"
              className="block px-3 py-2 rounded-md hover:bg-slate-100 transition-colors text-slate-700"
            >
              Tags
            </Link>
          </nav>
        </div>

        {/* USER SECTION (Bottom of Sidebar) */}
        <div className="pt-4 border-t border-slate-100">
          <div className="px-3 mb-2 text-sm font-medium text-slate-500">
            User: <span className="text-slate-900">John Doe</span>
          </div>
          <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
