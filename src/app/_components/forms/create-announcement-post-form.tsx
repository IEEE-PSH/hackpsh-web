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
  FormLabel,
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
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import styles from "@/app/markdown.module.css";
import CustomEditor from "../editor/custom-editor";

type CreateAnouncementFormProps = React.HTMLAttributes<HTMLDivElement>;

export function CreateAnnouncementPostForm({
  className,
  ...props
}: CreateAnouncementFormProps) {
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
        content: values.content,
      });
      form.reset();
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="space-y-6">
      <Card className={cn("grid-gap-6 pt-6", className)} {...props}>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {" "}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Announcement Title"
                        {...field}
                        value={field.value ?? ""}
                        onChangeCapture={(e) => setTitle(e.currentTarget.value)}
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
                      <CustomEditor
                        setContent={setContent}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>{title == "" ? "Title" : title}</CardTitle>
          <CardDescription>
            <span className="font-semibold">Created By: </span>
            User
            {" | "}
            <span className="font-semibold">Posted On: </span>
            January 1, 2025, 5:30 PM
          </CardDescription>
        </CardHeader>
        <CardContent>
          {content == "" ? (
            "Content"
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
