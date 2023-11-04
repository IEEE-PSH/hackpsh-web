"use client";

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
import { JoinTeamFormSchema, type TJoinTeamForm } from "@/app/_lib/zod-schemas/forms/onboarding/team";
import { trpc } from "@/app/_trpc/react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";
import { getUser } from "@/shared/supabase/auth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function JoinTeamForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const form = useForm<TJoinTeamForm>({
    resolver: zodResolver(JoinTeamFormSchema),
  });

  const joinTeamMutation = trpc.team.join_team.useMutation({
    onSuccess: () => {
      router.push(siteConfig.paths.onboarding, { scroll: false });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
        duration: 6000
      })
    }
  })

  async function onSubmit(values: TJoinTeamForm) {
    try {
      const user = await getUser(supabase);
      await joinTeamMutation.mutateAsync({
        team_join_code: values.team_join_code,
        user_uuid: user.id
      })
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="team_join_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Code</FormLabel>
              <FormControl>
                <Input
                  className="border-muted-foreground"
                  id="username"
                  placeholder="Enter Team Code"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                You will not be able to leave and join other teams.
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
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          )}
          Next
        </Button>
      </form>
    </Form>
  );
}