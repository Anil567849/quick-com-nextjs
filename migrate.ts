import { conn, db } from "@/lib/db/db"
import { migrate } from "drizzle-orm/postgres-js/migrator"


// it will execute our SQL queries (./drizzle) in the database
(async ()=> {

    await migrate(db, {migrationsFolder: './drizzle'});
    await conn.end();

})()