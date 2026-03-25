import Database from 'better-sqlite3';

const dbPath = 'c:/Users/galos/.gemini/antigravity/scratch/buzzmarketing-web/backend/.tmp/data.db';

try {
  const db = new Database(dbPath, { verbose: console.log });
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log("Tables:", tables.map(t => t.name).join(', '));
  db.close();
} catch (error) {
  console.error("Error:", error);
}
