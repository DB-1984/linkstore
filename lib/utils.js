import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn (Class Name) utility:
 * 1. clsx: Allows for conditional classes (e.g., isActive && "bg-blue-500").
 * 2. twMerge: Ensures the last Tailwind class wins if there's a conflict
 * (e.g., "px-2 px-4" becomes just "px-4" instead of both fighting).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
