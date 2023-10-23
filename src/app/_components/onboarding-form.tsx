"use client";

import { cn } from "@/app/_lib/client-utils";
import {
  OnboardingFormSchema,
  type TOnboardingForm,
} from "@/app/_lib/zod-schemas/onboarding";
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

type OnboardingFormProps = React.HTMLAttributes<HTMLDivElement>;

export function OnboardingForm({ className, ...props }: OnboardingFormProps) {
  // Form Definition
  const form = useForm<TOnboardingForm>({
    resolver: zodResolver(OnboardingFormSchema)
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  async function onSubmit(values: TOnboardingForm) {
    console.log(values.user_display_name);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form id="onboardingForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="user_display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    className="border-muted-foreground"
                    id="username"
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
          <FormField
            control={form.control}
            name="user_display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    className="border-muted-foreground"
                    id="username"
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
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
