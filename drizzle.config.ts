import "dotenv/config";
import type { Config } from "drizzle-kit";
 
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default {
  schema: "./src/db/drizzle/schema.ts",
  out: "./src/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  }
} satisfies Config;