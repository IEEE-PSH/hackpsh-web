"use client"

import React from "react";
import { User, Settings, LogOut, Palette, Moon, Sun, Tv2 } from "lucide-react";
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "@/app/_components/ui/use-toast";

export default function ProfileDropdown() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { setTheme } = useTheme();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace(siteConfig.paths.home);
    toast({
      description: "Signing out...",
      duration: 2000,
      variant: "default"
    })
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
            <p className="font-medium">John Smith</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              johnsmith@gmail.com
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="w-4 h-4 mr-2" />
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
