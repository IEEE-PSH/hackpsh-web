"use client";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { Icons } from "../ui/icons";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import {
  UpdateTeamFormSchema,
  type TUpdateTeamFormSchema,
} from "@/app/_lib/team";
import { trpc } from "@/app/_trpc/react";
import { type TUserInfo } from "@/server/dao/user";
import { Skeleton } from "../ui/skeleton";

type TeamOptionsSheet = {
  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  teamUUID: string;
  userData: TUserInfo;
};

export default function TeamOptionsSheet({
  sheetOpen,
  setSheetOpen,
  teamUUID,
  userData,
}: TeamOptionsSheet) {
  const { data: teamData, isSuccess } = trpc.team.get_team_info.useQuery({
    team_uuid: teamUUID,
  });

  const form = useForm<TUpdateTeamFormSchema>({
    resolver: zodResolver(UpdateTeamFormSchema),
    defaultValues: {
      team_points_additive: teamData?.team_points_additive ?? 0,
    },
  });

  const router = useRouter();
  // const utils = trpc.useContext();

  const updateTeamMutation = trpc.team.update_team.useMutation({
    onSuccess: () => {
      setSheetOpen(false);
      router.refresh();
      // void utils.user.get_users.invalidate();
      toast({
        variant: "success",
        title: "Team Points Updated!",
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

  async function onSubmit(values: TUpdateTeamFormSchema) {
    try {
      await updateTeamMutation.mutateAsync({
        user_uuid: userData!.user_uuid,
        team_uuid: teamUUID,
        team_points_additive: values.team_points_additive,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        team_points_additive: teamData?.team_points_additive ?? 0, // Reset to new data
      });
    }
  }, [isSuccess, teamData, form]);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent>
        <SheetHeader className="text-xl">
          {isSuccess ? (
            <h1>Edit Team {teamData?.team_name}</h1>
          ) : (
            <Skeleton className="my-1 h-5 w-52" />
          )}
        </SheetHeader>
        <Form {...form}>
          <form
            id="manageAccessForm"
            className="mt-6 flex flex-col space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="team_points_additive"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-2 items-center">
                    <FormLabel className="col-span-1">
                      Points Additive
                    </FormLabel>
                    {isSuccess ? (
                      <Input
                        className="col-span-1 [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0"
                        type="number"
                        {...field}
                        value={field.value}
                        defaultValue={teamData?.team_points_additive}
                      />
                    ) : (
                      <Skeleton className="col-span-1 h-10" />
                    )}
                  </div>
                  <FormDescription>
                    Add more points on top of Challenges scores.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="ml-auto flex space-x-6">
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
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
