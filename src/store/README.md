# store — estado global

| Arquivo | Para que serve |
| --- | --- |
| `AppStore.tsx` | Guarda perfil, disciplinas e atividades vindos da API e tem as funções que as telas usam para criar, editar, concluir e excluir |

As telas pegam tudo com `useAppStore()`. Ao abrir o app, o AppStore busca os dados na API;
quando algo é salvo, ele chama a API e atualiza a tela com a resposta.

**Quando mexer aqui:** para criar uma ação nova (ex.: excluir disciplina) ou um cálculo usado em várias telas.
