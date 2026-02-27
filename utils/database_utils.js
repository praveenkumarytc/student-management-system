const mysql = require('mysql2');

// Production (Vercel/Railway): always use DATABASE_URL / Railway vars (never localhost)
// Local dev: set USE_LOCAL_DB=1 to use local MySQL (docker compose) and avoid Railway IP restrictions
const isProduction = process.env.NODE_ENV === 'production';
const useLocalDb = process.env.USE_LOCAL_DB === '1' && !isProduction;

const defaultLocalUrl = 'mysql://root:localdev@127.0.0.1:3307/railway';
const databaseUrl = useLocalDb
  ? (process.env.LOCAL_DATABASE_URL || defaultLocalUrl)
  : (process.env.DATABASE_URL || process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL);

if (!databaseUrl) {
  throw new Error(
    'Missing database URL. Set DATABASE_URL (or MYSQL_PUBLIC_URL / MYSQL_URL). For local dev use USE_LOCAL_DB=1.'
  );
}

const pool = mysql.createPool({
  uri: databaseUrl,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();