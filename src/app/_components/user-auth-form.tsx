"use client";

import { cn } from "@/app/_lib/client-utils";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Icons } from "@/app/_components/ui/icons";
import { toast } from "@/app/_components/ui/use-toast";
import {
  type TUserAuthForm,
  UserAuthFormSchema,
} from "@/app/_lib/zod-schemas/user-auth";
import { trpc } from "@/app/_trpc/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  async function handleSignInWithGoogle() {
    const baseURL = (typeof window !== "undefined") ? window.location.origin : '';

    const supabase = createClientComponentClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseURL}/api/auth/callback`
      }
    })
  }

  // Form Definition
  const form = useForm<TUserAuthForm>({
    resolver: zodResolver(UserAuthFormSchema)
  })

  const emailLoginMutation = trpc.auth.email_login.useMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Login Magic Link Sent!",
        description: "Check your email for a secure link to effortlessly log in. Time-sensitive for your security.",
        duration: 2000
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops, Something Went Wrong!",
        description: "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
        duration: 2000
      })
    }
  });

  async function onSubmit(values: TUserAuthForm) {
    try {
      await emailLoginMutation.mutateAsync({ email: values.email });
      form.reset();
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form
          id="userAuthForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border-muted-foreground"
                    id="email"
                    placeholder="yourname@example.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Sign In with Email
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" onClick={handleSignInWithGoogle} className="w-full border-muted-foreground" type="button" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Icons.google className="w-4 h-4 mr-2" />
            )}{" "}
            Google
          </Button>
        </form>
      </Form>
    </div >
  )
}
