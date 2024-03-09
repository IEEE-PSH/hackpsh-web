export const siteConfig = {
  name: "HackPSH",
  emails: {
    general: "ieee@hackpsh.org",
  },
  links: {
    linkedin: "https://www.linkedin.com/company/ieee-penn-state-harrisbrurg/",
    facebook: "https://www.facebook.com/groups/183119638427039/",
    instagram: "https://www.instagram.com/psh.ieee/",
    blog: "https://edu.ieee.org/us-psu/",
  },
  paths: {
    home: "/",
    about: "/about",
    partners: "/partners",
    contact: "/contact",
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
    privacy_policy: "/info/privacy-policy",
    terms_of_service: "/info/terms-of-service",
  },
};

export type SiteConfig = typeof siteConfig;
