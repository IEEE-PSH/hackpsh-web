export const siteConfig = {
  name: "HackPSH",
  emails: {
    general: "ieee@hackpsh.org",
  },
  links: {
    instagram: "https://www.instagram.com/psh.ieee/",
  },
  paths: {
    home: "/",
    about: "/about",
    partners: "/partners",
    sign_in: "/sign-in",
    sign_up: "/sign-up",
    onboarding: "/onboarding",
    onboarding_personal_details: "/onboarding/personal-details",
    onboarding_team_creation: "/onboarding/team-creation",
    onboarding_support_us: "/onboarding/support-us",
    dashboard: "/dashboard",
    leaderboard: "/leaderboard",
    announcements: "/announcements",
    challenges: "/challenges",
    create_post: "/announcements/create-post",
  },
};

export type SiteConfig = typeof siteConfig;
