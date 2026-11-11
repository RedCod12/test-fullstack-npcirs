import pgPromise from 'pg-promise';

const pgp = pgPromise();
const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is required. Copy server/.env.example to server/.env');

export const db = pgp(url);

export async function verifyDatabase() {
  await db.one('SELECT 1 AS ready');
}
