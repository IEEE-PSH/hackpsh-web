import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

//run this script with >ts-node src/db/drizzle/migrate.ts
async function runMigration() {
  await migrate(db, { migrationsFolder: "src/db/drizzle" });
  console.log("migration is a success");
}

runMigration().catch((err) => {
  console.log(err);
});
