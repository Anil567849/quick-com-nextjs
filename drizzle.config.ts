import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/lib/db/schema.ts', // name of schema
    out: './drizzle', // where migration will be | it will generate all SQL queries here
    dialect: 'postgresql', // name of the database
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
});