// app/page.jsx
import Link from "next/link";

export default function RootPage() {
  // Eventually, NextAuth's getServerSession() goes here
  const session = null;

  // If the user is logged in, you could redirect or show a "Go to App" button
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <Link href="/dashboard" className="mt-4 text-blue-600 underline">
          Go to your Dashboard
        </Link>
      </div>
    );
  }

  // If no session, show your Dual Sign-up / Register UI
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="text-center">
          <h1 className="text-3xl main-logo font-bold text-blue-600">
            LinkStore
          </h1>
          <p className="mt-2 text-slate-600">
            Organize your internet bookmarks.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full text-center py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or join us</span>
            </div>
          </div>

          <Link
            href="/register"
            className="block w-full text-center py-3 px-4 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </main>
  );
}
