/**
 * Rotas de disciplinas (tabela disciplinas).
 *   GET /disciplinas -> disciplinas ativas, em ordem alfabética
 */
const express = require("express");
const pool = require("../db");

const router = express.Router();

/** Lista as disciplinas ativas */
router.get("/", async (req, res) => {
  try {
    // Renomeia as colunas para o formato usado no app
    const [rows] = await pool.query(
      `SELECT CAST(id AS CHAR) AS id, nome AS name, professor, horario AS schedule,
              sala AS room, icone AS icon, ativa AS active
       FROM disciplinas
       WHERE ativa = TRUE
       ORDER BY nome`,
    );
    // O MySQL devolve BOOLEAN como 0/1
    res.json(rows.map((row) => ({ ...row, active: Boolean(row.active) })));
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar disciplinas" });
  }
});

module.exports = router;
