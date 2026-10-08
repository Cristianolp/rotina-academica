/**
 * Rotas do perfil do estudante (tabela perfil, sempre o registro id = 1).
 *   GET    /perfil       -> dados do estudante (com o caminho da foto)
 *   PUT    /perfil       -> atualiza nome, curso e semestre
 *   PUT    /perfil/foto  -> recebe uma foto em base64 e salva em uploads/
 *   DELETE /perfil/foto  -> remove a foto
 */
const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const pool = require("../db");

const router = express.Router();

const PASTA_UPLOADS = path.join(__dirname, "..", "uploads");

const EXTENSOES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
};

/** Busca o perfil no formato usado no app */
async function buscarPerfil() {
  const [rows] = await pool.query(
    "SELECT nome AS name, curso AS course, semestre AS semester, foto AS photo FROM perfil WHERE id = 1",
  );
  return rows[0] ?? null;
}

/** Apaga o arquivo da foto antiga (se existir) */
async function apagarFoto(caminho) {
  if (!caminho) return;
  const arquivo = path.join(PASTA_UPLOADS, path.basename(caminho));
  await fs.rm(arquivo, { force: true });
}

/** Busca os dados do estudante */
router.get("/", async (req, res) => {
  try {
    res.json(await buscarPerfil());
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar perfil" });
  }
});

/** Atualiza nome, curso e semestre (cria o registro se não existir) */
router.put("/", async (req, res) => {
  const { name, course, semester } = req.body;
  if (!name || !course || !semester) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  try {
    await pool.query(
      `INSERT INTO perfil (id, nome, curso, semestre) VALUES (1, ?, ?, ?)
       ON DUPLICATE KEY UPDATE nome = VALUES(nome), curso = VALUES(curso), semestre = VALUES(semestre)`,
      [name, course, semester],
    );
    res.json(await buscarPerfil());
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao salvar perfil" });
  }
});

/** Salva a nova foto de perfil e apaga a anterior */
router.put("/foto", async (req, res) => {
  const { base64, mimeType } = req.body;
  const extensao = EXTENSOES[mimeType];
  if (!base64 || !extensao) {
    return res.status(400).json({ erro: "Envie uma imagem JPG, PNG, WEBP ou HEIC." });
  }

  try {
    const atual = await buscarPerfil();
    if (!atual) return res.status(404).json({ erro: "Perfil não encontrado." });

    // Nome com data/hora para o app não mostrar a foto antiga em cache
    const nomeArquivo = `perfil-${Date.now()}.${extensao}`;
    await fs.mkdir(PASTA_UPLOADS, { recursive: true });
    await fs.writeFile(path.join(PASTA_UPLOADS, nomeArquivo), Buffer.from(base64, "base64"));

    await pool.query("UPDATE perfil SET foto = ? WHERE id = 1", [`/uploads/${nomeArquivo}`]);
    await apagarFoto(atual.photo);
    res.json(await buscarPerfil());
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao salvar foto" });
  }
});

/** Remove a foto de perfil */
router.delete("/foto", async (req, res) => {
  try {
    const atual = await buscarPerfil();
    await pool.query("UPDATE perfil SET foto = NULL WHERE id = 1");
    await apagarFoto(atual?.photo);
    res.json(await buscarPerfil());
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao remover foto" });
  }
});

module.exports = router;
