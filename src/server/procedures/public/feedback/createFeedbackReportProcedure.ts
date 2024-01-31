import { createFeedbackReport } from "@/server/dao/feedback"
import { publicProcedure } from "@/server/trpc"
import { z } from "zod"
//
// Goal: Build a public mutation procedure to accept
// feedback_name and feedback_report. Ensure you santize the input
// given through a zod object.
//
//
// Goal A: Create a Zod Input Schema in order to validate the input
// and tell the client the shape of data that they are allowed to
// submit into our API Endpoint.
//
// Hint: Look at `src/server/zod-schemas/announcements.ts`
// Fields:
// - feedback_name: string [min 1 char] "The name of this report cannot be empty."
// - feedback_report string [min 1 char] "The report's contents cannot be empty."
//
const CreateFeedbackReportSchema = z.object({

})

// Goal B: Create a procedure that sanitizes the input from your 
// zod schema and performs a mutation to the database which creates a feedback
// report record using the dao function you defined earlier.
//
// export default publicProcedure
// .input()
// .mutation(async({ ctx, input }) => {
//
// });
