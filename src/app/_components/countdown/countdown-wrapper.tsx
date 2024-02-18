import { serverTRPC } from "@/app/_trpc/server";
import CountdownUntil from "./countdown-until";
import CountdownDuring from "./countdown-during";
import CountdownComplete from "./countdown-complete";

export default async function CountdownWrapper() {
  const { startTime, timeRemaining } =
    await serverTRPC.countdown.get_time_remaining.query();

  if (timeRemaining >= 0) return <CountdownUntil startTime={startTime} />;
  if (timeRemaining > -43200000 && timeRemaining < 0)
    return <CountdownDuring startTime={startTime} />;
  return <CountdownComplete />;
}
