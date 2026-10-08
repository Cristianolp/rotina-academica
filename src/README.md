# src — código do app

Todo o código do aplicativo (Expo / React Native) fica aqui.

| Pasta / arquivo | Para que serve |
| --- | --- |
| `app/` | Rotas: os endereços das telas e a navegação (abas e pilhas) |
| `screens/` | As telas do app (o que o usuário vê) |
| `components/` | Peças reutilizadas em várias telas (cards, botões, formulários) |
| `store/` | Estado global: guarda os dados vindos da API |
| `services/` | Comunicação com a API e com a câmera/galeria |
| `utils/` | Funções de ajuda (datas, regras das atividades) |
| `styles/` | Cores, fontes e tamanhos de texto do app inteiro |
| `types.ts` | Formato dos dados (Atividade, Disciplina, Perfil) |

Caminho de um dado: **banco → API (`backend/`) → `services/api.ts` → `store/` → `screens/`**.
