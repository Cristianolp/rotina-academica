# routes — rotas da API

Um arquivo por assunto. Cada rota valida os dados, consulta o banco e devolve JSON.

| Arquivo | Rotas |
| --- | --- |
| `perfil.js` | `GET/PUT /perfil`, `PUT/DELETE /perfil/foto` |
| `disciplinas.js` | `GET /disciplinas`, `POST /disciplinas` |
| `atividades.js` | `GET/POST /atividades`, `GET/PUT/DELETE /atividades/:id`, `PATCH /atividades/:id/status` |

**Quando mexer aqui:** para mudar uma regra (validação, mensagem de erro) ou criar uma rota nova.
Depois de criar uma rota, adicione a chamada correspondente em `src/services/api.ts`.
