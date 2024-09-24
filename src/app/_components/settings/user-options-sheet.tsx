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
import { getUser } from "@/shared/supabase/auth";
import { toast } from "../ui/use-toast";
import { Icons } from "../ui/icons";
import {
  type TUpdateUserRoleFormSchema,
  UpdateUserRoleFormSchema,
} from "@/app/_lib/settings";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type TUserRole } from "@/db/drizzle/startup_seed";
import { useRouter } from "next/navigation";

export default function UserOptionsSheet({
  userDisplayName,
  userUUID,
  userRole,
}: {
  userDisplayName: string;
  userUUID: string;
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
        title: "Event Details Updated!",
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

  const supabase = createClientComponentClient();

  async function onSubmit(values: TUpdateUserRoleFormSchema) {
    try {
      const user = await getUser(supabase);

      await updateUserRoleMutation.mutateAsync({
        user_uuid: user.id,
        target_uuid: userUUID,
        target_role: values.user_role,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Pencil className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage Access for {userDisplayName}</SheetTitle>
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
                      defaultValue={userRole}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="participant">
                            participant
                          </SelectItem>
                          <SelectItem value="officer">officer</SelectItem>
                          <SelectItem value="admin">admin</SelectItem>
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
      </SheetContent>
    </Sheet>
  );
}
