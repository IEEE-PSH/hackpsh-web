"use client";
import { getUser } from "@/app/_lib/supabase/client";
import { TCreateAnnouncementForm, CreateAnnouncementFormSchema } from "@/app/_lib/zod-schemas/forms/announcements";
import { trpc } from "@/app/_trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm, Form } from "react-hook-form";
import { Button } from "../ui/button";
import { FormLabel, FormField, FormItem, FormControl, FormMessage, FormDescription } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

export function CreateAnnouncementPostForm() {
  const form = useForm<TCreateAnnouncementForm>({
    resolver: zodResolver(CreateAnnouncementFormSchema),
  });

  const announcementMutation =
    trpc.announcements.create_announcement_post.useMutation({
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Announcement Created!",
          description: "Visit the announcements page to see your message.",
          duration: 4000,
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Oops, Something Went Wrong!",
          description:
            "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
          duration: 6000,
        });
      },
    });

  async function onSubmit(values: TCreateAnnouncementForm) {
    try {
      const supabase = createClientComponentClient();
      const user = await getUser(supabase);

      await announcementMutation.mutateAsync({
        author_uuid: user.id,
        title: values.title,
        content: values.message,
      });
      form.reset();
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormLabel>Create an Announcement</FormLabel>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Type a message here that you want to send to everyone!"
                    className="resize-none h-36"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>This is the content of your announcement</FormDescription>
          <Button type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
