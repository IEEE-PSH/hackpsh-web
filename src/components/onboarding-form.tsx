"use client";

import { cn } from "@/lib/client-utils";
import { OnboardingFormSchema, TOnboardingForm } from "@/lib/zod-schemas/onboarding";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface OnboardingFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function OnboardingForm({ className, ...props }: OnboardingFormProps) {
  // Form Definition
  const form = useForm<TOnboardingForm>({
    resolver: zodResolver(OnboardingFormSchema)
  });

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
                  <Input className="border-muted-foreground" id="username" placeholder="CoolHacker123" {...field} value={field.value ?? ''} />
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
                  <Input className="border-muted-foreground" id="username" placeholder="CoolHacker123" {...field} value={field.value ?? ''} />
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