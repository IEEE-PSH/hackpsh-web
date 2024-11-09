"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { trpc } from "@/app/_trpc/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { toast } from "@/app/_components/ui/use-toast";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { type TUserTeamInfo } from "@/server/dao/user";
import {
  CreateTeamFormSchema,
  type TCreateTeamForm,
} from "@/app/_lib/zod-schemas/forms/team";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

type TeamSettingsFormProps = {
  teamData: TUserTeamInfo;
  isTeamLeader: boolean;
};

export default function TeamSettingsForm({
  teamData,
  isTeamLeader,
}: TeamSettingsFormProps) {
  const supabase = createClientComponentClient();

  // Form Definition
  const form = useForm<TCreateTeamForm>({
    resolver: zodResolver(CreateTeamFormSchema),
    defaultValues: {
      team_name: teamData.team_name,
      team_join_code: teamData.team_join_code,
    },
  });

  const router = useRouter();

  const updateTeamSettingsMutation = trpc.team.update_team_details.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        variant: "success",
        title: "Settings saved.",
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

  async function onSubmit(values: TCreateTeamForm) {
    try {
      const user = await getUser(supabase);

      await updateTeamSettingsMutation.mutateAsync({
        user_uuid: user.id,
        team_name: values.team_name,
        team_join_code: values.team_join_code,
      });
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }
  return (
    <Form {...form}>
      <form
        id="teamSettingsForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Team Details
        </h1>
        <Separator className="my-4" />
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2">
          <FormField
            disabled={!isTeamLeader}
            control={form.control}
            name="team_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input
                    className="border-muted-foreground"
                    placeholder="Peter"
                    {...field}
                    value={field.value ?? teamData.team_name}
                  />
                </FormControl>
                <FormDescription>
                  {isTeamLeader ? (
                    <span>
                      Provide an appropriate team name, otherwise the team will
                      be deleted.
                    </span>
                  ) : (
                    <span>
                      You must be team leader to change the team name.
                    </span>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={!isTeamLeader}
            control={form.control}
            name="team_join_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team join code</FormLabel>
                <FormControl>
                  <Input
                    className="border-muted-foreground"
                    placeholder="Parker"
                    {...field}
                    value={field.value ?? teamData.team_join_code}
                  />
                </FormControl>
                <FormDescription>
                  {isTeamLeader ? (
                    <span>
                      Users can join your team with the provided code.
                    </span>
                  ) : (
                    <span>
                      You must be team leader to change the team join code.
                    </span>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isTeamLeader && (
          <Button
            type="submit"
            className="ml-auto mt-4 w-full sm:w-fit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        )}
      </form>
    </Form>
  );
}
