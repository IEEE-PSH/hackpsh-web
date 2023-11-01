import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

const db = drizzle(pool, { schema: schema });

migrate(db, { migrationsFolder: "src/db/drizzle" })
  .then(async () => {
    console.log("migration success");

    await db
      .insert(schema.app_role)
      .values({ role_name: "participant" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_role)
      .values({ role_name: "officer" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_role)
      .values({ role_name: "admin" })
      .onConflictDoNothing();

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

    await pool.end();
  })
  .catch(async (err) => {
    console.log(err);
    await pool.end();
  });
