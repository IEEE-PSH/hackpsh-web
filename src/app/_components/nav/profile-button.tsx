"use client";

import React from "react";
import { User, Settings, LogOut, Palette, Moon, Sun, Tv2 } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/app/_components/ui/use-toast";
import { Skeleton } from "../ui/skeleton";

type ProfileDropdownProps = {
  userDisplayName: string | null;
  userEmailAddress: string | null;
};

function createUserProfileElements({
  userDisplayName,
  userEmailAddress,
}: ProfileDropdownProps) {
  if (userDisplayName && userEmailAddress) {
    return (
      <>
        <p className="font-medium">{userDisplayName}</p>
        <p className="text-sm truncate text-muted-foreground">
          {userEmailAddress}
        </p>
      </>
    )
  } else {
    return (
      <>
        <Skeleton className="w-48 h-4" />
        <Skeleton className="w-48 h-4" />
      </>
    );
  }
}

export default function ProfileDropdown({
  userDisplayName,
  userEmailAddress,
}: ProfileDropdownProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { setTheme } = useTheme();

  async function handleSignOut() {
    toast({
      title: "Signing Out...",
    });
    await supabase.auth.signOut();
    router.push(siteConfig.paths.home);
    router.refresh();
    toast({
      title: "Signed Out Successfully!",
      variant: "success",
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {createUserProfileElements({ userDisplayName, userEmailAddress })}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="space-x-2">
            <Palette className="w-4 h-4" />
            <span>Change Appearance</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="w-4 h-4 mr-2" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="w-4 h-4 mr-2" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Tv2 className="w-4 h-4 mr-2" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
