import { siteConfig } from "@/app/_config/site";
import { serverTRPC } from "@/app/_trpc/server";
import { type TUserOnboardingPhase } from "@/db/drizzle/startup_seed";
import { redirectToPath } from "@/server/lib/server-utils";
import handleError from "@/server/lib/server/handleError";
import { composeRouteHandlerClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = composeRouteHandlerClient();
  try {
    const user = await getUser(supabase);

    const { get_user_onboarding_phase } =
      (await serverTRPC.user.get_user_onboarding_phase.query({
        user_uuid: user.id,
      })) as { get_user_onboarding_phase: TUserOnboardingPhase };

    if (get_user_onboarding_phase === "personal-details") {
      return redirectToPath(req, siteConfig.paths.onboarding_personal_details);
    } else if (get_user_onboarding_phase === "school-details") {
      return redirectToPath(req, siteConfig.paths.onboarding_school_details);
    } else if (get_user_onboarding_phase === "support-us") {
      return redirectToPath(req, siteConfig.paths.onboarding_support_us);
    } else if (get_user_onboarding_phase === "validate-onboarding") {
      const { is_valid_user_profile_after_onboarding } =
        await serverTRPC.user.validate_user_onboarding.query({
          user_uuid: user.id,
        });

      if (!is_valid_user_profile_after_onboarding) {
        await serverTRPC.user.update_onboarding_phase.mutate({
          user_onboarding_phase: "personal-details",
          user_uuid: user.id,
        });
        return redirectToPath(
          req,
          siteConfig.paths.onboarding_personal_details,
        );
      }

      await serverTRPC.user.update_onboarding_status.mutate({
        user_onboarding_complete: true,
        user_uuid: user.id,
      });
      return redirectToPath(req, siteConfig.paths.dashboard);
    }
  } catch (cause) {
    handleError(req, cause);
  }
}
