import { publicProcedure } from "@/server/trpc";

export default publicProcedure.query(() => {
  const startTime = "03-23-2024 10:00:00";
  const timeRemaining = Date.parse(startTime) - Date.now();
  console.log(timeRemaining);
  return { startTime, timeRemaining };
});
