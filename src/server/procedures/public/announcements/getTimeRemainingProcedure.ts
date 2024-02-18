import { publicProcedure } from "@/server/trpc";

export default publicProcedure.query(() => {
  const timeRemaining = Date.parse("March 23, 2024 10:00:00") - Date.now();

  return timeRemaining;
});
