const mysql = require('mysql2');

// Local dev: set USE_LOCAL_DB=1 to use local MySQL (e.g. docker compose) and avoid Railway IP restrictions
const defaultLocalUrl = 'mysql://root:localdev@127.0.0.1:3307/railway';
const databaseUrl = process.env.USE_LOCAL_DB === '1'
  ? (process.env.LOCAL_DATABASE_URL || defaultLocalUrl)
  : (process.env.DATABASE_URL || process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL);

if (!databaseUrl) {
  throw new Error(
    'Missing database URL. Set DATABASE_URL, MYSQL_PUBLIC_URL, or MYSQL_URL in .env (or USE_LOCAL_DB=1 for local MySQL)'
  );
}

const pool = mysql.createPool({
  uri: databaseUrl,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();