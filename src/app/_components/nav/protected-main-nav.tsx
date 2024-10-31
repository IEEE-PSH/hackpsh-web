import Link from "next/link";
import { Button } from "../ui/button";
import { siteConfig } from "@/app/_config/site";
import { Icons } from "../ui/icons";

export function ProtectedMainNav() {
  return (
    <div className="hidden md:flex">
      <Button variant="brand" size="navigation" asChild>
        <Link href={siteConfig.paths.home} scroll={true}>
          <Icons.brand className="h-8 w-8" />
          <span className="hidden text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
      </Button>
    </div>
  );
}
