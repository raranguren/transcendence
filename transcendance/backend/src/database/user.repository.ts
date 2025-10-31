import type { User } from "../modules/users/user.entity.ts";
import { db } from "./init.ts";

function add(user: User): User {
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
}

function getById(id: number): User | null {
  const stmt = db.prepare(`
		SELECT * FROM users WHERE id = ?
    `);
  const user = stmt.get(id) as User | undefined;
  return user || null;
}

function getAll(): User[] {
  const stmt = db.prepare(`
		SELECT * FROM users
    `);
  return stmt.all() as User[];
}

function getByUsername(username: string): User | null {
  const stmt = db.prepare(`
		SELECT * FROM users WHERE username = ?
    `);
  const user = stmt.get(username) as User | undefined;
  return user || null;
}

function getByEmail(email: string): User | null {
  const stmt = db.prepare(`
		SELECT * FROM users WHERE email = ?
    `);
  const user = stmt.get(email) as User | undefined;
  return user || null;
}

function update(id: number, updates: Partial<Omit<User, "id">>): User | null {
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
}

function erase(id: number): boolean {
  const stmt = db.prepare(`
		DELETE FROM users WHERE id = ?
    `);
  const result = stmt.run(id);
  return result.changes > 0;
}

export default {add, getById, getByUsername, getByEmail, getAll, update, erase}
export type { User }
