import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres"
import { schema } from "../shared/db/schema.js"

export const drizzleClient: NodePgDatabase<typeof schema> = drizzle({
    connection: {
        connectionString: encodeURI(process.env.POSTGRES_DB_URL!),
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 3000,
    },
    schema: schema
})