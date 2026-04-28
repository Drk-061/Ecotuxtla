import sql from "mssql";

const config = {
  user: "TU_USUARIO",
  password: "TU_PASSWORD",
  server: "TU_SERVIDOR.somee.com",
  database: "TU_DB",
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

let pool;

export async function getConnection() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}