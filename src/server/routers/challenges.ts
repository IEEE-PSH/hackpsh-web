import { createTRPCRouter } from "../trpc";
import createChallengeProcedure from "../procedures/protected/challenges/createChallengeProcedure";
import getChallengesProcedure from "../procedures/protected/challenges/getChallengesProcedure";
import getChallengeProcedure from "../procedures/protected/challenges/getChallengeProcedure";
import runCodeProcedure from "../procedures/protected/challenges/runCodeProcedure";
import submitCodeProcedure from "../procedures/protected/challenges/submitCodeProcedure";
import isSolvedChallengeProcedure from "../procedures/protected/challenges/isSolvedChallengeProcedure";

export const challengesRouter = createTRPCRouter({
  run_code: runCodeProcedure,
  submit_code: submitCodeProcedure,
  create_challenge: createChallengeProcedure,
  get_challenges: getChallengesProcedure,
  get_challenge: getChallengeProcedure,
  is_solved_challenge: isSolvedChallengeProcedure,
});
