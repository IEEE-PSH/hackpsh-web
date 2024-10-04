import { type Database } from "@/db/drizzle";
import { app_challenges, app_test_cases } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { getUserRole } from "./user";
import { TDifficulties } from "@/db/drizzle/startup_seed";

export async function getChallenges(db: Database) {
  try {
    const challenges = await db
      .select({
        challenge_uuid: app_challenges.challenge_uuid,
        challenge_id: app_challenges.challenge_id,
        challenge_title: app_challenges.challenge_title,
        challenge_difficulty: app_challenges.challenge_difficulty,
      })
      .from(app_challenges);

    return challenges;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type Challenges = Awaited<ReturnType<typeof getChallenges>>;
export type Challenge = Challenges[number];

export async function getChallenge(db: Database, challengeID: number) {
  try {
    const result = await db.query.app_challenges.findFirst({
      columns: {
        challenge_uuid: true,
        challenge_id: true,
        challenge_title: true,
        challenge_difficulty: true,
        challenge_description: true,
        challenge_function_header: true,
        challenge_example_input: true,
        challenge_example_output: true,
        challenge_explanation: true,
      },
      where: (challenge_data, { eq }) =>
        eq(challenge_data.challenge_id, challengeID),
    });
    //add testcases

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getTestCases(db: Database, challengeUUID: string) {
  try {
    const result = await db.query.app_test_cases.findMany({
      columns: {
        test_case_input: true,
        test_case_output: true,
      },
      where: eq(app_test_cases.test_case_challenge_uuid, challengeUUID),
    });
    //add testcases

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type TestCases = Awaited<ReturnType<typeof getTestCases>>;
export type TestCase = TestCases[number];

export async function createChallenge(
  db: Database,
  user_uuid: string,
  title: string,
  difficulty: TDifficulties,
  description: string,
  function_header: string,
  example_input: string,
  example_output: string,
  explanation: string,
  test_cases: Array<{ input: string; output: string }>,
) {
  const result = await getUserRole(db, user_uuid);
  if (result?.user_role === "participant") {
    throw new TRPCError({
      message: "User must be an officer or admin to delete announcements.",
      code: "UNAUTHORIZED",
    });
  }

  try {
    const challengeResult = await db
      .insert(app_challenges)
      .values({
        challenge_title: title,
        challenge_difficulty: difficulty,
        challenge_description: description,
        challenge_function_header: function_header,
        challenge_example_input: example_input,
        challenge_example_output: example_output,
        challenge_explanation: explanation,
      })
      .returning({ uuid: app_challenges.challenge_uuid });

    const challengeUUID = challengeResult[0]?.uuid;

    for (const test_case of test_cases) {
      await db.insert(app_test_cases).values({
        test_case_input: test_case.input,
        test_case_output: test_case.output,
        test_case_challenge_uuid: challengeUUID,
      });
    }
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

// export type Announcements = Awaited<ReturnType<typeof getAnnouncements>>;
// export type AnnouncementPost = Announcements[number];
