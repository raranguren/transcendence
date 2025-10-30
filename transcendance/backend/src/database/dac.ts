import SQLite from 'better-sqlite3'
import { health } from './health.ts';

const db = new SQLite('database.db');

const DAC = {
	close: db.close,
	health: async ()=>await health(db),
}

export default DAC;
