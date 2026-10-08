/**
 * Servidor da API do Minha Rotina.
 * Só configura o Express e liga cada grupo de rotas ao seu arquivo em routes/.
 * Iniciar com: npm start
 */
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
// Limite maior porque a foto de perfil chega em base64 no corpo da requisição
app.use(express.json({ limit: "10mb" }));

// Fotos enviadas pelo app (ex.: /uploads/perfil-123.jpg)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/perfil", require("./routes/perfil"));
app.use("/disciplinas", require("./routes/disciplinas"));
app.use("/atividades", require("./routes/atividades"));

// Qualquer rota que não existe
app.use((req, res) => res.status(404).json({ erro: "Rota não encontrada." }));

// Corpo inválido (ex.: foto maior que o limite ou JSON quebrado)
app.use((erro, req, res, next) => {
  if (erro.type === "entity.too.large") {
    return res.status(413).json({ erro: "A imagem é muito grande." });
  }
  console.error(erro);
  res.status(400).json({ erro: "Requisição inválida." });
});

const PORT = Number(process.env.PORT) || 3000;

// 0.0.0.0 para o celular conseguir acessar pela rede local
app.listen(PORT, "0.0.0.0", () => console.log(`API rodando na porta ${PORT}`));
