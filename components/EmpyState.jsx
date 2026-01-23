import { Link2 } from "lucide-react";
import AddLinkBtn from "./AddLinkBtn";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 rounded-[3rem] border-2 border-dashed border-zinc-100 bg-zinc-50/30 text-center animate-in fade-in zoom-in duration-500">
      <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-zinc-50">
        <Link2 className="text-zinc-300" size={32} />
      </div>

      <h3 className="text-xl font-black italic tracking-tighter text-black">
        Your library is empty
      </h3>
      <p className="mt-2 max-w-[240px] text-[10px] font-bold uppercase tracking-widest text-zinc-400 leading-relaxed">
        Start building your collection by adding your first resource.
      </p>

      <div className="mt-8">
        <AddLinkBtn />
      </div>
    </div>
  );
}
