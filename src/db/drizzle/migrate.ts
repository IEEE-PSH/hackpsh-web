import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";
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

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

const db = drizzle(pool, { schema: schema });

migrate(db, { migrationsFolder: "src/db/drizzle" })
  .then(async () => {
    console.log("migration success");

    dbRole.forEach((role_name) => insertRole(db, role_name));

    dbOnboardingPhases.forEach((phase_name) =>
      insertOnboardingPhases(db, phase_name),
    );

    dbSchoolYear.forEach((school_year_name) =>
      insertSchoolYear(db, school_year_name),
    );

    dbMajors.forEach((major_name) => insertMajor(db, major_name));

    await pool.end();
  })
  .catch(async (err) => {
    console.log(err);
    await pool.end();
  });
