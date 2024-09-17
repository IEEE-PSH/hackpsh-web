import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/drizzle/schema.ts",
  out: "./src/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
