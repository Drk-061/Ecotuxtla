import { getConnection } from "../lib/db";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { nombre, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const pool = await getConnection();

  await pool.request()
    .input("nombre", nombre)
    .input("email", email)
    .input("password", hashed)
    .query(`
      INSERT INTO usuarios (nombre, email, password)
      VALUES (@nombre, @email, @password)
    `);

  res.json({ message: "Usuario registrado" });
}