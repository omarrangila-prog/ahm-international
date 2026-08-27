import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-pads a section/index numeral: 3 -> "03". */
export function numeral(n: number, width = 2) {
  return String(n).padStart(width, "0");
}
