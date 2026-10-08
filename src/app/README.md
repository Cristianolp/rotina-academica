# app — rotas (navegação)

Cada arquivo `.tsx` aqui vira um endereço do app (Expo Router).
Os arquivos de tela têm **uma linha só**, apontando para a tela de verdade em `src/screens/`.

| Arquivo | Endereço | Tela |
| --- | --- | --- |
| `_layout.tsx` | — | Carrega fontes e dados; declara as telas fora das abas |
| `index.tsx` | `/` | Redireciona para o Início |
| `(tabs)/` | — | As 4 abas: Início, Disciplinas, Atividades, Perfil |
| `details/[id].tsx` | `/details/7` | Detalhes da atividade |
| `edit/[id].tsx` | `/edit/7` | Editar atividade |
| `disciplines/new.tsx` | `/disciplines/new` | Nova disciplina |
| `disciplines/[id].tsx` | `/disciplines/3` | Detalhes da disciplina |
| `settings.tsx` | `/settings` | Configurações do perfil |

**Quando mexer aqui:** só para criar uma tela nova ou mudar a navegação.
Para mudar uma tela, vá em `src/screens/`.

> Não crie pastas ou arquivos `.tsx` soltos aqui: cada um vira uma rota.
