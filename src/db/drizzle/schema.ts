import {
  boolean,
  index,
  pgEnum,
  pgSchema,
  text,
  uuid,
} from "drizzle-orm/pg-core";

export const app_schema = pgSchema("app_schema");

export const class_year = pgEnum('app_schema"."class_year', [
  "middle_school",
  "high_school",
  "freshman",
  "sophmore",
  "junior",
  "senior",
  "graduate",
  "post_graduate",
]);

export const app_user_profile = app_schema.table(
  "app_user_profile",
  {
    // Cannot introspect private schema in supabase
    user_uuid: uuid("user_uuid").primaryKey(),
    user_email_address: text("user_email_address").notNull().unique(),
    user_avatar_url: text("user_avatar_url"),
    user_onboarding_complete: boolean("user_onboarding_complete"),
    user_display_name: text("user_display_name").notNull().unique(),
    user_class_year: class_year("user_class_year").notNull(),
  },
  (table) => {
    return {
      user_uuid_index: index("user_uuid_index").on(table.user_uuid),
    };
  },
);
