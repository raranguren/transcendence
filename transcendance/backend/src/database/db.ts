import SQLite from "better-sqlite3";

const db = new SQLite(process.env.DATABASE_URL ?? "db/default.sqlite");

export { db };
export default db;
