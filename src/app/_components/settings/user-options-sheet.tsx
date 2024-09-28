"use client";

import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
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
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { type TUserInfo } from "@/server/dao/user";
import { Skeleton } from "../ui/skeleton";

export default function UserOptionsSheet({
  sheetOpen,
  setSheetOpen,
  targetUserUUID,
  userData,
}: {
  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  targetUserUUID: string;
  userData: TUserInfo;
}) {
  const { data: targetUserData, isSuccess } = trpc.user.get_user_info.useQuery({
    user_uuid: targetUserUUID,
  });
  const form = useForm<TUpdateUserRoleFormSchema>({
    resolver: zodResolver(UpdateUserRoleFormSchema),
    defaultValues: {
      user_role: targetUserData?.user_role as TUserRole,
    },
  });

  const utils = trpc.useContext();

  const updateUserRoleMutation = trpc.user.update_user_role.useMutation({
    onSuccess: () => {
      setSheetOpen(false);
      void utils.user.get_users.invalidate();
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
        user_uuid: userData?.user_uuid as unknown as string,
        target_uuid: targetUserUUID,
        target_role: values.user_role,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        user_role: targetUserData?.user_role as unknown as TUserRole,
      });
    }
  }, [isSuccess, targetUserData, form]);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent>
        {isSuccess ? (
          <>
            <SheetHeader>
              <h1>Edit User {targetUserData?.user_display_name}</h1>
            </SheetHeader>
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
                          defaultValue={targetUserData.user_role}
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
              </form>
            </Form>
          </>
        ) : (
          <div>
            <SheetHeader className="grid grid-cols-3 text-xl">
              <Skeleton className="col-span-2 my-1 h-5" />
            </SheetHeader>
            <div className="mt-6 flex flex-col">
              <Skeleton className="h-10" />
              <Skeleton className="ml-auto mt-6 h-10 w-32" />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
