import { getConnection } from "../lib/db";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  const pool = await getConnection();

  const result = await pool.request()
    .input("email", email)
    .query("SELECT * FROM usuarios WHERE email = @email");

  if (result.recordset.length === 0) {
    return res.status(400).json({ message: "Usuario no existe" });
  }

  const user = result.recordset[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  res.json({ userId: user.id, nombre: user.nombre });
}