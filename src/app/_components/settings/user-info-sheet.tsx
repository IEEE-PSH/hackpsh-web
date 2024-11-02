"use client";

import { trpc } from "@/app/_trpc/react";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { type Dispatch, type SetStateAction } from "react";
import { Skeleton } from "../ui/skeleton";

type UserInfoSheetProps = {
  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  targetUserUUID: string;
};

export default function UserInfoSheet({
  sheetOpen,
  setSheetOpen,
  targetUserUUID,
}: UserInfoSheetProps) {
  const { data: userData, isSuccess } = trpc.user.get_user_info.useQuery({
    user_uuid: targetUserUUID,
  });

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent>
        <SheetHeader className="text-left text-xl">
          {isSuccess ? (
            <h1>User {userData.user_display_name}</h1>
          ) : (
            <Skeleton className="my-1 h-5 w-52" />
          )}
        </SheetHeader>

        {isSuccess ? (
          <div className="grid grid-cols-5">
            <p className="col-span-1">Role</p>
            <p className="col-span-4 capitalize text-muted-foreground">
              {userData.user_role}
            </p>
            <p className="col-span-1">Name</p>
            <p className="col-span-4 capitalize text-muted-foreground">
              {userData.user_first_name} {userData.user_last_name}
            </p>
            <p className="col-span-1">Email</p>
            <p className="col-span-4 text-muted-foreground">
              {userData.user_email_address}
            </p>
            <p className="col-span-1">Major</p>
            <p className="col-span-4 capitalize text-muted-foreground">
              {userData.user_major?.replaceAll("_", " ").toLocaleLowerCase() ??
                ""}
            </p>
            <p className="col-span-1">Year</p>
            <p className="col-span-4 capitalize text-muted-foreground">
              {userData.user_school_year
                ?.replaceAll("_", " ")
                .toLocaleLowerCase() ?? ""}
            </p>
          </div>
        ) : (
          <>
            <Skeleton className="my-1 h-4" />
            <Skeleton className="my-1 h-4" />
            <Skeleton className="my-1 h-4" />
            <Skeleton className="my-1 h-4" />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
