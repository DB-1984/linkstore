import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">
        404
      </h2>
      <p className="text-zinc-500 mb-6 font-medium">
        This page doesn't exist in LinkStore.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-black text-white rounded-lg font-bold text-sm uppercase tracking-tight"
      >
        Return Home
      </Link>
    </div>
  );
}
