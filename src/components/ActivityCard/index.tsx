/**
 * ActivityCard — cards de atividade.
 * - ActivityCard: card completo da tela Atividades
 * - UpcomingActivityCard: card compacto de "Próximas atividades" no Início
 * Tocar no card abre os Detalhes.
 */
import { Badge } from "@/components/Badge";
import { disciplineIcons } from "@/components/DisciplineCard";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import type { Activity, Discipline } from "@/types";
import { getStatusInfo } from "@/utils/activityStatus";
import { daysFromToday, formatRelativeDate, formatShortDate } from "@/utils/date";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type ActivityCardProps = {
  activity: Activity;
  discipline?: Discipline;
};

/** Abre a tela de Detalhes da atividade */
function openDetails(id: string) {
  router.push({ pathname: "/details/[id]", params: { id } });
}

/** Card completo usado na tela "Atividades e Prazos" */
export function ActivityCard({ activity, discipline }: ActivityCardProps) {
  const status = getStatusInfo(activity);
  const done = activity.status === "concluida";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => openDetails(activity.id)}
      style={[styles.container, { borderLeftColor: status.color }]}
    >
      <View style={styles.header}>
        <Badge
          text={status.label}
          color={status.color}
          backgroundColor={status.backgroundColor}
          icon={<Ionicons name={status.icon} size={11} color={status.color} />}
        />
        <Text style={styles.date}>
          {formatRelativeDate(done && activity.completedAt ? activity.completedAt : activity.dueDate)}
        </Text>
      </View>

      <Text style={styles.title}>{activity.title}</Text>
      {activity.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {activity.description}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <View style={styles.discipline}>
          {discipline && (
            <MaterialCommunityIcons
              name={disciplineIcons[discipline.icon]}
              size={14}
              color={colors.text.secondary}
            />
          )}
          <Text style={styles.disciplineText} numberOfLines={1}>
            {discipline?.name ?? "Sem disciplina"}
          </Text>
        </View>
        <Text style={[styles.link, done && { color: colors.green }]}>
          {done ? "Entregue" : "Ver detalhes"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/** Card compacto usado em "Próximas atividades" no início */
export function UpcomingActivityCard({ activity, discipline }: ActivityCardProps) {
  const days = daysFromToday(activity.dueDate);
  const soon = days <= 0;
  const label =
    days < 0 ? "Atrasada" : days === 0 ? "Pendente" : days === 1 ? "Amanhã" : `Em ${days} dias`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => openDetails(activity.id)}
      style={styles.upcoming}
    >
      <View style={styles.header}>
        <Badge
          text={label}
          color={soon ? colors.orange : colors.text.secondary}
          backgroundColor={soon ? colors.background.orange : colors.background.gray}
        />
        <Text
          style={[
            styles.date,
            soon && { color: colors.orange, fontFamily: fontFamily.semiBold },
          ]}
        >
          {soon ? formatRelativeDate(activity.dueDate) : formatShortDate(activity.dueDate)}
        </Text>
      </View>
      <Text style={styles.title}>{activity.title}</Text>
      <Text style={styles.disciplineText}>{discipline?.name ?? "Sem disciplina"}</Text>
    </TouchableOpacity>
  );
}
