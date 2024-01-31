import createFeedbackReportProcedure from "../procedures/public/feedback/createFeedbackReportProcedure";
import { createTRPCRouter } from "../trpc";

export const feedbackRouter = createTRPCRouter({
  create_feedback_report: createFeedbackReportProcedure
});
