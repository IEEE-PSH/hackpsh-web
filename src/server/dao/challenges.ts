import { type Database } from "@/db/drizzle";
import {
  app_challenges,
  app_solved_challenges,
  app_team,
  app_test_cases,
  app_user_profile,
} from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";
import { eq, and, sql, notExists } from "drizzle-orm";
import { getUserRole } from "./user";
import { type TDifficulties } from "@/db/drizzle/startup_seed";

export async function getArchivedChallenges(db: Database){
  try{
    const archivedChallenges = await db
    .select({
      challenge_uuid: app_challenges.challenge_uuid,
      challenge_id: app_challenges.challenge_id,
      challenge_title: app_challenges.challenge_title,
      challenge_difficulty: app_challenges.challenge_difficulty,
      challenge_points: app_challenges.challenge_points,
    })
    .from(app_challenges)
    .where(eq(app_challenges.challenge_is_live, false));  

    return archivedChallenges
  }catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type TArchivedChallenges = Awaited<ReturnType<typeof getArchivedChallenges>>

export async function getChallenges(db: Database, user_uuid: string) {
  try {
    const teamUUID = await db.query.app_user_profile.findFirst({
      columns: {
        user_team_uuid: true,
      },
      where: eq(app_user_profile.user_uuid, user_uuid),
    });

    const unsolvedChallenges = await db
      .select({
        challenge_uuid: app_challenges.challenge_uuid,
        challenge_id: app_challenges.challenge_id,
        challenge_title: app_challenges.challenge_title,
        challenge_difficulty: app_challenges.challenge_difficulty,
        challenge_points: app_challenges.challenge_points,
      })
      .from(app_challenges)
      .where(
        and(
          eq(app_challenges.challenge_is_live, true),
        notExists(
          db
            .select()
            .from(app_solved_challenges)
            .where(
              and(
                eq(
                  app_solved_challenges.solved_challenge_foreign_uuid,
                  app_challenges.challenge_uuid,
                ),
                eq(
                  app_solved_challenges.solved_challenge_team_uuid,
                  teamUUID!.user_team_uuid!,
                ),
              ),
            ),
          ),
        )
      );

    const solvedChallenges = await db
      .select({
        challenge_uuid: app_challenges.challenge_uuid,
        challenge_id: app_challenges.challenge_id,
        challenge_title: app_challenges.challenge_title,
        challenge_difficulty: app_challenges.challenge_difficulty,
        challenge_points: app_challenges.challenge_points,
      })
      .from(app_challenges)
      .innerJoin(
        app_solved_challenges,
        eq(
          app_solved_challenges.solved_challenge_foreign_uuid,
          app_challenges.challenge_uuid,
        ),
      )
      .where(
        and(
          eq(
            app_solved_challenges.solved_challenge_team_uuid,
            teamUUID!.user_team_uuid!,
          ),
          eq(app_challenges.challenge_is_live, true)
        )
      );

    return {
      unsolvedChallenges,
      solvedChallenges,
    };
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type Challenges = Awaited<ReturnType<typeof getChallenges>>;
export type Challenge = Challenges["unsolvedChallenges"][number]

export async function getChallenge(db: Database, challengeID: number) {
  try {
    const result = await db.query.app_challenges.findFirst({
      columns: {
        challenge_uuid: true,
        challenge_id: true,
        challenge_title: true,
        challenge_difficulty: true,
        challenge_description: true,
        challenge_languages: true,
        challenge_function_header: true,
        challenge_example_input: true,
        challenge_example_output: true,
        challenge_explanation: true,
        challenge_points: true,
      },
      where: (challenge_data, { eq }) =>
        eq(challenge_data.challenge_id, challengeID),
    });

    return result;
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function deleteChallenge(
  db: Database,
  userUUID: string,
  challengeID: number,
) {
  try {
    const result = await getUserRole(db, userUUID);
    if (result?.user_role === "participant") {
      throw new TRPCError({
        message: "User must be an officer or admin to create challenges.",
        code: "UNAUTHORIZED",
      });
    }
    await db
      .delete(app_challenges)
      .where(eq(app_challenges.challenge_id, challengeID));

    return { delete_challenge: true };
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export async function getEditChallengeInfo(db: Database, challengeId: number) {
  try {
    const challengeUUID = await db.query.app_challenges.findFirst({
      columns: {
        challenge_uuid: true,
      },
      where: eq(app_challenges.challenge_id, challengeId),
    });

    const testcases = await getTestCases(db, challengeUUID!.challenge_uuid);

    const challenge = await db.query.app_challenges.findFirst({
      columns: {
        challenge_uuid: true,
        challenge_id: true,
        challenge_title: true,
        challenge_difficulty: true,
        challenge_description: true,
        challenge_languages: true,
        challenge_function_header: true,
        challenge_example_input: true,
        challenge_example_output: true,
        challenge_explanation: true,
        challenge_points: true,
      },
      where: (challenge_data, { eq }) =>
        eq(challenge_data.challenge_id, challengeId),
    });
    return { challenge: challenge, testcases: testcases };
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type TEditChallengeData = Awaited<
  ReturnType<typeof getEditChallengeInfo>
>;

export async function getCodeSubmission(
  db: Database,
  challenge_id: number,
  user_uuid: string,
) {
  try {
    const solved = await isSolvedChallenge(db, challenge_id, user_uuid);
    if (solved) {
      const challengeUUID = await db.query.app_challenges.findFirst({
        columns: {
          challenge_uuid: true,
        },
        where: eq(app_challenges.challenge_id, challenge_id),
      });

      const teamUUID = await db.query.app_user_profile.findFirst({
        columns: {
          user_team_uuid: true,
        },
        where: eq(app_user_profile.user_uuid, user_uuid),
      });

      const result = db.query.app_solved_challenges.findFirst({
        columns: {
          solved_challenge_code_submission: true,
          solved_challenge_language: true,
        },
        where: and(
          eq(
            app_solved_challenges.solved_challenge_foreign_uuid,
            challengeUUID!.challenge_uuid,
          ),
          eq(
            app_solved_challenges.solved_challenge_team_uuid,
            teamUUID!.user_team_uuid!,
          ),
        ),
      });

      return result;
    } else {
      return null;
    }
  } catch (error) {
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

export type TChallengeData = Awaited<ReturnType<typeof getChallenge>>;

export async function isSolvedChallenge(
  db: Database,
  challenge_id: number,
  user_uuid: string,
) {
  try {
    const challengeUUID = await db.query.app_challenges.findFirst({
      columns: {
        challenge_uuid: true,
      },
      where: eq(app_challenges.challenge_id, challenge_id),
    });

    const teamUUID = await db.query.app_user_profile.findFirst({
      columns: {
        user_team_uuid: true,
      },
      where: eq(app_user_profile.user_uuid, user_uuid),
    });

    try {
      const result = await db
        .select()
        .from(app_solved_challenges)
        .where(
          and(
            eq(
              app_solved_challenges.solved_challenge_foreign_uuid,
              challengeUUID!.challenge_uuid,
            ),
            eq(
              app_solved_challenges.solved_challenge_team_uuid,
              teamUUID!.user_team_uuid!,
            ),
          ),
        )
        .limit(1)
        .execute();
      return result.length > 0;
    } catch (error) {
      return false;
    }
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
  points: number,
  description: string,
  languages: string,
  function_header: string,
  example_input: string,
  example_output: string,
  explanation: string,
  test_cases: Array<{ input: string; output: string }>,
) {
  const result = await getUserRole(db, user_uuid);
  if (result?.user_role === "participant") {
    throw new TRPCError({
      message: "User must be an officer or admin to create challenges.",
      code: "UNAUTHORIZED",
    });
  }

  try {
    const challengeResult = await db
      .insert(app_challenges)
      .values({
        challenge_title: title,
        challenge_difficulty: difficulty,
        challenge_points: points,
        challenge_description: description,
        challenge_languages: languages,
        challenge_function_header: function_header,
        challenge_example_input: example_input,
        challenge_example_output: example_output,
        challenge_explanation: explanation,
      })
      .returning({ uuid: app_challenges.challenge_uuid });

    const challengeUUID = challengeResult[0]!.uuid;

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

export async function updateChallenge(
  db: Database,
  user_uuid: string,
  title: string,
  difficulty: TDifficulties,
  points: number,
  description: string,
  languages: string,
  function_header: string,
  example_input: string,
  example_output: string,
  explanation: string,
  test_cases: Array<{
    input: string;
    output: string;
  }>,
  challengeId: number,
) {
  const result = await getUserRole(db, user_uuid);
  if (result?.user_role === "participant") {
    throw new TRPCError({
      message: "User must be an officer or admin to update challenges.",
      code: "UNAUTHORIZED",
    });
  }

  try {
    //delete old test cases with new ones; easier for test case deletions
    const matchingChallenge = await db.query.app_challenges.findFirst({
      where: eq(app_challenges.challenge_id, challengeId),
    });

    await db
      .delete(app_test_cases)
      .where(
        eq(
          app_test_cases.test_case_challenge_uuid,
          matchingChallenge!.challenge_uuid,
        ),
      );

    //update challenge info
    const challenge = await db
      .update(app_challenges)
      .set({
        challenge_title: title,
        challenge_difficulty: difficulty,
        challenge_points: points,
        challenge_description: description,
        challenge_languages: languages,
        challenge_function_header: function_header,
        challenge_example_input: example_input,
        challenge_example_output: example_output,
        challenge_explanation: explanation,
      })
      .where(eq(app_challenges.challenge_id, challengeId))
      .returning({ uuid: app_challenges.challenge_uuid });

    const challengeUUID = challenge[0]!.uuid;

    //insert test cases
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

export async function solveChallenge(
  db: Database,
  challenge_id: number,
  user_uuid: string,
  code_submission: string,
  language: string,
) {
  try {
    const challenge = await db.query.app_challenges.findFirst({
      columns: {
        challenge_uuid: true,
        challenge_points: true,
      },
      where: eq(app_challenges.challenge_id, challenge_id),
    });

    const teamUUID = await db.query.app_user_profile.findFirst({
      columns: {
        user_team_uuid: true,
      },
      where: eq(app_user_profile.user_uuid, user_uuid),
    });

    const isSolvedAlready = await db.query.app_solved_challenges.findFirst({
      columns: {
        solved_challenge_foreign_uuid: true,
        solved_challenge_team_uuid: true,
      },
      where: and(
        eq(
          app_solved_challenges.solved_challenge_uuid,
          challenge!.challenge_uuid,
        ),
        eq(
          app_solved_challenges.solved_challenge_team_uuid,
          teamUUID!.user_team_uuid!,
        ),
      ),
    });

    if (!isSolvedAlready) {
      await db.insert(app_solved_challenges).values({
        solved_challenge_foreign_uuid: challenge!.challenge_uuid,
        solved_challenge_team_uuid: teamUUID!.user_team_uuid!,
        solved_challenge_code_submission: code_submission,
        solved_challenge_language: language,
      });

      await db
        .update(app_team)
        .set({
          team_points: sql`${app_team.team_points} + ${challenge!.challenge_points}`,
        })
        .where(eq(app_team.team_uuid, teamUUID!.user_team_uuid!));
    }
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
