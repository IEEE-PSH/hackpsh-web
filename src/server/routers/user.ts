import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { type Database } from "@/db/drizzle";
import { app_user_profile } from "@/db/drizzle/schema";
import {
  CreateUserSchema,
  LookupUserSchema,
} from "@/app/_lib/zod-schemas/routers/user";

async function fetchOnboardingStatus(db: Database, user_uuid: string) {
  const result = await db.query.app_user_profile.findFirst({
    columns: {
      user_onboarding_complete: true,
    },
    where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
  });

  if (!result) {
    return null;
  }

  return result.user_onboarding_complete;
}

async function createUser(
  db: Database,
  user_uuid: string,
  user_email_address: string,
) {
  try {
    await db.insert(app_user_profile).values({
      user_uuid,
      user_email_address,
      user_onboarding_complete: false,
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function doesUserExist(db: Database, user_uuid: string) {
  try {
    const result = await db.query.app_user_profile.findFirst({
      columns: {
        user_uuid: true,
      },
      where: (user_data, { eq }) => eq(user_data.user_uuid, user_uuid),
    });

    if (!result) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export const userRouter = createTRPCRouter({
  is_onboarding_complete: publicProcedure
    .input(LookupUserSchema)
    .query(async ({ ctx, input }) => {
      const result = await fetchOnboardingStatus(ctx.db, input.user_uuid);

      return {
        is_onboarding_complete: result ?? false,
      };
    }),
  create_user: protectedProcedure
    .input(CreateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await createUser(
        ctx.db,
        input.user_uuid,
        input.user_email_address,
      );
      return {
        create_user: result,
      };
    }),
  does_user_exist: protectedProcedure
    .input(LookupUserSchema)
    .query(async ({ ctx, input }) => {
      const result = await doesUserExist(ctx.db, input.user_uuid);

      return {
        does_user_exist: result,
      };
    }),
});
