import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { config } from "dotenv";

config({ path: ".env.local" });

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/drizzle";

const client = postgres(connectionString);

export const db = drizzle(client, { schema });
