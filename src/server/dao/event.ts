import { type Database } from "@/db/drizzle";
import { app_event, app_user_profile } from "@/db/drizzle/schema";
import { BaseError } from "@/shared/error";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { getUserRole } from "./user";

export async function updateEventDetails(
  db: Database,
  user_uuid: string,
  event_date: string,
  event_start_hour: number,
  event_end_hour: number,
) {
  try {
    const user_role = await getUserRole(db, user_uuid);

    if (user_role?.user_role === "participant") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User must be an officer or admin to create announcements.",
      });
    }

    await db.update(app_event).set({
      event_date,
      event_start_hour,
      event_end_hour,
    });

    return {
      update_user_personal_details: true,
    };
  } catch (error) {
    if (error instanceof BaseError) {
      throw new TRPCError({
        message: error.description!,
        code: "CONFLICT",
      });
    }
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
