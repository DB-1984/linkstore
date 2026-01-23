"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react"; // Added for light state
import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

export default function SearchForm({ ...props }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  // We use a small local state just to track what's in the box
  const [inputValue, setInputValue] = useState(q);

  // If the URL changes (like clicking "Clear Filters"), update the box
  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/links?q=${encodeURIComponent(inputValue.trim())}`);
    } else {
      router.push("/links");
    }
  };

  const handleClear = () => {
    setInputValue("");
    router.push("/links"); // Optional: clear the results too when they hit X
  };

  return (
    <form onSubmit={handleSearch} {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search your library..."
            className="pl-8 pr-8 rounded-xl border-zinc-100 focus-visible:ring-black"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50" />

          {/* THE CLEAR BUTTON */}
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-zinc-300 hover:text-black transition-colors"
            >
              <X size={14} strokeWidth={3} />
            </button>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
