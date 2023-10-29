import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);

const db = drizzle(client, { schema: schema });

migrate(db, { migrationsFolder: "src/db/drizzle" })
  .then(async () => {
    console.log("migration success");

    await db
      .insert(schema.app_school_year)
      .values({ school_year_name: "middle_school" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_school_year)
      .values({ school_year_name: "high_school" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_school_year)
      .values({ school_year_name: "freshman" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_school_year)
      .values({ school_year_name: "sophmore" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_school_year)
      .values({ school_year_name: "junior" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_school_year)
      .values({ school_year_name: "senior" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_school_year)
      .values({ school_year_name: "graduate" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_school_year)
      .values({ school_year_name: "post_graduate" })
      .onConflictDoNothing();

    await client.end({ timeout: 5000 });
  })
  .catch(async (err) => {
    console.log(err);
    await client.end({ timeout: 5000 });
  });
