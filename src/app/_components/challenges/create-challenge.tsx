import { serverTRPC } from "@/app/_trpc/server";
import { createClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import CreateChallengeButton from "./create-challenge-button";

type CreateChallengeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default async function CreateChallenge({
  className,
}: CreateChallengeProps) {
  const supabase = createClient();
  try {
    const user = await getUser(supabase);
    const { get_user_role } = await serverTRPC.user.get_user_role.query({
      user_uuid: user.id,
    });

    if (get_user_role === "admin" || get_user_role === "officer") {
      return <CreateChallengeButton />;
    }
  } catch (error) {
    console.log(error);
  }
}
