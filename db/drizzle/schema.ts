import { boolean, index, pgEnum, pgSchema, pgTable, text, uuid } from "drizzle-orm/pg-core"

export const class_year = pgEnum('class_year', ['middle_school', 'high_school', 'freshman', 'sophmore', 'junior', 'senior', 'graduate', 'post_graduate']);

/**
 * 1:1 Relationship between Supabase `auth.users.id` table.
 * Responsible for holding a user's profile viewable by authenticated users
 * 
 * RLS Policy: (SELECT) for authenticated users whose `uid` match `users.user_uuid`
 * ```sql
 * alter table app_user_profile enable row level security;
 * 
 * create policy "User Profile is viewable only by authenticated users"
 * on app_user_profile for select
 * to authenticated
 * using ( true );
 * ```
 */
export const app_user_profile = pgTable("app_user_profile", {
  // Cannot introspect private schema in supabase
  user_uuid: uuid("user_uuid").primaryKey(), //.references(auth.users.id) (can't access as it's a private schema in supabase that was not able to)
  user_email_address: text("user_email_address").notNull().unique(),
  user_avatar_url: text("user_avatar_url"),
  user_onboarding_complete: boolean("user_onboarding_complete"),
  user_display_name: text("user_display_name").notNull().unique(),
  user_class_year: class_year('user_class_year').notNull(),
}, (table) => {
  return {
    user_uuid_index: index("user_uuid_index").on(table.user_uuid)
  }
});