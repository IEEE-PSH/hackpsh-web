import { createTRPCRouter, publicProcedure } from "../trpc";
import { spawn } from "child_process";
import { z } from "zod";
import createChallengeProcedure from "../procedures/protected/challenges/createChallengeProcedure";
import getChallengesProcedure from "../procedures/protected/challenges/getChallengesProcedure";
import getChallengeProcedure from "../procedures/protected/challenges/getChallengeProcedure";
import { testCodeProcedure } from "../procedures/protected/challenges/testCodeProcedure";

export const challengesRouter = createTRPCRouter({
  test_code: testCodeProcedure,
  create_challenge: createChallengeProcedure,
  get_challenges: getChallengesProcedure,
  get_challenge: getChallengeProcedure,
});
