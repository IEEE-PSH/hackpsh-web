"use client";

import { cn } from "@/app/_lib/client-utils";
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
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/ui/icons";
import Link from "next/link";
import { JoinTeamFormSchema, type TJoinTeamForm } from "@/app/_lib/zod-schemas/forms/onboarding/team";

export default function JoinTeamForm() {
  const form = useForm<TJoinTeamForm>({
    resolver: zodResolver(JoinTeamFormSchema),
  });

  function onSubmit(values: TJoinTeamForm) {
    console.log(values.team_code);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="team_code"
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
        <div className="grid grid-cols-2 gap-4">
          <Link
            className={cn(`w-full ${buttonVariants({ variant: "default" })}`)}
            href="/onboarding/support-us"
          >
            Back
          </Link>
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
        </div>
      </form>
    </Form>
  );
}