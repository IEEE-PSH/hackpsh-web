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

export default function CreateTeamForm() {
  const form = useForm<TCreateTeamForm>({
    resolver: zodResolver(CreateTeamFormSchema),
  });

  function onSubmit(values: TCreateTeamForm) {
    console.log(values.team_name);
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
          )}
          Next
        </Button>
      </form>
    </Form>
  );
}