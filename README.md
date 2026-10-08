# Minha Rotina

App de rotina acadêmica feito com Expo (React Native) e uma API em Node.js/Express com MySQL.

## Estrutura

Cada arquivo começa com um comentário dizendo o que ele faz.

```
src/
  app/            rotas (Expo Router) — cada arquivo só aponta para uma tela
  screens/        telas: uma pasta por tela, com index.tsx + styles.ts
    Home/  Disciplines/  DisciplineDetails/  NewDiscipline/
    Activities/  NewActivity/  ActivityDetails/  EditActivity/
    Profile/  Settings/
  components/     componentes reutilizáveis: index.tsx + styles.ts
  store/          estado global (AppStore) que conversa com a API
  services/       chamadas HTTP para a API
  utils/          funções de data e regras de status das atividades
  styles/         cores, fontes e tamanhos de texto
  types.ts        formato dos dados

backend/
  server.js       sobe o servidor e liga as rotas
  db.js           conexão com o MySQL
  routes/         perfil.js, disciplinas.js, atividades.js
  schema.sql      cria o banco e os dados iniciais
```

**Onde mexer:** visual de uma tela → `src/screens/<Tela>/styles.ts`;
comportamento → `src/screens/<Tela>/index.tsx`; regra da API → `backend/routes/`.

## Rodar no dia a dia

Com o MySQL ligado no XAMPP, na pasta principal do projeto:

```bash
npm run dev
```

Esse comando sobe a API e o Expo juntos (as mensagens da API aparecem com `[api]`).
`Ctrl+C` fecha os dois. As seções abaixo explicam a primeira instalação e cada parte separada.

## 1. Banco de dados

Funciona com o MySQL do **XAMPP** (MariaDB) ou com o MySQL 8.

**XAMPP:** abra o XAMPP Control Panel, clique em **Start** no MySQL e rode:

```bash
cd backend
C:\xampp\mysql\bin\mysql.exe -u root --default-character-set=utf8mb4 < schema.sql
```

Também dá para importar o `schema.sql` pelo phpMyAdmin (aba **Importar**).

> O script apaga e recria o banco `minha_rotina`.
> Não deixe o serviço MySQL80 do Windows ligado junto com o XAMPP: os dois usam a porta 3306.

## 2. API

```bash
cd backend
npm install
cp .env.example .env   # e preencha DB_PASSWORD com a senha do seu MySQL
npm start              # ou: npm run dev (reinicia ao salvar)
```

A API sobe em `http://localhost:3000`.

| Método | Rota                      | Descrição                          |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/perfil`                 | Dados do estudante                 |
| PUT    | `/perfil`                 | Atualiza nome, curso e semestre    |
| PUT    | `/perfil/foto`            | Envia a foto de perfil (base64), salva em `backend/uploads/` |
| DELETE | `/perfil/foto`            | Remove a foto de perfil            |
| GET    | `/disciplinas`            | Disciplinas ativas                 |
| POST   | `/disciplinas`            | Cadastra uma disciplina            |
| GET    | `/atividades`             | Todas as atividades                |
| GET    | `/atividades/:id`         | Uma atividade                      |
| POST   | `/atividades`             | Cria atividade                     |
| PUT    | `/atividades/:id`         | Edita atividade                    |
| PATCH  | `/atividades/:id/status`  | Muda status (pendente, em_andamento, concluida) |
| DELETE | `/atividades/:id`         | Exclui atividade                   |

## 3. App

Em outro terminal, na raiz do projeto:

```bash
npm install
npx expo start
```

O app encontra a API sozinho usando o IP do computador que roda o `expo start`
(porta 3000). Para isso o celular precisa estar **na mesma rede Wi-Fi** do computador,
e o firewall do Windows precisa liberar o Node na porta 3000.

Para usar outro endereço, crie um `.env` na raiz do app:

```
EXPO_PUBLIC_API_URL=http://192.168.0.10:3000
```
