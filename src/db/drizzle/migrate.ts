import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

async function runMigration() {
  await migrate(db, { migrationsFolder: "src/db/drizzle" });
  console.log("migration is a success");
}

runMigration().catch((err) => {
  console.log(err);
});
