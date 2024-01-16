"use client";

import {
  CreateTeamFormSchema,
  type TCreateTeamForm,
} from "@/app/_lib/zod-schemas/forms/onboarding/team";
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
import { siteConfig } from "@/app/_config/site";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";

export default function CreateTeamForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const form = useForm<TCreateTeamForm>({
    resolver: zodResolver(CreateTeamFormSchema),
  });

  const createTeamMutation = trpc.team.create_team.useMutation({
    onSuccess: () => {
      router.refresh();
      router.push(siteConfig.paths.onboarding, { scroll: false });
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
        className="space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="team_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input
                  className="border-muted-foreground"
                  placeholder="Enter Team Name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                You will not be able to join other teams.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Next
        </Button>
      </form>
    </Form>
  );
}
