/**
 * Tipos — formato dos dados usados no app (iguais aos que a API devolve).
 */
export type Priority = "baixa" | "media" | "alta";

export type ActivityStatus = "pendente" | "em_andamento" | "concluida";

export type DisciplineIcon = "code" | "database" | "chart" | "brain" | "cpu" | "book";

export type Discipline = {
  id: string;
  name: string;
  professor: string;
  schedule: string;
  room: string;
  icon: DisciplineIcon;
  active: boolean;
};

export type Activity = {
  id: string;
  title: string;
  disciplineId: string;
  dueDate: string; // ISO
  priority: Priority;
  description: string;
  status: ActivityStatus;
  completedAt?: string;
};

export type Profile = {
  name: string;
  course: string;
  semester: string;
  /** Caminho da foto na API (ex.: /uploads/perfil-123.jpg) ou null */
  photo?: string | null;
};
