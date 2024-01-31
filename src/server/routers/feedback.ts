import createFeedbackReportProcedure from "../procedures/public/feedback/createFeedbackReportProcedure";
import { createTRPCRouter } from "../trpc";

// Goal A: Create a feedback router in order to group together procedures
// Goal B: Attach the feedback router to the main router located at `src/server/routers/root.ts`
//
// Hint: Look at `src/server/routers/announcements.ts`
//
// create_feedback_report should be the key name of the procedure within the router
export const feedbackRouter = createTRPCRouter({

});

