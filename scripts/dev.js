/**
 * npm run dev — sobe a API (backend/) e o app (Expo) com um comando só.
 *
 * - A API roda em segundo plano com `npm run dev` (reinicia sozinha ao salvar);
 *   as mensagens dela aparecem com o prefixo [api].
 * - O Expo roda na frente, com o QR code e os atalhos de teclado normais.
 * - Ctrl+C (ou fechar o Expo) encerra os dois.
 *
 * O MySQL do XAMPP precisa estar ligado antes.
 */
const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const backend = path.join(root, "backend");
const isWindows = process.platform === "win32";

/** Instala as dependências do backend na primeira vez */
function installBackendIfNeeded() {
  if (fs.existsSync(path.join(backend, "node_modules"))) return;
  console.log("[api] Instalando dependências do backend...");
  spawnSync("npm install", { cwd: backend, stdio: "inherit", shell: true });
}

/** Mostra cada linha da API com o prefixo [api] e dá dicas para erros comuns */
function printApiOutput(data) {
  const text = data.toString();
  for (const line of text.split(/\r?\n/)) {
    if (line.trim()) console.log(`[api] ${line}`);
  }
  if (text.includes("EADDRINUSE")) {
    console.log("[api] A porta 3000 já está em uso: feche o outro terminal com a API rodando.");
  }
}

/** Encerra a API (no Windows, junto com os processos filhos) */
function stopApi(api) {
  if (api.exitCode !== null) return;
  if (isWindows) {
    spawnSync("taskkill", ["/pid", String(api.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    api.kill("SIGTERM");
  }
}

installBackendIfNeeded();

const api = spawn("npm run dev", { cwd: backend, shell: true });
api.stdout.on("data", printApiOutput);
api.stderr.on("data", printApiOutput);
api.on("exit", (code) => {
  if (code) console.log(`[api] A API parou (código ${code}). O app vai mostrar erro de conexão.`);
});

const app = spawn("npx expo start", { cwd: root, stdio: "inherit", shell: true });
app.on("exit", (code) => {
  stopApi(api);
  process.exit(code ?? 0);
});

// Ctrl+C: o Expo recebe o sinal e fecha; aqui só garantimos que a API fecha junto
process.on("SIGINT", () => stopApi(api));
