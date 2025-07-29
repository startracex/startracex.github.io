import { type ClassNameValue, twJoin, twMerge } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]) {
  return twMerge(twJoin(...classes));
}
