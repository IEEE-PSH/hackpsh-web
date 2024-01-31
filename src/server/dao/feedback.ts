import { type Database } from "@/db/drizzle";
import { app_feedback } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";

export async function createFeedbackReport(
  db: Database,
  feedback_name: string,
  feedback_report: string,
) {
  try {
    await db.insert(app_feedback).values({
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