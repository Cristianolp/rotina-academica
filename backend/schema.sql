-- Banco de dados do app Minha Rotina
-- Executar com: mysql -u root -p < schema.sql
-- ATENÇÃO: apaga e recria o banco minha_rotina do zero.

DROP DATABASE IF EXISTS minha_rotina;
CREATE DATABASE minha_rotina CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE minha_rotina;

CREATE TABLE perfil (
  id INT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  curso VARCHAR(120) NOT NULL,
  semestre VARCHAR(20) NOT NULL,
  foto VARCHAR(255) NULL -- caminho da imagem em backend/uploads (ex.: /uploads/perfil-123.jpg)
);

CREATE TABLE disciplinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  professor VARCHAR(120) NOT NULL,
  horario VARCHAR(60) NOT NULL,
  sala VARCHAR(60) NOT NULL,
  icone ENUM('code', 'database', 'chart', 'brain', 'cpu', 'book') NOT NULL DEFAULT 'book',
  ativa BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE atividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(160) NOT NULL,
  disciplina_id INT NOT NULL,
  data_entrega DATETIME NOT NULL,
  prioridade ENUM('baixa', 'media', 'alta') NOT NULL DEFAULT 'media',
  descricao TEXT,
  status ENUM('pendente', 'em_andamento', 'concluida') NOT NULL DEFAULT 'pendente',
  concluida_em DATETIME NULL,
  criada_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas (id) ON DELETE CASCADE
);

-- Dados iniciais -------------------------------------------------------

INSERT INTO perfil (id, nome, curso, semestre) VALUES
  (1, 'Estudante Universitário', 'Sistemas de Informação', '2º/2026');

INSERT INTO disciplinas (id, nome, professor, horario, sala, icone) VALUES
  (1, 'Banco de Dados II', 'Prof. Roberto Silva', 'Seg / Qua - 10:00', 'Laboratório 401', 'database'),
  (2, 'Probabilidade e Estatística', 'Prof. Maria Costa', 'Ter / Qui - 08:00', 'Sala 205', 'chart'),
  (3, 'Psicologia Aplicada', 'Prof. Carlos Lima', 'Sex - 14:00', 'Auditório 112', 'brain'),
  (4, 'Engenharia de Software', 'Prof. Ana Santos', 'Seg / Qua - 08:00', 'Laboratório 3', 'code'),
  (5, 'Sistemas Operacionais', 'Prof. Carlos Almeida', 'Ter / Qui - 10:00', 'Sala 302, Bloco C', 'cpu'),
  (6, 'Metodologia Científica', 'Profa. Marina Silva', 'Sex - 08:00', 'Sala 108, Bloco B', 'book');

-- As datas são relativas ao dia em que o script é executado
INSERT INTO atividades (titulo, disciplina_id, data_entrega, prioridade, status, concluida_em, descricao) VALUES
  ('Trabalho Prático de SO', 5, TIMESTAMP(CURDATE(), '23:59:00'), 'alta', 'pendente', NULL,
   'Implementar um simulador de escalonamento de processos (FCFS, SJF e Round Robin) e entregar o relatório com os resultados.'),
  ('Seminário de ética', 3, TIMESTAMP(CURDATE(), '23:59:00'), 'alta', 'pendente', NULL,
   'Preparar slides e roteiro para a apresentação final da disciplina de Ética Profissional.'),
  ('Exercícios de probabilidade', 2, TIMESTAMP(CURDATE() + INTERVAL 1 DAY, '10:00:00'), 'media', 'em_andamento', NULL,
   'Lista 4 - Distribuição Normal e Teorema do Limite Central. Entregar em PDF.'),
  ('Modelagem do banco do projeto', 1, TIMESTAMP(CURDATE() + INTERVAL 3 DAY, '23:59:00'), 'media', 'pendente', NULL,
   'Entregar o diagrama entidade-relacionamento e o script de criação das tabelas.'),
  ('Lista de consultas SQL', 1, TIMESTAMP(CURDATE() + INTERVAL 6 DAY, '23:59:00'), 'baixa', 'pendente', NULL,
   'Resolver as 15 consultas com JOIN, GROUP BY e subconsultas.'),
  ('Prova de Banco de Dados II', 1, TIMESTAMP(CURDATE() + INTERVAL 9 DAY, '10:00:00'), 'alta', 'pendente', NULL,
   'Conteúdo: normalização, transações, índices e procedimentos armazenados.'),
  ('Prova de Estatística', 2, TIMESTAMP(CURDATE() + INTERVAL 12 DAY, '08:00:00'), 'alta', 'pendente', NULL,
   'Conteúdo: distribuições discretas e contínuas, intervalos de confiança.'),
  ('Elaboração do Artigo de Metodologia Científica', 6, TIMESTAMP(CURDATE() + INTERVAL 16 DAY, '23:59:00'), 'alta', 'pendente', NULL,
   'O artigo deve conter no mínimo 5 páginas e no máximo 10 páginas, abordando o tema escolhido na aula anterior.\n\nÉ obrigatório o uso das normas ABNT atualizadas (margens, espaçamento, citações diretas e indiretas). A estrutura deve conter:\n\n• Introdução\n• Desenvolvimento Teórico\n• Metodologia Aplicada\n• Considerações Finais\n• Referências (Mínimo de 3 fontes acadêmicas)\n\nO envio deve ser feito exclusivamente em formato PDF através do portal do aluno.'),
  ('Projeto mobile', 4, TIMESTAMP(CURDATE() - INTERVAL 1 DAY, '23:59:00'), 'media', 'concluida', TIMESTAMP(CURDATE() - INTERVAL 1 DAY, '18:00:00'),
   'Implementação da interface principal e integração com API REST.');
