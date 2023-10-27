"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "./use-toast";

export function ToastErrorParams() {
  const searchParams = useSearchParams();
  const error_reason = searchParams.get("error");

  if (error_reason) {
    const error_description = searchParams.get("error_description");

    toast({
      variant: "destructive",
      title: error_reason,
      description: error_description!,
      duration: 5000,
    });
  }

  return (
    <></>
  )
}