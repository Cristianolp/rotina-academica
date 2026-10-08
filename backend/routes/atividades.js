/**
 * Rotas de atividades (tabela atividades).
 *   GET    /atividades             -> todas, ordenadas pela entrega
 *   GET    /atividades/:id         -> uma atividade
 *   POST   /atividades             -> cria
 *   PUT    /atividades/:id         -> edita
 *   PATCH  /atividades/:id/status  -> muda o status
 *   DELETE /atividades/:id         -> exclui
 */
const express = require("express");
const pool = require("../db");

const router = express.Router();

// Colunas renomeadas para o formato usado no app
const COLUNAS = `
  CAST(id AS CHAR) AS id, titulo AS title, CAST(disciplina_id AS CHAR) AS disciplineId,
  data_entrega AS dueDate, prioridade AS priority, COALESCE(descricao, '') AS description,
  status, concluida_em AS completedAt`;

const PRIORIDADES = ["baixa", "media", "alta"];
const STATUS = ["pendente", "em_andamento", "concluida"];

/** Remove o campo completedAt quando a atividade não foi concluída */
function formatar(row) {
  const atividade = { ...row };
  if (!atividade.completedAt) delete atividade.completedAt;
  return atividade;
}

/** Busca uma atividade pelo id (ou null se não existir) */
async function buscarPorId(id) {
  const [rows] = await pool.query(`SELECT ${COLUNAS} FROM atividades WHERE id = ?`, [id]);
  return rows[0] ? formatar(rows[0]) : null;
}

/** Confere os campos enviados pelo app. Retorna a mensagem de erro ou null. */
function validar({ title, disciplineId, dueDate, priority }) {
  if (!title || !String(title).trim()) return "Informe o título da atividade.";
  if (!disciplineId) return "Selecione uma disciplina.";
  if (!dueDate || Number.isNaN(new Date(dueDate).getTime())) {
    return "Data de entrega inválida.";
  }
  if (!PRIORIDADES.includes(priority)) return "Prioridade inválida.";
  return null;
}

/** Erro do MySQL quando o disciplina_id não existe na tabela disciplinas */
function disciplinaInexistente(erro) {
  return erro.code === "ER_NO_REFERENCED_ROW_2";
}

/** Lista todas as atividades */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT ${COLUNAS} FROM atividades ORDER BY data_entrega`);
    res.json(rows.map(formatar));
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar atividades" });
  }
});

/** Busca uma atividade */
router.get("/:id", async (req, res) => {
  try {
    const atividade = await buscarPorId(req.params.id);
    if (!atividade) return res.status(404).json({ erro: "Atividade não encontrada." });
    res.json(atividade);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar atividade" });
  }
});

/** Cria uma atividade (sempre começa como pendente) */
router.post("/", async (req, res) => {
  const mensagem = validar(req.body);
  if (mensagem) return res.status(400).json({ erro: mensagem });

  const { title, disciplineId, dueDate, priority, description } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO atividades (titulo, disciplina_id, data_entrega, prioridade, descricao)
       VALUES (?, ?, ?, ?, ?)`,
      [String(title).trim(), disciplineId, new Date(dueDate), priority, description ?? ""],
    );
    res.status(201).json(await buscarPorId(result.insertId));
  } catch (erro) {
    if (disciplinaInexistente(erro)) {
      return res.status(400).json({ erro: "Disciplina não encontrada." });
    }
    console.error(erro);
    res.status(500).json({ erro: "Erro ao criar atividade" });
  }
});

/** Edita título, disciplina, entrega, prioridade e descrição */
router.put("/:id", async (req, res) => {
  const mensagem = validar(req.body);
  if (mensagem) return res.status(400).json({ erro: mensagem });

  const { title, disciplineId, dueDate, priority, description } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE atividades
       SET titulo = ?, disciplina_id = ?, data_entrega = ?, prioridade = ?, descricao = ?
       WHERE id = ?`,
      [String(title).trim(), disciplineId, new Date(dueDate), priority, description ?? "", req.params.id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Atividade não encontrada." });
    }
    res.json(await buscarPorId(req.params.id));
  } catch (erro) {
    if (disciplinaInexistente(erro)) {
      return res.status(400).json({ erro: "Disciplina não encontrada." });
    }
    console.error(erro);
    res.status(500).json({ erro: "Erro ao editar atividade" });
  }
});

/** Muda o status; ao concluir, registra a data de conclusão */
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  if (!STATUS.includes(status)) {
    return res.status(400).json({ erro: "Status inválido." });
  }

  try {
    const [result] = await pool.query(
      "UPDATE atividades SET status = ?, concluida_em = ? WHERE id = ?",
      [status, status === "concluida" ? new Date() : null, req.params.id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Atividade não encontrada." });
    }
    res.json(await buscarPorId(req.params.id));
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar status" });
  }
});

/** Exclui uma atividade */
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM atividades WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Atividade não encontrada." });
    }
    res.status(204).end();
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao excluir atividade" });
  }
});

module.exports = router;
