import { auth } from "@/auth";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="max-w-xl mx-auto py-10 space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
          Security
        </h1>
        <p className="text-zinc-500 text-sm font-medium">
          Manage your credentials for{" "}
          <span className="text-indigo-400">{session.user.email}</span>
        </p>
      </header>

      {/* Password Reset Section */}
      <section className="studio-card p-8 rounded-[2rem]">
        <div className="mb-6">
          <h2 className="text-lg font-bold">Update Password</h2>
          <p className="text-xs text-zinc-500">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
        <ResetPasswordForm />
      </section>

      {/* Account Info (Read Only) */}
      <section className="p-8 border border-white/5 rounded-[2rem] bg-zinc-900/20">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-4">
          Account Metadata
        </h2>
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500 font-mono uppercase">User ID</span>
          <span className="text-zinc-400 font-mono">{session.user.id}</span>
        </div>
      </section>
    </div>
  );
}
