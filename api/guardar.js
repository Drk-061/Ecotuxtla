import { getConnection } from "../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { usuario_id, puntos } = req.body;
  const pool = await getConnection();

  await pool.request()
    .input("usuario_id", usuario_id)
    .input("puntos", puntos)
    .query(`
      INSERT INTO resultados_quiz (usuario_id, puntaje)
      VALUES (@usuario_id, @puntos)
    `);

  await pool.request()
    .input("puntos", puntos)
    .input("id", usuario_id)
    .query(`
      UPDATE usuarios
      SET puntos = puntos + @puntos
      WHERE id = @id
    `);

  await pool.request()
    .input("id", usuario_id)
    .query(`
      UPDATE usuarios
      SET racha = CASE
        WHEN DATEDIFF(DAY, ultimo_login, GETDATE()) = 1 THEN racha + 1
        WHEN DATEDIFF(DAY, ultimo_login, GETDATE()) > 1 THEN 1
        ELSE racha
      END,
      ultimo_login = GETDATE()
      WHERE id = @id
    `);

  res.json({ message: "OK" });
}