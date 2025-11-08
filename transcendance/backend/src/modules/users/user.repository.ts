import type { User } from "./user.entity.ts";
import { db } from "../../database/db.ts";
import { Errors } from "../../utils/errors.utils.ts";

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

function add(user: User): User {
  try {
    const stmt = db.prepare(`
      INSERT INTO users (username, email, password, oauth, avatar)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run([
      user.username,
      user.email,
      user.password,
      user.oauth,
      user.avatar,
    ]);
    return {
      ...user,
      id: Number(result.lastInsertRowid),
      victory: 0,
      defeat: 0,
    };
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      if (e.message.includes("users.username")) {
        throw Error(Errors.USERNAME_IN_USE);
      }
      if (e.message.includes("users.email")) {
        throw Error(Errors.EMAIL_IN_USE);
      }
    }
    console.error("[DAC.users.add]", e);
    throw Error(Errors.DB_ERROR);
  }
}

function getById(id: number): User | null {
  try {
    const stmt = db.prepare(`
      SELECT * FROM users WHERE id = ?
      `);
    const user = stmt.get(id) as User | undefined;
    return user || null;
  } catch (e) {
    console.error("[DAC.users.getById]", e);
    throw Error(Errors.DB_ERROR);
  }
}

function getAll(): User[] {
  try {
    const stmt = db.prepare(`
      SELECT * FROM users
      `);
    return stmt.all() as User[];
  } catch (e) {
    console.error("[DAC.users.getAll]", e);
    throw Error(Errors.DB_ERROR);
  }
}

function getByUsername(username: string): User | null {
  try {
    const stmt = db.prepare(`
		  SELECT * FROM users WHERE username = ?
      `);
    const user = stmt.get(username) as User | undefined;
    return user || null;
  } catch (e) {
    console.error("[DAC.users.getByUsername]", e);
    throw Error(Errors.DB_ERROR);
  }
}

function getByEmail(email: string): User | null {
  try {
    const stmt = db.prepare(`
      SELECT * FROM users WHERE email = ?
      `);
    const user = stmt.get(email) as User | undefined;
    return user || null;
  } catch (e) {
    console.error("[DAC.users.getByEmail]", e);
    throw Error(Errors.DB_ERROR);
  }
}

function update(id: number, updates: Partial<User>): User | null {
  try {
    const before = getById(id);
    if (!before) return null;

    const after = { ...before, ...updates, id };
    const stmt = db.prepare(`
      UPDATE users 
      SET username = ?, email = ?, password = ?, oauth = ?, avatar = ?, victory = ?, defeat = ?
      WHERE id = ?
      `);

    stmt.run([
      after.username,
      after.email,
      after.password,
      after.oauth,
      after.avatar,
      after.victory,
      after.defeat,
      id,
    ]);

    return after;
  } catch (e) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      if (e.message.includes("users.username")) {
        throw Error(Errors.USERNAME_IN_USE);
      }
      if (e.message.includes("users.email")) {
        throw Error(Errors.EMAIL_IN_USE);
      }
    }
    console.error("[DAC.users.update]", e);
    throw Error(Errors.DB_ERROR);
  }
}

function erase(id: number): boolean {
  try {
    const stmt = db.prepare(`
      DELETE FROM users WHERE id = ?
      `);
    const result = stmt.run(id);
    return result.changes > 0;
  } catch (e) {
    console.error("[DAC.users.erase]", e);
    throw Error(Errors.DB_ERROR);
  }
}

export default {
  add,
  getById,
  getByUsername,
  getByEmail,
  getAll,
  update,
  erase,
};
export type { User };