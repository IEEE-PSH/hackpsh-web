import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure.query(({}) => {
  //todo: call API to get accurate current time
  //currently takes timeRemaining for now
  return Math.abs(Date.parse("March 23, 2024 10:00:00") - Date.now());
});
