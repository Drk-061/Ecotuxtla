import { getConnection } from "../lib/db";

export default async function handler(req, res) {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT TOP 10 nombre, puntos
    FROM usuarios
    ORDER BY puntos DESC
  `);

  res.json(result.recordset);
}