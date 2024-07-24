import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// for query purposes
const url = process.env.DATABASE_URL as string;
export const conn = postgres(url);
export const db = drizzle(conn);