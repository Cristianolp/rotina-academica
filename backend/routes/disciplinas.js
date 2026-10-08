/**
 * Rotas de disciplinas (tabela disciplinas).
 *   GET  /disciplinas -> disciplinas ativas, em ordem alfabética
 *   POST /disciplinas -> cadastra uma disciplina nova
 */
const express = require("express");
const pool = require("../db");

const router = express.Router();

// Colunas renomeadas para o formato usado no app
const COLUNAS = `
  CAST(id AS CHAR) AS id, nome AS name, professor, horario AS schedule,
  sala AS room, icone AS icon, ativa AS active`;

const ICONES = ["code", "database", "chart", "brain", "cpu", "book"];

/** O MySQL devolve BOOLEAN como 0/1; o app espera true/false */
function formatar(row) {
  return { ...row, active: Boolean(row.active) };
}

/** Confere os campos enviados pelo app. Retorna a mensagem de erro ou null. */
function validar({ name, professor, schedule, room, icon }) {
  if (!name || !String(name).trim()) return "Informe o nome da disciplina.";
  if (!professor || !String(professor).trim()) return "Informe o professor.";
  if (!schedule || !String(schedule).trim()) return "Informe o horário.";
  if (!room || !String(room).trim()) return "Informe a sala.";
  if (icon && !ICONES.includes(icon)) return "Ícone inválido.";
  return null;
}

/** Lista as disciplinas ativas */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT ${COLUNAS} FROM disciplinas WHERE ativa = TRUE ORDER BY nome`,
    );
    res.json(rows.map(formatar));
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar disciplinas" });
  }
});

/** Cadastra uma disciplina (sempre ativa) */
router.post("/", async (req, res) => {
  const mensagem = validar(req.body);
  if (mensagem) return res.status(400).json({ erro: mensagem });

  const { name, professor, schedule, room, icon } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO disciplinas (nome, professor, horario, sala, icone)
       VALUES (?, ?, ?, ?, ?)`,
      [
        String(name).trim(),
        String(professor).trim(),
        String(schedule).trim(),
        String(room).trim(),
        icon || "book",
      ],
    );
    const [rows] = await pool.query(`SELECT ${COLUNAS} FROM disciplinas WHERE id = ?`, [
      result.insertId,
    ]);
    res.status(201).json(formatar(rows[0]));
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao cadastrar disciplina" });
  }
});

module.exports = router;
