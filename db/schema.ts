import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core"

export const users = pgTable('profiles', {
  user_id: serial('id').primaryKey(),
  username: text('username'),
  onboardingComplete: boolean('onboardingComplete'),
  fullName: text('fullname')
});