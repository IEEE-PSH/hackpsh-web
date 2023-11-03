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
    user_team_uuid: uuid("user_team_uuid").references(() => app_team.team_uuid),
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
    user_onboarding_phase: text("user_onboarding_phase").references(
      () => app_onboarding_phase.phase_name,
    ),
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
});

export const app_announcement = app_schema.table("app_announcement", {
  announcement_uuid: uuid("announcement_uuid")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  announcement_created_at: timestamp("announcement_created_at")
    .notNull()
    .defaultNow(),
  announcement_author_uuid: uuid("announcement_author_uuid")
    .notNull()
    .references(() => app_user_profile.user_uuid),
  announcement_title: text("announcement_title").notNull(),
  announcement_content: text("announcement_content").notNull(),
});

export const app_onboarding_phase = app_schema.table("app_onboarding_phase", {
  phase_id: serial("phase_id").primaryKey(),
  phase_name: text("phase_name").notNull().unique(),
});
