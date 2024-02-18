import { type Database } from "@/db/drizzle";
import { app_contact } from "@/db/drizzle/schema";
import { TRPCError } from "@trpc/server";

export async function createContactPost(
  db: Database,
  first_name: string,
  last_name: string,
  email: string,
  content: string,
) {
  try {
    await db.insert(app_contact).values({
      contact_first_name: first_name,
      contact_last_name: last_name,
      contact_email: email,
      contact_content: content,
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      message: "The database has encountered some issues.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
