/**
 * Conexão com o MySQL.
 * Os dados de acesso vêm do arquivo .env (veja .env.example).
 */
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "minha_rotina",
});

module.exports = pool;
