"use client"

import { cn, getBaseURL } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Icons } from "./icons";
import { toast } from "@/components/ui/use-toast";
import { TUserAuthForm, UserAuthFormSchema } from "@/lib/zod-schemas/user-auth";
import { trpc } from "@/app/_trpc/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  async function handleSignInWithGoogle() {
    const supabase = createClientComponentClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${getBaseURL()}/api/auth/callback`
      }
    })
  }

  // Form Definition
  const form = useForm<TUserAuthForm>({
    resolver: zodResolver(UserAuthFormSchema)
  })

  const emailLoginMutation = trpc.auth.email_login.useMutation({
    onSuccess: async () => {
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
        description: "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly",
        duration: 2000
      })
    }
  });

  async function onSubmit(values: TUserAuthForm) {
    try {
      await emailLoginMutation.mutateAsync({ email: values.email })
      form.reset();
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form id="userAuthForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="border-muted-foreground" id="email" placeholder="yourname@example.com" {...field} value={field.value ?? ''} />
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

          <Button variant="outline" onClick={handleSignInWithGoogle} className="w-full" type="button" disabled={form.formState.isSubmitting}>
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