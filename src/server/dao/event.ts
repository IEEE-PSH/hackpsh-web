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

    if (user_role?.user_role === "participant") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User must be an officer or admin to change event details.",
      });
    }

    let eventDate = new Date(event_date);
    let eventStartTime = new Date(eventDate.setUTCHours(event_start_hour + 4));
    let eventEndTime = new Date(
      eventStartTime.getTime() + event_duration * 60 * 60 * 1000,
    );

    await db.update(app_event).set({
      event_date,
      event_start_time: eventStartTime.toISOString(),
      event_end_time: eventEndTime.toISOString(),
      event_start_hour: event_start_hour,
      event_duration: event_duration,
    });

    return {
      update_user_personal_details: true,
    };
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getEventDetails(db: Database) {
  try {
    const result = await db.query.app_event.findFirst({
      columns: {
        event_date: true,
        event_start_time: true,
        event_end_time: true,
        event_start_hour: true,
        event_duration: true,
      },
    });

    return result;
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
