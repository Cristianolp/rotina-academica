/**
 * Tela "Detalhes da Disciplina" — professor, horário e sala da disciplina,
 * quantas atividades estão pendentes e concluídas, e a lista das atividades dela.
 * Rota: /disciplines/[id] (aberta ao tocar num card de disciplina).
 */
import { ActivityCard } from "@/components/ActivityCard";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { disciplineIcons } from "@/components/DisciplineCard";
import { isPending, sortByDueDate, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import type { Activity } from "@/types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

/** Volta para a tela anterior (ou para a lista, se abriu direto) */
function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace("/discipline");
}

/** Ordena: não concluídas primeiro, depois pela data de entrega */
function sortActivities(a: Activity, b: Activity) {
  if (isPending(a) !== isPending(b)) return isPending(a) ? -1 : 1;
  return sortByDueDate(a, b);
}

export default function DisciplineDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { disciplines, activities } = useAppStore();

  const discipline = disciplines.find((item) => item.id === id);

  if (!discipline) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.empty}>Disciplina não encontrada.</Text>
        <Button text="Voltar" color={colors.primary} onPress={goBack} style={styles.backButton} />
      </View>
    );
  }

  const own = activities
    .filter((activity) => activity.disciplineId === discipline.id)
    .sort(sortActivities);
  const pendingCount = own.filter(isPending).length;
  const doneCount = own.length - pendingCount;

  const info = [
    { key: "professor", label: "PROFESSOR", value: discipline.professor, icon: "person-outline" as const },
    { key: "schedule", label: "HORÁRIO", value: discipline.schedule, icon: "time-outline" as const },
    { key: "room", label: "SALA", value: discipline.room, icon: "business-outline" as const },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity hitSlop={12} onPress={goBack} accessibilityLabel="Voltar">
          <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Disciplina</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleIcon}>
            <MaterialCommunityIcons
              name={disciplineIcons[discipline.icon]}
              size={24}
              color={colors.primary}
            />
          </View>
          <Text style={styles.title}>{discipline.name}</Text>
        </View>

        {pendingCount === 0 ? (
          <Badge text="Em dia" color={colors.green} backgroundColor={colors.background.green} />
        ) : (
          <Badge
            text={`${pendingCount} ${pendingCount === 1 ? "Pendente" : "Pendentes"}`}
            color={colors.red}
            backgroundColor={colors.background.red}
          />
        )}

        <View style={styles.infoCard}>
          {info.map((item, index) => (
            <View key={item.key} style={[styles.infoRow, index > 0 && styles.infoDivider]}>
              <View style={styles.infoIcon}>
                <Ionicons name={item.icon} size={16} color={colors.primary} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.red }]}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.green }]}>{doneCount}</Text>
            <Text style={styles.statLabel}>Concluídas</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Atividades</Text>
        <View style={styles.list}>
          {own.length === 0 ? (
            <Text style={styles.empty}>Nenhuma atividade cadastrada nesta disciplina.</Text>
          ) : (
            own.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} discipline={discipline} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
