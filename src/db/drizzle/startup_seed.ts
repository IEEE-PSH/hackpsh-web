import { type Database } from ".";
import {
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
  "team-creation",
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
