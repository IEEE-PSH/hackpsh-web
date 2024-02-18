import { serverTRPC } from "@/app/_trpc/server";
import CountdownUntil from "./countdown-until";
import CountdownDuring from "./countdown-during";
import CountdownComplete from "./countdown-complete";

export default async function CountdownWrapper() {
  const timeRemaining = await serverTRPC.countdown.get_time_remaining.query();
  console.log(timeRemaining);

  if (timeRemaining >= 0) return <CountdownUntil />;
  if (timeRemaining > -43200000 && timeRemaining < 0)
    return <CountdownDuring />;
  return <CountdownComplete />;
}
