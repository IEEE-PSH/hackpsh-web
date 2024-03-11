import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import {
  dbMajors,
  dbOnboardingPhases,
  dbRole,
  dbSchoolYear,
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

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "src/db/drizzle" });
    dbRole.forEach(async (role_name) => insertRole(db, role_name));

    dbOnboardingPhases.forEach(
      async (phase_name) => await insertOnboardingPhases(db, phase_name),
    );

    dbSchoolYear.forEach(
      async (school_year_name) => await insertSchoolYear(db, school_year_name),
    );

    dbMajors.forEach(async (major_name) => await insertMajor(db, major_name));

    console.log("migration success");
  } catch (error) {
    console.log(error);
  }

  return;
};

void main();
