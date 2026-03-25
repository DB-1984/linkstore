import { Link2 } from "lucide-react";
import AddLinkBtn from "./AddLinkBtn";

export default function EmptyState({ isSearch }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <h3 className="text-lg font-medium">
        {isSearch ? "No matches found" : "Your collection is empty"}
      </h3>
      <p className="text-sm text-gray-500">
        {isSearch
          ? "Try adjusting your filters or search terms."
          : "Start by adding your first digital resource!"}
      </p>
    </div>
  );
}
