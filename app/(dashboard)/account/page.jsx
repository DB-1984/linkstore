import { auth } from "@/auth";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import { redirect } from "next/navigation";
import { UserCog } from "lucide-react"; // Import a smart icon for Account

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    // Added px-6 to ensure it doesn't hit the screen edges on mobile
    <div className="max-w-xl mx-auto px-6 py-10 space-y-12">
      <header>
        <div className="flex items-center gap-3 mb-3">
          {/* Matching your Library/Tags style */}
          <div className="size-10 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
            <UserCog size={20} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-none">
            Account
          </h1>
        </div>

        <p className="text-black group-hover:text-indigo-600 transition-colors decoration-zinc-200 underline-offset-4 group-hover:decoration-indigo-200">
          Manage your credentials.
        </p>
      </header>

      {/* Password Reset Section - Standardized padding */}
      <section className="bg-white/40 backdrop-blur-md border border-zinc-200/50 p-6 rounded-2xl">
        <div className="mb-6">
          <h2 className="text-lg font-bold tracking-tight">Update Password</h2>
          <p className="text-xs text-zinc-500">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
        <UpdatePasswordForm />
      </section>

      {/* Account Info - Studio Style */}
      <section className="p-6 bg-white border-2 border-zinc-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <span className="text-xs font-black uppercase text-zinc-500 font-mono tracking-tighter">
            User ID
          </span>

          <span className="text-[11px] font-mono font-medium text-zinc-900 break-all sm:break-normal bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg shadow-inner">
            {session.user.id}
          </span>
        </div>
      </section>
    </div>
  );
}
