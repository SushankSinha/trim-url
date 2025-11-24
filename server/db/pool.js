const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create table on startup
pool.query(`
  CREATE TABLE IF NOT EXISTS links (
    id SERIAL PRIMARY KEY,
    code VARCHAR(8) UNIQUE NOT NULL,
    url TEXT NOT NULL,
    clicks INTEGER DEFAULT 0,
    last_clicked TIMESTAMP,
    created_at TIMESTAMP DEFAULT (NOW() AT TIME ZONE 'UTC'),
    CONSTRAINT valid_code CHECK (code ~ '^[A-Za-z0-9]{6,8}$')
  )
`).then(() => console.log("db connected")).catch(err => console.error("Table creation error:", err));

module.exports = pool;