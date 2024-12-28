"use client";

import {
  type TCreateAnnouncementForm,
  CreateAnnouncementFormSchema,
} from "@/app/_lib/zod-schemas/forms/announcements";
import { trpc } from "@/app/_trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";
import { useRouter } from "next/navigation";
import { getUser } from "@/shared/supabase/auth";
import { type AnnouncementPost } from "@/server/dao/announcements";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/client";

type CreateAnouncementFormProps = React.HTMLAttributes<HTMLDivElement>;
type EditAnnouncementFormProps = { postData: AnnouncementPost }; //fix type

export default function EditAnnouncementPostForm({
  postData,
  className,
  ...props
}: CreateAnouncementFormProps & EditAnnouncementFormProps) {
  const { announcement_title, announcement_content } = postData;

  const form = useForm<TCreateAnnouncementForm>({
    resolver: zodResolver(CreateAnnouncementFormSchema),
    defaultValues: {
      title: announcement_title,
      content: announcement_content,
    },
  });

  const router = useRouter();

  const announcementMutation =
    trpc.announcements.update_announcement_post.useMutation({
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Announcement Updated!",
          description: "You have successfully updated an announcement.",
          duration: 4000,
        });
        form.reset({
          title: "",
          content: "",
        });
        router.back();
        router.refresh();
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

  async function onSubmit(values: TCreateAnnouncementForm) {
    try {
      const supabase = createClient();
      const user = await getUser(supabase);

      await announcementMutation.mutateAsync({
        user_uuid: user.id,
        announcement_id: postData.announcement_id,
        title: values.title,
        content: values.content,
      });
      form.reset();
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <div className={cn("grid-gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Title"
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
                <FormControl>
                  <Textarea
                    placeholder="Body"
                    className="h-36 resize-none"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-x-4 sm:flex sm:space-x-4">
            <Button
              type="button"
              variant="navigation"
              className="ml-auto w-full justify-end px-8 sm:w-auto"
              disabled={form.formState.isSubmitting}
              asChild
            >
              <Link
                href="#"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Link>
            </Button>
            <Button
              type="submit"
              className="ml-auto w-full px-8 sm:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
