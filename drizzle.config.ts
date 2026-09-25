import { defineConfig } from "drizzle-kit"

import dotenv from "dotenv"

dotenv.config()

export default defineConfig({
    schema: "./src/shared/db/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_DB_URL!
    }
})