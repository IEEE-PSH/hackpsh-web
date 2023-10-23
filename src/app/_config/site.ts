export const siteConfig = {
  name: "HackPSH",
  links: {
    instagram: "https://www.instagram.com/psh.ieee/",
  },
  paths: {
    home: "/",
    sign_in: "/sign-in",
    sign_up: "/sign-up",
    onboarding: "/onboarding",
    dashboard: "/dashboard",
    leaderboard: "/leaderboard",
    announcements: "/announcements",
    challenges: "/challenges",
  },
};

export type SiteConfig = typeof siteConfig;
