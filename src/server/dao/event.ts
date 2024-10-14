import { type Database } from "@/db/drizzle";
import {
  app_announcement,
  app_event,
  app_user_profile,
} from "@/db/drizzle/schema";
import { BaseError } from "@/shared/error";
import { TRPCError } from "@trpc/server";
import { getUserRole } from "./user";
import { eq } from "drizzle-orm";

export async function updateEventDetails(
  db: Database,
  user_uuid: string,
  event_date: string,
  event_start_hour: number,
  event_duration: number,
  event_challenges_enabled: boolean,
) {
  try {
    const user_role = await getUserRole(db, user_uuid);

    if (user_role?.user_role === "participant") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User must be an officer or admin to change event details.",
      });
    }

    const eventDate = new Date(event_date);
    const eventStartTime = new Date(
      eventDate.setUTCHours(event_start_hour + 4),
    );
    const eventEndTime = new Date(
      eventStartTime.getTime() + event_duration * 60 * 60 * 1000,
    );

    await db
      .insert(app_event)
      .values({
        event_id: 1,
        event_date: eventDate.toDateString(),
        event_start_time: eventStartTime.toISOString(),
        event_end_time: eventEndTime.toISOString(),
        event_start_hour: event_start_hour,
        event_duration: event_duration,
        event_challenges_enabled: event_challenges_enabled,
      })
      .onConflictDoUpdate({
        target: app_event.event_id,
        set: {
          event_date: eventDate.toDateString(),
          event_start_time: eventStartTime.toISOString(),
          event_end_time: eventEndTime.toISOString(),
          event_start_hour: event_start_hour,
          event_duration: event_duration,
          event_challenges_enabled: event_challenges_enabled,
        },
      });

    return {
      update_event_details: true,
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
        event_challenges_enabled: true,
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

export async function isChallengesEnabled(db: Database) {
  try {
    const result = await db
      .select({ event_challenges_enabled: app_event.event_challenges_enabled })
      .from(app_event)
      .limit(1);

    if (result.length > 0 && result[0]?.event_challenges_enabled) return true;
    return false;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function deleteAllParticipants(db: Database, user_uuid: string) {
  const result = await getUserRole(db, user_uuid);
  if (result?.user_role === "participant") {
    throw new TRPCError({
      message: "User must be an admin to delete all participants.",
      code: "UNAUTHORIZED",
    });
  }

  try {
    await db
      .delete(app_user_profile)
      .where(eq(app_user_profile.user_role, "participant"))
      .execute();
    return {
      delete_all_participants: true,
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

export async function deleteAllAnnouncements(db: Database, user_uuid: string) {
  const result = await getUserRole(db, user_uuid);
  if (result?.user_role === "participant") {
    throw new TRPCError({
      message: "User must be an admin to delete all announcements.",
      code: "UNAUTHORIZED",
    });
  }

  try {
    await db.delete(app_announcement).execute();
    return {
      delete_all_announcements: true,
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
