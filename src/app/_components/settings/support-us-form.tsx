"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SupportUsFormSchema,
  type TSupportUsForm,
} from "@/app/_lib/zod-schemas/forms/onboarding/support-us";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { trpc } from "@/app/_trpc/react";
import { toast } from "../ui/use-toast";
import { getUser } from "@/shared/supabase/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { cn } from "@/app/_lib/client-utils";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

type SupportUsFormProps = {
  userSupportAdministrative: boolean;
  userSupportTechnical: boolean;
};

export default function SupportUsForm({
  userSupportAdministrative,
  userSupportTechnical,
}: SupportUsFormProps) {
  const supabase = createClientComponentClient();

  const form = useForm<TSupportUsForm>({
    resolver: zodResolver(SupportUsFormSchema),
    defaultValues: {
      user_support_administrative: userSupportAdministrative,
      user_support_technical: userSupportTechnical,
    },
  });

  const updateSupportUsMutation = trpc.user.update_support_us.useMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Support Preferences Saved!",
        duration: 4000,
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

  async function onSubmit(values: TSupportUsForm) {
    try {
      const user = await getUser(supabase);

      await updateSupportUsMutation.mutateAsync({
        user_uuid: user.id,
        user_support_administrative: values.user_support_administrative,
        user_support_technical: values.user_support_technical,
      });
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }
  return (
    <div className={cn("grid-gap-6")}>
      <Form {...form}>
        <form
          id="onboardingPersonalDetailsForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="user_support_administrative"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Administrative</FormLabel>
                    <FormDescription>
                      Help us organize our social events, fundraising, and
                      better our social media!
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user_support_technical"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Technical</FormLabel>
                    <FormDescription>
                      Help us innovate and develop hardware and software to
                      further our unique experiences! {userSupportTechnical}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
