"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/app/_lib/client-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import SignOutButton from "@/app/_components/ui/sign-out-button";
import LoginButton from "@/app/_components/nav/login-button";
import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import HackPSHIcon from "./hackpsh-logo";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { User, Menu } from "lucide-react";

const links: { title: string; href: string }[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Challenges",
    href: "/challenges",
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
  },
  {
    title: "Announcements",
    href: "/announcements",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const [logged, setLogged] = useState(false);

  //temporary conditional rendering
  useEffect(() => {
    void (async () => {
      const res = await supabase.auth.getUser();
      if (res.data.user === null) setLogged(false);
      else setLogged(true);
    })();
  }, []);

  return (
    <>
      <div className={cn("sticky flex w-full px-[12px] py-[10px] shadow-sm")}>
        <nav className={cn("mx-auto flex w-[1000px] flex-row items-center")}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(`sm:hidden`)}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <MenuNavLinks />
            </SheetContent>
          </Sheet>
          <HackPSHIcon className="mx-3 sm:mr-3 sm:flex" />

          <MainNavLinks />

          <ModeToggle />
          {logged ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-2 outline-none">
                <Button variant="ghost" size="icon">
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <SignOutButton className="w-full" />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginButton />
          )}
        </nav>
      </div>
    </>
  );

  function MainNavLinks() {
    return (
      <div className={cn(`hidden sm:flex`)}>
        {links.map((link) => (
          <Link
            key={"main" + link.href}
            href={link.href}
            className={cn(
              `hover:text-foreground/[85] ${pathname === link.href
                ? "text-foreground/100"
                : "text-foreground/70"
              } ${buttonVariants({ variant: null })}`,
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>
    );
  }

  function MenuNavLinks() {
    return (
      <div className={cn("flex flex-col space-y-4")}>
        <HackPSHIcon className="mx-3 sm:mr-3 sm:flex" />
        {links.map((link) => (
          <Link
            key={"menu" + link.href}
            href={link.href}
            className={cn(
              `ml-4 text-xl hover:text-foreground/[85]  ${pathname === link.href
                ? "text-foreground/100"
                : "text-foreground/70"
              }`,
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>
    );
  }
}
