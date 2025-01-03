"use client";

import Section from "@/app/_components/page-assets/section";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Icons } from "@/app/_components/ui/icons";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { cn } from "@/app/_lib/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "@/app/_trpc/react";
import { toast } from "@/app/_components/ui/use-toast";
import {
  type TCreateContactPost,
  CreateContactPostSchema,
} from "@/app/_lib/zod-schemas/forms/contact";

type CreateContactFormProps = React.HTMLAttributes<HTMLDivElement>;

function ContactForm({ className, ...props }: CreateContactFormProps) {
  const form = useForm<TCreateContactPost>({
    resolver: zodResolver(CreateContactPostSchema),
  });

  const contactMutation = trpc.contact.create_contact_post.useMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Contact form sent!",
        duration: 4000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops, something went wrong!",
        description:
          "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
        duration: 6000,
      });
    },
  });

  async function onSubmit(values: TCreateContactPost) {
    try {
      await contactMutation.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        content: values.content,
      });
      form.reset();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Section className="bg-background-variant">
        <div
          className={cn("grid-gap-6 mx-auto max-w-3xl", className)}
          {...props}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-x-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
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
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type here..."
                        className="h-36 resize-none"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="ml-auto flex"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </Section>
    </>
  );
}

function ContactHero() {
  return (
    <section className="border-b-[1px] bg-background text-foreground">
      <div className="container">
        <div className="flex justify-center py-6 md:py-12">
          <div className="flex flex-col justify-center space-y-6 md:space-y-4">
            <h2 className="text-6xl font-bold">Contact Us</h2>
            <p className="max-w-3xl">
              Do you have any questions regarding our event? Are you interested
              in working together? This is the right place to reach out for
              general questions and interests in partnership for future events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
