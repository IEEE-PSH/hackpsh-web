import { type Database } from "@/db/drizzle";
import { app_event } from "@/db/drizzle/schema";
import { BaseError } from "@/shared/error";
import { TRPCError } from "@trpc/server";
import { getUserRole } from "./user";

export async function updateEventDetails(
  db: Database,
  user_uuid: string,
  event_date: string,
  event_start_hour: number,
  event_duration: number,
) {
  try {
    const user_role = await getUserRole(db, user_uuid);
    console.log(event_duration);
    if (user_role?.user_role === "participant") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User must be an officer or admin to change event details.",
      });
    }

    let eventDate = new Date(event_date);
    eventDate.setUTCHours(0);
    let eventStartTime = new Date(eventDate.setUTCHours(event_start_hour + 26));
    let eventEndTime = new Date(
      eventStartTime.getTime() + event_duration * 60 * 60 * 1000,
    );
    console.log(eventEndTime);

    await db.update(app_event).set({
      event_date,
      event_start_time: eventStartTime.toString(),
      event_end_time: eventEndTime.toString(),
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
