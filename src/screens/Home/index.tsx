/**
 * Tela Início (Dashboard) — resumo da semana: pendências, provas,
 * disciplinas ativas, próximas atividades e disciplinas do semestre.
 */
import { UpcomingActivityCard } from "@/components/ActivityCard";
import { DisciplineSummaryCard } from "@/components/DisciplineCard";
import { Header } from "@/components/Header";
import { SummaryCard } from "@/components/SummaryCard";
import { styles } from "./styles";
import {
  isPending,
  pendingThisWeek,
  sortByDueDate,
  useAppStore,
} from "@/store/AppStore";
import { colors } from "@/styles/colors";
import { daysFromToday } from "@/utils/date";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const EXAM_PATTERN = /prova|exame|avalia/i;

export default function Home() {
  const { activities, disciplines } = useAppStore();

  const pending = activities.filter(isPending).sort(sortByDueDate);
  const upcoming = pending.filter((activity) => daysFromToday(activity.dueDate) >= 0);
  const exams = upcoming.filter(
    (activity) =>
      EXAM_PATTERN.test(activity.title) && daysFromToday(activity.dueDate) <= 15,
  );
  const activeDisciplines = disciplines.filter((discipline) => discipline.active);
  const disciplineById = (id: string) => disciplines.find((d) => d.id === id);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleContent}>
          <Text style={styles.title}>Olá, estudante!</Text>
          <Text style={styles.subtitle}>Organize sua rotina acadêmica</Text>
        </View>

        <SummaryCard
          total={pendingThisWeek(activities).length}
          title="Pendências"
          subtitle="Para esta semana"
          textColor={colors.orange}
          decorationColor={colors.background.orange}
          onPress={() => router.navigate("/activities")}
          icon={
            <View style={[styles.iconBox, { backgroundColor: colors.orange }]}>
              <MaterialCommunityIcons name="exclamation" size={16} color={colors.white} />
            </View>
          }
        />

        <View style={styles.cardContent}>
          <View style={styles.card}>
            <SummaryCard
              total={exams.length}
              title="Provas"
              subtitle="Próximos 15 dias"
              textColor={colors.red}
              onPress={() => router.navigate("/activities")}
              icon={
                <View style={[styles.iconBox, { backgroundColor: colors.red }]}>
                  <FontAwesome6 name="clipboard-question" size={12} color={colors.white} />
                </View>
              }
            />
          </View>
          <View style={styles.card}>
            <SummaryCard
              total={activeDisciplines.length}
              title="Disciplinas"
              subtitle="Ativas no semestre"
              textColor={colors.primary}
              onPress={() => router.navigate("/discipline")}
              icon={
                <FontAwesome6 name="graduation-cap" size={20} color={colors.primary} />
              }
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximas atividades</Text>
          <TouchableOpacity hitSlop={8} onPress={() => router.navigate("/activities")}>
            <Text style={styles.sectionLink}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {upcoming.length === 0 ? (
            <Text style={styles.empty}>Nenhuma atividade pendente 🎉</Text>
          ) : (
            upcoming
              .slice(0, 2)
              .map((activity) => (
                <UpcomingActivityCard
                  key={activity.id}
                  activity={activity}
                  discipline={disciplineById(activity.disciplineId)}
                />
              ))
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Disciplinas do semestre</Text>
        </View>
        <View style={styles.list}>
          {activeDisciplines.map((discipline) => (
            <DisciplineSummaryCard key={discipline.id} discipline={discipline} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
