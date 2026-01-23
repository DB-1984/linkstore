import Link from "next/link";

export default function TagPill({ name }) {
  return (
    <Link
      href={`/links?tag=${encodeURIComponent(name)}`}
      className="text-[10px] bg-zinc-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter hover:bg-black hover:text-white transition-colors cursor-pointer"
    >
      {name}
    </Link>
  );
}
