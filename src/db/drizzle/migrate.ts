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
      .values({ school_year_name: "not_applicable" })
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

    await db
      .insert(schema.app_major)
      .values({ major_name: "not_applicable" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "undecided" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "accounting" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "american_studies" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "biobehavioral_health" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "biology" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "civil_engineering" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "communication_sciences_and_disorders" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "communications" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "computer_science" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "criminal_justice" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "cybersecurity_analytics_and_operations" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "electrical_engineering" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "electrical_engineering_technology" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "elementary_education" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "english" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "enterprise_technology_integration" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "finance" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "health_policy_and_administration" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "human_capital_management" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "human_development_and_family_studies" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "human_centered_design_and_development" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "humanities" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "information_sciences_and_technology" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "information_systems" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "kinesiology" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "management" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "marketing" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "mathematical_sciences" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "mechanical_engineering" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "mechanical_engineering_technology" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "nursing" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "political_science" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "project_and_supply_chain_management" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "psychology" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "public_policy" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "science" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "secondary_education_english" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "secondary_education_mathematics" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "secondary_education_social_studies" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "security_and_risk_analysis" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({ major_name: "sociology" })
      .onConflictDoNothing();
    await db
      .insert(schema.app_major)
      .values({
        major_name: "structural_design_and_construction_engineering_technology",
      })
      .onConflictDoNothing();

    await pool.end();
  })
  .catch(async (err) => {
    console.log(err);
    await pool.end();
  });
