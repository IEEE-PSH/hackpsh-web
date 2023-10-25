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
    await client.end({ timeout: 5000 });
  })
  .catch(async (err) => {
    console.log(err);
    await client.end({ timeout: 5000 });
  });
