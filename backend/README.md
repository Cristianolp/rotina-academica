# backend — API e banco de dados

Servidor Node.js + Express que lê e grava no MySQL do XAMPP. O app nunca fala direto com o banco: tudo passa por aqui.

| Arquivo / pasta | Para que serve |
| --- | --- |
| `server.js` | Sobe o servidor na porta 3000 e liga as rotas |
| `db.js` | Conexão com o MySQL (dados do `.env`) |
| `routes/` | As rotas da API, uma por assunto |
| `schema.sql` | Cria o banco `minha_rotina` com tabelas e dados iniciais (**apaga o banco antes**) |
| `uploads/` | Fotos de perfil enviadas pelo app |
| `.env` | Usuário, senha e porta do banco (não vai para o git) |
| `.env.example` | Modelo do `.env` |

Comandos (dentro desta pasta):
- `npm start` — sobe a API
- `npm run dev` — sobe a API e reinicia sozinha ao salvar
- `npm run db:setup` — recria o banco do zero

Ou, na pasta principal do projeto, `npm run dev` sobe a API e o app juntos.
