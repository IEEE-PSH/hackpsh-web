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
    user_display_name: text("user_display_name").notNull().unique(),
    user_resume_url: text("user_resume_url"),
    user_team_uuid: uuid("user_team_uuid").references(() => app_team.team_uuid),
    user_school_year: text("user_school_year").references(
      () => app_school_year.school_year_name,
    ),
    user_role: text("user_role").references(() => app_role.role_name),
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

export const app_school_year = app_schema.table("app_school_year", {
  school_year_id: serial("school_year_id").primaryKey(),
  school_year_name: text("school_year_name").unique().notNull(),
});

export const app_team = app_schema.table("app_team", {
  team_uuid: uuid("team_uuid").primaryKey(),
  team_name: text("team_name").notNull().unique(),
  team_join_code: text("team_code").unique(),
  team_points: integer("team_points").default(0),
});

export const app_announcement = app_schema.table("app_announcement", {
  announcement_uuid: uuid("announcement_uuid").primaryKey(),
  announcement_created_at: timestamp("announcement_created_at").defaultNow(),
  announcement_author: uuid("announcement_author")
    .notNull()
    .references(() => app_user_profile.user_uuid),
  announcement_content: text("announcement_content").notNull(),
});
