import sql from "mssql";

const config = {
  user: "Ser_Cs616_SQLLogin_1",
  password: "hzzvsvuqyj",
  server: "ECOTUXT.mssql.somee.com",
  database: "ECOTUXT",
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
