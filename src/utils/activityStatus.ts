/**
 * Regras de exibição das atividades: qual badge mostrar (Urgente, Próxima...),
 * nomes e cores das prioridades e a dica de estudo dos Detalhes.
 */
import { colors } from "@/styles/colors";
import type { Activity, Priority } from "@/types";
import { daysFromToday } from "./date";

type StatusInfo = {
  label: string;
  color: string;
  backgroundColor: string;
  icon: "alert-circle-outline" | "time-outline" | "checkmark-circle-outline" | "ellipse-outline" | "play-circle-outline";
};

/** Situação da atividade para os badges das listas */
export function getStatusInfo(activity: Activity): StatusInfo {
  if (activity.status === "concluida") {
    return {
      label: "Concluída",
      color: colors.green,
      backgroundColor: colors.background.green,
      icon: "checkmark-circle-outline",
    };
  }

  const days = daysFromToday(activity.dueDate);

  if (days < 0) {
    return {
      label: "Atrasada",
      color: colors.red,
      backgroundColor: colors.background.red,
      icon: "alert-circle-outline",
    };
  }
  if (days === 0) {
    return {
      label: "Urgente",
      color: colors.red,
      backgroundColor: colors.background.red,
      icon: "alert-circle-outline",
    };
  }
  if (days <= 2) {
    return {
      label: "Próxima",
      color: colors.orange,
      backgroundColor: colors.background.orange,
      icon: "time-outline",
    };
  }
  if (activity.status === "em_andamento") {
    return {
      label: "Em andamento",
      color: colors.primary,
      backgroundColor: colors.primaryLight,
      icon: "play-circle-outline",
    };
  }
  return {
    label: "Pendente",
    color: colors.text.secondary,
    backgroundColor: colors.background.gray,
    icon: "ellipse-outline",
  };
}

export const priorityLabel: Record<Priority, string> = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

export const priorityColor: Record<Priority, { color: string; backgroundColor: string }> = {
  baixa: { color: colors.green, backgroundColor: colors.background.green },
  media: { color: colors.orange, backgroundColor: colors.background.orange },
  alta: { color: colors.red, backgroundColor: colors.background.red },
};

export const statusLabel: Record<Activity["status"], string> = {
  pendente: "Pendente",
  em_andamento: "Em andamento",
  concluida: "Concluída",
};

/** Escolhe a dica de estudo conforme o prazo e a prioridade */
export function getStudyTip(activity: Activity) {
  if (activity.status === "concluida") {
    return "Atividade entregue! Aproveite para revisar o conteúdo antes da próxima avaliação.";
  }
  const days = daysFromToday(activity.dueDate);
  if (days < 0) {
    return "O prazo já passou. Fale com o professor o quanto antes para verificar se ainda é possível entregar.";
  }
  if (days <= 2) {
    return "O prazo está chegando! Reserve um bloco de tempo hoje para concluir e revisar esta atividade.";
  }
  if (activity.priority === "alta") {
    return "Comece esta atividade com antecedência para evitar atrasos na formatação e na revisão final.";
  }
  return "Divida a atividade em pequenas etapas e distribua ao longo da semana para não acumular.";
}
