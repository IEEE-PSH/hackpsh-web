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
} from "../ui/form";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";
import { trpc } from "@/app/_trpc/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { toast } from "../ui/use-toast";

type OnboardingPersonalDetailsFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function OnboardingPersonalDetailsForm({
  className,
  ...props
}: OnboardingPersonalDetailsFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Form Definition
  const form = useForm<TPersonalDetailsForm>({
    resolver: zodResolver(PersonalDetailsFormSchema),
  });

  const updatePersonalDetailsMutation =
    trpc.user.update_personal_details.useMutation({
      onSuccess: () => {
        router.push(siteConfig.paths.onboarding, {
          scroll: false,
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

  async function onSubmit(values: TPersonalDetailsForm) {
    try {
      const user = await getUser(supabase);

      await updatePersonalDetailsMutation.mutateAsync({
        user_uuid: user.id,
        user_first_name: values.user_first_name,
        user_last_name: values.user_last_name,
        user_display_name: values.user_display_name,
      });
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }

  return (
    <div className={cn("grid-gap-6", className)} {...props}>
      <Form {...form}>
        <form
          id="onboardingPersonalDetailsForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="user_first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-muted-foreground"
                      placeholder="John"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-muted-foreground"
                      placeholder="Wick"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="user_display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    className="border-muted-foreground"
                    placeholder="CoolHacker123"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name. Please be appropriate.
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
    </div>
  );
}
