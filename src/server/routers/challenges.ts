import { createTRPCRouter } from "../trpc";
import createChallengeProcedure from "../procedures/protected/challenges/createChallengeProcedure";
import getChallengeProcedure from "../procedures/protected/challenges/getChallengeProcedure";
import runCodeProcedure from "../procedures/protected/challenges/runCodeProcedure";
import submitCodeProcedure from "../procedures/protected/challenges/submitCodeProcedure";
import isSolvedChallengeProcedure from "../procedures/protected/challenges/isSolvedChallengeProcedure";
import getCodeSubmissionProcedure from "../procedures/protected/challenges/getCodeSubmissionProcedure";
import getEditChallengeInfoProcedure from "../procedures/protected/challenges/getEditChallengeInfoProcedure";
import updateChallengeProcedure from "../procedures/protected/challenges/updateChallengeProcedure";
import getChallengesProcedure from "../procedures/protected/challenges/getChallengesProcedure";
import deleteChallengeProcedure from "../procedures/protected/challenges/deleteChallengeProcedure";
import getArchivedChallengesProcedure from "../procedures/protected/challenges/getArchivedChallengesProcedure";

export const challengesRouter = createTRPCRouter({
  run_code: runCodeProcedure,
  submit_code: submitCodeProcedure,
  create_challenge: createChallengeProcedure,
  get_challenges: getChallengesProcedure,
  get_archived_challenges:getArchivedChallengesProcedure,
  get_challenge: getChallengeProcedure,
  is_solved_challenge: isSolvedChallengeProcedure,
  get_code_submission: getCodeSubmissionProcedure,
  get_edit_challenge_info: getEditChallengeInfoProcedure,
  update_challenge: updateChallengeProcedure,
  delete_challenge: deleteChallengeProcedure,
});
