import SQLite from "better-sqlite3";

const db = new SQLite(process.env.DATABASE_URL ?? "db/default.sqlite");

db.exec(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL UNIQUE,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		oauth TEXT,
		avatar TEXT,
		victory INTEGER DEFAULT 0,
		defeat INTEGER DEFAULT 0
	)
`);

export { db };
