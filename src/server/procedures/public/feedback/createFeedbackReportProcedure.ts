import { createFeedbackReport } from "@/server/dao/feedback"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"

const CreateFeedbackReportSchema = z.object({
  feedback_name: z.string().min(1, "The name of this report cannot be empty."),
  feedback_report: z.string().min(1, "The report's contents cannot be empty."),
})

export default publicProcedure
  .input(CreateFeedbackReportSchema)
  .mutation(async ({ ctx, input }) => {
    await createFeedbackReport(
      ctx.db,
      input.feedback_name,
      input.feedback_report
    );
  });