import { z } from "zod";
const MajorSchema = z.enum([
  "n/a",
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
  "human-centered_design_and_development",
  "humanities",
  "information_sciences_and_technology",
  "information_systems",
  "kinesiology",
  "management",
  "marketing",
  "mathematical_sciences",
  "mechanical_engineering",
  "mechanical_engineering_technology",
  "nursing_(second_degree)",
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
  "structural_design_&_construction_engineering_technology",
]);
export type TMajor = z.infer<typeof MajorSchema>;

// Form Schema
export const PersonalFormSchema = z.object({
  user_display_name: z
    .string()
    .min(5, { message: "Display Name must be 5 or more characters long." })
    .max(30, {
      message: "Display Name must be fewer than 30 characters long.",
    }),
  user_class_year: z.union([
    z.literal("middle_school"),
    z.literal("high_school"),
    z.literal("freshman"),
    z.literal("sophmore"),
    z.literal("junior"),
    z.literal("senior"),
    z.literal("graduate"),
    z.literal("post_graduate"),
  ]),
  user_major: MajorSchema,
});

export const HelpFormSchema = z.object({
  //unsure how to use booleans
  be_officer: z.enum(["yes", "no"]),
  type_officer: z.enum(["administrative", "technical", "both"]),
});

export const CreateTeamFormSchema = z.object({
  create_team_name: z.string(),
});
export const JoinTeamFormSchema = z.object({
  join_team_name: z.string(),
});

export const OnboardingCompleteLookupSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
});

export type TPersonalForm = z.infer<typeof PersonalFormSchema>;
export type THelpForm = z.infer<typeof HelpFormSchema>;
export type TCreateTeamForm = z.infer<typeof CreateTeamFormSchema>;
export type TJoinTeamForm = z.infer<typeof JoinTeamFormSchema>;
