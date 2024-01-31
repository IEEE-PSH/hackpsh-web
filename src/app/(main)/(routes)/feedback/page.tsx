"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "@/app/_trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { Form, FormLabel, FormField, FormItem, FormControl, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { toast } from "@/app/_components/ui/use-toast";
import { Icons } from "@/app/_components/ui/icons";
import { cn } from "@/app/_lib/client-utils";

export default function FeedbackPage() {
  return (
    <>
      <div className="container relative flex-col items-center justify-center space-y-6">
        <h1 className="mt-10 text-3xl font-bold">Feedback</h1>
        <CreateFeedbackReportForm />
      </div>
    </>
  );
}

const CreateFeedbackReportFormSchema = z.object({
  feedback_name: z.string().min(1, "The name of this report cannot be empty."),
  feedback_report: z.string().min(1, "The report's contents cannot be empty."),
})

type TCreateFeedbackForm = z.infer<typeof CreateFeedbackReportFormSchema>;
type CreateAnnouncementFormProps = React.HTMLAttributes<HTMLDivElement>;

function CreateFeedbackReportForm({className, ...props }: CreateAnnouncementFormProps) {
  const form = useForm<TCreateFeedbackForm>({
    resolver: zodResolver(CreateFeedbackReportFormSchema)
  })

  const feedbackMutation = trpc.feedback.create_feedback_report.useMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Feedback Report Created!",
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

  async function onSubmit(values: TCreateFeedbackForm) {
    try {
      await feedbackMutation.mutateAsync({
        feedback_name: values.feedback_name,
        feedback_report: values.feedback_report
      });
      form.reset();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={cn("grid-gap-6", className)} {...props}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="feedback_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Report Name" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback_report"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Report</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Give your feedback here!"
                      className="resize-none h-36"
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
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}