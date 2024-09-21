"use client";

import { getUser } from "@/shared/supabase/auth";
import {
  type TCreateAnnouncementForm,
  CreateAnnouncementFormSchema,
} from "@/app/_lib/zod-schemas/forms/announcements";
import { trpc } from "@/app/_trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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

type CreateAnouncementFormProps = React.HTMLAttributes<HTMLDivElement>;
type EditAnnouncementFormProps = { postData: any }; //CHANGE

export function EditAnnouncementPostForm({
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
    trpc.announcements.create_announcement_post.useMutation({
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Announcement Created!",
          description: "Visit the announcements page to see your message.",
          duration: 4000,
        });
        router.replace("/announcements");
        router.refresh();
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
          <Button
            type="submit"
            className="ml-auto px-8"
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
