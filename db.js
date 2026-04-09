import { Pool } from 'pg';

// Debug útil
console.log("DB ENV:", {
    VERCEL: !!process.env.VERCEL,
    DATABASE_URL: process.env.DATABASE_URL ? "OK" : "NO"
});
// Configuración del pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    // SSL solo en producción (Vercel / Supabase)
    ssl: process.env.VERCEL
        ? { rejectUnauthorized: false }
        : false
});

// Exportaciones
export const query = (text, params) => pool.query(text, params);
export default pool;