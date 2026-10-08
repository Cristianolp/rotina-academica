/**
 * DisciplineCard — cards de disciplina.
 * - DisciplineCard: card completo da tela Disciplinas (com pendências)
 * - DisciplineSummaryCard: card compacto de "Disciplinas do semestre" no Início
 * - disciplineIcons: ícone de cada tipo de disciplina
 * Tocar no card abre os detalhes da disciplina.
 */
import { Badge } from "@/components/Badge";
import { colors } from "@/styles/colors";
import type { Discipline, DisciplineIcon } from "@/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export const disciplineIcons: Record<
  DisciplineIcon,
  ComponentProps<typeof MaterialCommunityIcons>["name"]
> = {
  code: "code-tags",
  database: "database-outline",
  chart: "chart-bell-curve",
  brain: "brain",
  cpu: "memory",
  book: "book-open-variant",
};

type DisciplineCardProps = {
  discipline: Discipline;
  pendingCount: number;
};

/** Abre a tela de detalhes da disciplina */
function openDiscipline(id: string) {
  router.push({ pathname: "/disciplines/[id]", params: { id } });
}

/** Card completo usado na tela "Minhas Disciplinas" */
export function DisciplineCard({ discipline, pendingCount }: DisciplineCardProps) {
  const upToDate = pendingCount === 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => openDiscipline(discipline.id)}
      style={[
        styles.container,
        { borderLeftColor: upToDate ? colors.green : colors.primary },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{discipline.name}</Text>
        {upToDate ? (
          <Badge
            text="Em dia"
            color={colors.green}
            backgroundColor={colors.background.green}
          />
        ) : (
          <Badge
            text={`${pendingCount} ${pendingCount === 1 ? "Pendente" : "Pendentes"}`}
            color={colors.red}
            backgroundColor={colors.background.red}
          />
        )}
      </View>

      <View style={styles.professorRow}>
        <Ionicons name="person-outline" size={12} color={colors.text.secondary} />
        <Text style={styles.professor}>{discipline.professor}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.info}>
          <View style={styles.infoIcon}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValue}>{discipline.schedule}</Text>
          </View>
        </View>

        <View style={styles.info}>
          <View style={styles.infoIcon}>
            <MaterialCommunityIcons
              name="office-building-outline"
              size={16}
              color={colors.primary}
            />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.infoLabel}>Sala</Text>
            <Text style={styles.infoValue}>{discipline.room}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/** Card compacto usado em "Disciplinas do semestre" no início */
export function DisciplineSummaryCard({ discipline }: { discipline: Discipline }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => openDiscipline(discipline.id)}
      style={[styles.container, { borderLeftColor: colors.primary }]}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{discipline.name}</Text>
        <MaterialCommunityIcons
          name={disciplineIcons[discipline.icon]}
          size={20}
          color={colors.text.secondary}
        />
      </View>

      <View style={styles.summaryLines}>
        <View style={styles.summaryLine}>
          <Ionicons name="person-outline" size={14} color={colors.text.secondary} />
          <Text style={styles.summaryText}>{discipline.professor}</Text>
        </View>
        <View style={styles.summaryLine}>
          <Ionicons name="time-outline" size={14} color={colors.text.secondary} />
          <Text style={styles.summaryText}>{discipline.schedule}</Text>
        </View>
        <View style={styles.summaryLine}>
          <MaterialCommunityIcons
            name="office-building-outline"
            size={14}
            color={colors.text.secondary}
          />
          <Text style={styles.summaryText}>{discipline.room}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
