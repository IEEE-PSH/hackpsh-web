import { type Database } from ".";
import {
  app_difficulty,
  app_event,
  app_major,
  app_onboarding_phase,
  app_role,
  app_school_year,
} from "./schema";

export const dbSchoolYear = [
  "not_applicable",
  "middle_school",
  "high_school",
  "freshman",
  "sophmore",
  "junior",
  "senior",
  "graduate",
  "post_graduate",
] as const;

export type TUserSchoolYear = (typeof dbSchoolYear)[number];

export async function insertSchoolYear(db: Database, school_year_name: string) {
  await db
    .insert(app_school_year)
    .values({ school_year_name })
    .onConflictDoNothing();
}

export const dbRole = ["participant", "officer", "admin"] as const;
export type TUserRole = (typeof dbRole)[number];

export async function insertRole(db: Database, role_name: string) {
  await db.insert(app_role).values({ role_name }).onConflictDoNothing();
}

export const dbMajors = [
  "not_applicable",
  "undecided",
  "accounting",
  "american_studies",
  "biobehavioral_health",
  "biology",
  "civil_engineering",
  "communication_sciences_and_disorders",
  "communications",
  "computer_science",
  "criminal_justice",
  "cybersecurity_analytics_and_operations",
  "electrical_engineering",
  "electrical_engineering_technology",
  "elementary_education",
  "english",
  "enterprise_technology_integration",
  "finance",
  "health_policy_and_administration",
  "human_capital_management",
  "human_development_and_family_studies",
  "human_centered_design_and_development",
  "humanities",
  "information_sciences_and_technology",
  "information_systems",
  "kinesiology",
  "management",
  "marketing",
  "mathematical_sciences",
  "mechanical_engineering",
  "mechanical_engineering_technology",
  "nursing",
  "political_science",
  "project_and_supply_chain_management",
  "psychology",
  "public_policy",
  "science",
  "secondary_education_english",
  "secondary_education_mathematics",
  "secondary_education_social_studies",
  "security_and_risk_analysis",
  "sociology",
  "structural_design_and_construction_engineering_technology",
] as const;

export type TUserMajor = (typeof dbMajors)[number];

export async function insertMajor(db: Database, major_name: string) {
  await db.insert(app_major).values({ major_name }).onConflictDoNothing();
}

export const dbOnboardingPhases = [
  "personal-details",
  "school-details",
  "support-us",
  "validate-onboarding",
] as const;

export type TUserOnboardingPhase = (typeof dbOnboardingPhases)[number];

export async function insertOnboardingPhases(db: Database, phase_name: string) {
  await db
    .insert(app_onboarding_phase)
    .values({ phase_name })
    .onConflictDoNothing();
}

export async function insertEventDetails(db: Database) {
  await db
    .insert(app_event)
    .values({
      event_id: 1,
      event_date: "Sun Sep 22 2024",
      event_start_hour: 10,
      event_start_time: "2024-09-22T06:00:00.000Z",
      event_end_time: "2024-09-23T06:00:00.000Z",
      event_duration: 12,
      event_challenges_enabled: false,
    })
    .onConflictDoNothing();
}

export const dbDifficulties = ["easy", "medium", "hard"] as const;
export type TDifficulties = (typeof dbDifficulties)[number];
export async function insertDifficulties(
  db: Database,
  difficulty_name: string,
) {
  await db
    .insert(app_difficulty)
    .values({ difficulty_name })
    .onConflictDoNothing();
}
