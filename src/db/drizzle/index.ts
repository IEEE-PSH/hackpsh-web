import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();
//added "||" because eslint flags otherwise
const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString);

export const db = drizzle(client, { schema: schema });
