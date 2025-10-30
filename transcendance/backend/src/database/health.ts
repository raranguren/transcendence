import SQLite from 'better-sqlite3'

// Test database connection
export async function health(db: SQLite.Database) {
	try {
		db.prepare('SELECT 1').get();
		return {
			status: 'ok',
			timestamp: new Date().toISOString(),
			database: 'connected',
			uptime: process.uptime(),
		};
	} catch (error) {
		return {
			status: 'error',
			timestamp: new Date().toISOString(),
			database: 'disconnected',
			error: error instanceof Error ? error.message : 'Unknown error',
			uptime: process.uptime(),
		};
	}
}
