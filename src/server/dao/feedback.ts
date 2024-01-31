import { type Database } from "@/db/drizzle";
import { app_feedback } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";

export async function createFeedbackReport(
  db: Database,
  feedback_name: string,
  feedback_report: string,
) {
  try {
    db.insert(app_feedback).values({
      feedback_name,
      feedback_report
    })
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

// Congratulations! You've made an typescript function to create feedback records
// within the database.
//
// The next step is to create an API Endpoint, so we can create feedback records
// by issuing an HTTP Call and consume the endpoint from our web application clients.
//
// In this project, we use a json-rpc server, specifically tRPC. The reason behind
// this choice was for type-safety across the front-end and back-end.
//
// Within the tRPC ecosystem, we use an internal vocabulary which you might want
// to take a look at here: https://trpc.io/docs/concepts#vocabulary
//
// The overall goal is to create a public feedback page to accept a name
// for the feedback, alongside a report from the user.
//
// In order to store this data, we must create a back-end API endpoint to store
// the user data from the front-end / web page.
//
// Goal: Create a public mutation procedure
// 
// Look at `src/procedures/public/feedback/createFeedbackReportProcedure.ts` to 
// get started
