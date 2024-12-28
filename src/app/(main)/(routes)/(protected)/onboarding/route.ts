import { siteConfig } from "@/app/_config/site";
import { serverTRPC } from "@/app/_trpc/server";
import { type TUserOnboardingPhase } from "@/db/drizzle/startup_seed";
import { onboardingPaths } from "@/middleware";
import { redirectToPath } from "@/server/lib/server-utils";
import handleError from "@/server/lib/server/handleError";
import { createClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { type NextRequest } from "next/server";

//prevention of visiting wrong onboarding page is handled through middleware.ts
export async function GET(request: NextRequest) {
  const supabase = createClient();
  try {
    const user = await getUser(supabase);

    const { get_user_onboarding_phase } =
      (await serverTRPC.user.get_user_onboarding_phase.query({
        user_uuid: user.id,
      })) as { get_user_onboarding_phase: TUserOnboardingPhase };

    const pathnameKey =
      get_user_onboarding_phase as keyof typeof onboardingPaths;
    if (onboardingPaths[pathnameKey]) {
      return redirectToPath(request, onboardingPaths[pathnameKey]);
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
          request,
          siteConfig.paths.onboarding_personal_details,
        );
      }

      await serverTRPC.user.update_onboarding_status.mutate({
        user_onboarding_complete: true,
        user_uuid: user.id,
      });
      return redirectToPath(request, siteConfig.paths.dashboard);
    }
  } catch (cause) {
    handleError(request, cause);
  }
}
