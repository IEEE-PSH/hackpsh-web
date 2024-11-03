"use client";

import { cn } from "@/app/_lib/client-utils";
import {
  PersonalDetailsFormSchema,
  type TPersonalDetailsForm,
} from "@/app/_lib/zod-schemas/forms/onboarding/personal-details";
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
};

//this is team settings form for team members that are not the team leader
export default function TeamSettingsFormDefault({
  teamData,
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

  return (
    <Form {...form}>
      <form id="teamSettingsForm" className="flex flex-col">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Team Details
        </h1>
        <Separator className="my-4" />
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2">
          <FormField
            disabled
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
                  You must be team leader to change the team name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled
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
                  You must be team leader to change the team join code.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
