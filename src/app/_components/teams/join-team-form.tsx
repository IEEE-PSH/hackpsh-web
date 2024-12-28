"use client";

import {
  JoinTeamFormSchema,
  type TJoinTeamForm,
} from "@/app/_lib/zod-schemas/forms/team";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/ui/icons";
import { trpc } from "@/app/_trpc/react";
import { toast } from "../ui/use-toast";
import { getUser } from "@/shared/supabase/auth";
import { type Dispatch, type SetStateAction } from "react";
import { createClient } from "@/app/_lib/supabase/client";

export default function JoinTeamForm({
  teamName,
  setDialogOpen,
  getTeams,
}: {
  teamName: string;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  getTeams: () => void;
}) {
  const supabase = createClient();

  const form = useForm<TJoinTeamForm>({
    resolver: zodResolver(JoinTeamFormSchema),
  });

  const joinTeamMutation = trpc.team.join_team.useMutation({
    onSuccess: () => {
      getTeams();
      setDialogOpen(false);
      toast({
        variant: "default",
        description: `Joined team ${teamName}.`,
        duration: 3000,
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

  async function onSubmit(values: TJoinTeamForm) {
    try {
      const user = await getUser(supabase);

      await joinTeamMutation.mutateAsync({
        user_uuid: user.id,
        team_name: teamName,
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
        id="joinTeamForm"
        className="flex flex-col space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="team_join_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team join code</FormLabel>
              <FormControl>
                <Input
                  className="border-muted-foreground"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                Enter the team join code to join the team.
              </FormDescription>
              <FormDescription>
                NOTE: You will leave your current team. Leaving a team as leader
                will promote another member instead. Leaving a team as the only
                member will delete the team.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="ml-auto"
        >
          {form.formState.isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Confirm</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
