"use client";

import {
  CreateTeamFormSchema,
  type TCreateTeamForm,
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

export default function CreateTeamForm({
  setDialogOpen,
  getTeams,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  getTeams: () => void;
}) {
  const supabase = createClient();

  const form = useForm<TCreateTeamForm>({
    resolver: zodResolver(CreateTeamFormSchema),
  });

  const createTeamMutation = trpc.team.create_team.useMutation({
    onSuccess: () => {
      getTeams();
      setDialogOpen(false);
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

      await createTeamMutation.mutateAsync({
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
        id="createTeamForm"
        className="flex flex-col space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="team_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input
                  className="border-muted-foreground"
                  placeholder="Avengers"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                Provide an appropriate team name, otherwise the team will be
                deleted.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team_join_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team join code (optional)</FormLabel>
              <FormControl>
                <Input
                  className="border-muted-foreground"
                  placeholder="assemble"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                Users can join your team with the provided code.
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
            <span>Create</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
