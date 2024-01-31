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

// Goal: Build out the Create FeedbackReportForm which has a input for name and
// a textbox for the feedback report.
//
// Hint: Look closesly at `src/app/(main)/(routes)/announcements/create-post/page.tsx`
//
// Goal A: Create the Form Schema (Client-side Form Validation)
// This is a zod object defining the shape of data that your form will accept
// - feedback_name string [min 1 char] ("The name of this report cannot be empty")
// - feedback_report string [min 1 char] ("The report's contents may not be empty")
//
const CreateFeedbackReportFormSchema = z.object({

})

type TCreateFeedbackForm = z.infer<typeof CreateFeedbackReportFormSchema>;
type CreateAnnouncementFormProps = React.HTMLAttributes<HTMLDivElement>;

// Goal B: Create a Form Object and define what shape of data it can accept, and its own validation rules
// Goal C: Utilize trpc to invoke the mutation and handle the success and error callback from data submission
// Goal D: Create an onSubmit handler to simply invoke the mutation and reset the form's values within a try-catch
// Goal E: Utilize shadCN to build out the HTML to display an input field and textarea
function CreateFeedbackReportForm({ className, ...props }: CreateAnnouncementFormProps) {
  const form = useForm<TCreateFeedbackForm>({

  })

  const feedbackMutation = null;

  async function onSubmit(values: TCreateFeedbackForm) { }

  return (
    <>
      <div className={cn("grid-gap-6", className)} {...props}>
      </div>
    </>
  );
}