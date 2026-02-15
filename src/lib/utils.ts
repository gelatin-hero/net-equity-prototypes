import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-xxs", "text-s", "text-m", "text-l"],
      shadow: ["shadow-xs", "shadow-xl", "shadow-input", "shadow-input-error"],
      size: ["ic-m", "ic-l", "ic-xl", "ic-2xl", "ic-3xl"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
