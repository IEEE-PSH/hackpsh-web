"use client";

import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { trpc } from "@/app/_trpc/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { Icons } from "../ui/icons";
import {
  type TUpdateUserRoleFormSchema,
  UpdateUserRoleFormSchema,
} from "@/app/_lib/settings";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import { useRouter } from "next/navigation";
import DeleteUserButton from "./delete-user-button";
import { useState } from "react";

export default function UserOptionsSheet({
  userDisplayName,
  userUUID,
  targetUUID,
  userRole,
}: {
  userDisplayName: string;
  userUUID: string;
  targetUUID: string;
  userRole: string;
}) {
  const form = useForm<TUpdateUserRoleFormSchema>({
    resolver: zodResolver(UpdateUserRoleFormSchema),
    defaultValues: {
      user_role: userRole as TUserRole,
    },
  });

  const router = useRouter();

  const updateUserRoleMutation = trpc.user.update_user_role.useMutation({
    onSuccess: () => {
      router.refresh();

      toast({
        variant: "success",
        title: "User Role Updated!",
        duration: 4000,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
        duration: 6000,
      });
    },
  });

  async function onSubmit(values: TUpdateUserRoleFormSchema) {
    try {
      await updateUserRoleMutation.mutateAsync({
        user_uuid: userUUID,
        target_uuid: targetUUID,
        target_role: values.user_role,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const [sheetOpen, setSheetOpen] = useState(false);
  //active state to determine whether to render form, limiting browser memory usage
  const [active, setActive] = useState(false);

  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={() => {
        setSheetOpen(!sheetOpen);
        setActive(!active);
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => setActive(!active)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage User {userDisplayName}</SheetTitle>
        </SheetHeader>
        {active ? (
          <Form {...form}>
            <form
              id="manageAccessForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 flex flex-col space-y-6"
            >
              <FormField
                control={form.control}
                name="user_role"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center">
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={userRole}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="participant">
                              Participant
                            </SelectItem>
                            <SelectItem value="officer">Officer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto flex space-x-6">
                <DeleteUserButton
                  userUUID={userUUID}
                  targetUUID={targetUUID}
                  sheetSetOpen={setSheetOpen}
                />
                <SheetClose asChild>
                  <Button
                    type="submit"
                    className="ml-auto w-32"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save changes
                  </Button>
                </SheetClose>
              </div>
            </form>
          </Form>
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  );
}
