"use client";
import { siteConfig } from "@/app/_config/site";
import { cn } from "@/app/_lib/client-utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminCreatePostButton() {
  const pathname = usePathname();

  if (pathname !== siteConfig.paths.announcements) return;

  return (
    <Button
      className={cn("h-8 font-semibold")}
      suppressHydrationWarning
      asChild
    >
      <Link href={siteConfig.paths.create_post} scroll={false}>
        <Plus className="-ml-1 mr-2" />
        <span>Create</span>
      </Link>
    </Button>
  );
}
