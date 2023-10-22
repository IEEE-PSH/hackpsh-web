import { toast } from "@/app/_components/ui/use-toast";
import { type ClassValue, clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toastErrorParams() {
  //eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();
  const error_reason = searchParams.get("error");

  if (error_reason) {
    const error_description = searchParams.get("error_description");

    toast({
      variant: "destructive",
      title: error_reason,
      description: error_description as string,
      duration: 5000,
    });
  }
}
