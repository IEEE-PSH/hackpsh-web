import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgSchema,
  text,
  uuid,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const app_schema = pgSchema("app_schema");

export const app_user_profile = app_schema.table(
  "app_user_profile",
  {
    user_uuid: uuid("user_uuid").primaryKey(),
    user_email_address: text("user_email_address").notNull().unique(),
    user_avatar_url: text("user_avatar_url"),
    user_onboarding_complete: boolean("user_onboarding_complete"),
    user_display_name: text("user_display_name").unique(),
    user_resume_url: text("user_resume_url"),
    user_team_uuid: uuid("user_team_uuid").references(
      () => app_team.team_uuid,
      { onDelete: "cascade" },
    ),
    user_school_year: text("user_school_year").references(
      () => app_school_year.school_year_name,
    ),
    user_major: text("user_major").references(() => app_major.major_name),
    user_role: text("user_role")
      .notNull()
      .references(() => app_role.role_name)
      .default("participant"),
    user_support_administrative: boolean("user_support_administrative").default(
      false,
    ),
    user_support_technical: boolean("user_support_technical").default(false),
    user_onboarding_phase: text("user_onboarding_phase")
      .notNull()
      .references(() => app_onboarding_phase.phase_name)
      .default("personal-details"),
  },
  (table) => {
    return {
      user_uuid_index: index("user_uuid_index").on(table.user_uuid),
    };
  },
);

export const app_role = app_schema.table("app_role", {
  role_id: serial("role_id").primaryKey(),
  role_name: text("role_name").unique().notNull(),
});

export const app_major = app_schema.table("app_major", {
  major_id: serial("major_id").primaryKey(),
  major_name: text("major_name").unique().notNull(),
});

export const app_school_year = app_schema.table("app_school_year", {
  school_year_id: serial("school_year_id").primaryKey(),
  school_year_name: text("school_year_name").unique().notNull(),
});

export const app_team = app_schema.table("app_team", {
  team_uuid: uuid("team_uuid")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  team_name: text("team_name").notNull().unique(),
  team_join_code: text("team_code").notNull().unique(),
  team_points: integer("team_points").notNull().default(0),
  team_points_additive: integer("team_points_additive").notNull().default(0),
});

export const app_announcement = app_schema.table("app_announcement", {
  announcement_uuid: uuid("announcement_uuid")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  announcement_created_at: timestamp("announcement_created_at")
    .notNull()
    .defaultNow(),
  announcement_author_uuid: uuid("announcement_author_uuid").references(
    () => app_user_profile.user_uuid,
    { onDelete: "set null" },
  ),
  announcement_id: serial("announcement_id"),
  announcement_title: text("announcement_title").notNull(),
  announcement_content: text("announcement_content").notNull(),
});

export const app_onboarding_phase = app_schema.table("app_onboarding_phase", {
  phase_id: serial("phase_id").primaryKey(),
  phase_name: text("phase_name").notNull().unique(),
});

export const app_contact = app_schema.table("app_contact", {
  contact_uuid: uuid("contact_uuid")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  contact_created_at: timestamp("contact_created_at").notNull().defaultNow(),
  contact_first_name: text("contact_first_name").notNull(),
  contact_last_name: text("contact_last_name").notNull(),
  contact_email: text("contact_email").notNull(),
  contact_content: text("contact_content").notNull(),
});

export const app_event = app_schema.table("app_event", {
  event_date: text("event_date")
    .primaryKey()
    .notNull()
    .default("Sun Sep 22 2024"),
  event_start_time: text("event_start_time")
    .notNull()
    .default("2024-09-22T06:00:00.000Z"),
  event_end_time: text("event_end_time")
    .notNull()
    .default("2024-09-23T06:00:00.000Z"),
  event_start_hour: integer("event_start_hour").notNull().default(10),
  event_duration: integer("event_duration").notNull().default(12),
});

export const app_challenges = app_schema.table("app_challenges", {
  challenge_uuid: uuid("challenge_uuid")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  challenge_id: serial("challenge_id"),
  challenge_title: text("challenge_title").notNull(),
  challenge_difficulty: text("challenge_difficulty")
    .references(() => app_difficulty.difficulty_name)
    .notNull(),
  challenge_points: integer("challenge_points").notNull().default(0),
  challenge_description: text("challenge_description").notNull(),
  challenge_function_header: text("challenge_function_header").notNull(),
  challenge_example_input: text("challenge_example_input").notNull(),
  challenge_example_output: text("challenge_example_output").notNull(),
  challenge_explanation: text("challenge_explanation"),
});

export const app_difficulty = app_schema.table("app_difficulty", {
  difficulty_id: serial("difficulty_id").primaryKey(),
  difficulty_name: text("difficulty_name").unique().notNull(),
});

export const app_test_cases = app_schema.table("app_test_cases", {
  test_case_uuid: uuid("test_case_uuid")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  test_case_input: text("test_case_input").notNull(),
  test_case_output: text("test_case_output").notNull(),
  test_case_challenge_uuid: uuid("test_case_challenge_uuid")
    .references(() => app_challenges.challenge_uuid, { onDelete: "cascade" })
    .notNull(),
});

export const app_solved_challenges = app_schema.table("app_solved_challenges", {
  solved_challenge_uuid: uuid("solved_challenge_uuid")
    .primaryKey()
    .default(sql`uuid_generate_v4()`)
    .references(() => app_challenges.challenge_uuid, { onDelete: "cascade" }),
  solved_challenge_team_uuid: uuid("solved_challenge_team_uuid")
    .references(() => app_team.team_uuid, { onDelete: "cascade" })
    .notNull(),
  solved_challenge_code_submission: text("solved_challenge_code_submission"),
});
