export const siteConfig = {
  name: "HackPSH",
  emails: {
    general: "ieee@hackpsh.org",
  },
  registration_form:
    "https://docs.google.com/forms/d/e/1FAIpQLSdkVRX1e8lNruVzWVKgcQ6YOt9NWhkotzOysjU8YdewjDvvTA/viewform",
  location: "https://maps.app.goo.gl/EEXBSXZNzEgM6dhv7",
  links: {
    linkedin: "https://www.linkedin.com/company/ieee-penn-state-harrisbrurg/",
    facebook: "https://www.facebook.com/groups/183119638427039/",
    instagram: "https://www.instagram.com/psh.ieee/",
    blog: "https://edu.ieee.org/us-psu/",
    hackerrank: "https://www.hackerrank.com/hackpsh-spring-2024",
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
    create_challenge: "/challenge/create",
    edit_challenge: "/challenge/edit",
    create_post: "/announcements/create-post",
    edit_post: "/announcements/edit",
    privacy_policy: "/info/privacy-policy",
    terms_of_service: "/info/terms-of-service",
    event: "/settings/event",
    account: "/settings/account",
    users: "/settings/users",
    teams: "/settings/teams",
    challenge: "/challenge",
  },
};

export type SiteConfig = typeof siteConfig;
