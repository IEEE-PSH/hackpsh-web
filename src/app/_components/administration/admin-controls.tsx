"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { siteConfig } from "@/app/_config/site";

export default function AdminControls() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-3 gap-y-4">
      <Card>
        <CardContent className="space-y-4 p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Users
          </h1>
          <Separator className="my-4" />

          <div className="flex flex-row items-center justify-between space-x-4">
            <p className="text-sm text-muted-foreground">
              View and modify user accounts.
            </p>
            <Button
              variant="outline"
              className="w-36 text-nowrap"
              onClick={() => router.push(siteConfig.paths.users)}
            >
              Manage Users
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Teams
          </h1>
          <Separator className="my-4" />

          <div className="flex flex-row items-center justify-between space-x-4">
            <p className="text-sm text-muted-foreground">
              View and modify teams.
            </p>
            <Button
              variant="outline"
              className="w-36 text-nowrap"
              onClick={() => router.push(siteConfig.paths.teams)}
            >
              Manage Teams
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Nuke Everything
          </h1>
          <Separator className="my-4" />

          <div className="flex flex-row items-center justify-between space-x-4">
            <p className="text-sm text-muted-foreground">
              Delete all users, teams, and announcements.
            </p>
            <Button variant="destructive" className="w-36 text-nowrap">
              Reset Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
