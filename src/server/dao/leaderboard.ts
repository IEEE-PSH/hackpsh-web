import { Database } from "@/db/drizzle";
import { TRPCError } from "@trpc/server";

export async function getCurrentStandings(db: Database) {
  try {
    const result = true;

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
