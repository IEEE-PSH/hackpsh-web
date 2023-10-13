import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseURL() {
  if (typeof window !== 'undefined') return window.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  if (process.env.INTERNAL_ADDRESS) return `http://${process.env.INTERNAL_ADDRESS}:${process.env.PORT ?? 3000}`;
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}