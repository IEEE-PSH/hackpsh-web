import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import {
  dbMajors,
  dbOnboardingPhases,
  dbRole,
  dbSchoolYear,
  insertEventDetails,
  insertMajor,
  insertOnboardingPhases,
  insertRole,
  insertSchoolYear,
} from "./startup_seed";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});
const db = drizzle(pool, { schema: schema });

const runMigrations = async () => {
  try {
    await migrate(db, { migrationsFolder: "src/db/drizzle" });

    for (const role_name of dbRole) {
      await insertRole(db, role_name);
    }

    for (const phase_name of dbOnboardingPhases) {
      await insertOnboardingPhases(db, phase_name);
    }

    for (const school_year_name of dbSchoolYear) {
      await insertSchoolYear(db, school_year_name);
    }

    for (const major_name of dbMajors) {
      await insertMajor(db, major_name);
    }

    //set default dates
    await insertEventDetails(db);
    console.log("migration success");
  } catch (error) {
    console.log(error);
  }
};

void runMigrations();
