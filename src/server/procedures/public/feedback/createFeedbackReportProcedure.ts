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

// Congratualations, you've created the essence of a public API Endpoint to mutate data.
// (Usually having a public API endpoint to mutate data is never a good thing, but this is just an interview.)
//
// In the trpc ecosystem, you group together procedures as part of a router to represent a single entity / service.
// We are classifying this feedback route / component as a single entity, and as such we need to create a feedback
// router and attach this procedure to our feedback router. Then we'll need to attach it to the main router
// which handles the responsibility of taking all incoming requests to our API Endpoint and "route" them
// to the proper / correct procedure.
//
// Goal: Create a feedback router and attach it to the main router
// To begin, go to `src/server/routers/feedback.ts`
