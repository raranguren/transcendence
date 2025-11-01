import { db } from "./init.ts";

// Test database connection
export function health() {
  try {
    db.prepare("SELECT 1").get();
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
      bells: Math.round(process.uptime()),
    };
  } catch (error) {
    return {
      status: "error",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      bells: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
