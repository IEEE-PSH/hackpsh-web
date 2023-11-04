"use client";

import React from "react";
import { cn } from "@/app/_lib/client-utils";
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
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/ui/icons";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";

export default function CreateTeamForm() {
  const form = useForm<TCreateTeamForm>({
    resolver: zodResolver(CreateTeamFormSchema),
  });

  function onSubmit(values: TCreateTeamForm) {
    console.log(values.team_name);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                />
              </FormControl>
              <FormDescription>
                You will not be able to join other teams.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <Link
            className={cn(`w-full ${buttonVariants({ variant: "default" })}`)}
            href={siteConfig.paths.onboarding_personal_details}
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