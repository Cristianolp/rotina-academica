/**
 * Tela "Atividades e Prazos" — lista todas as atividades com filtro por status.
 * O botão + no fim da lista abre a Nova Atividade.
 */
import { ActivityCard } from "@/components/ActivityCard";
import { Header } from "@/components/Header";
import { sortByDueDate, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import type { Activity, ActivityStatus } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Filter = "todos" | ActivityStatus;

const filters: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "pendente", label: "Pendentes" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "concluida", label: "Concluídas" },
];

/** Ordena: não concluídas primeiro, depois pela data de entrega */
function sortActivities(a: Activity, b: Activity) {
  const aDone = a.status === "concluida";
  const bDone = b.status === "concluida";
  if (aDone !== bDone) return aDone ? 1 : -1;
  return sortByDueDate(a, b);
}

export default function Activities() {
  const { activities, disciplines } = useAppStore();
  const [filter, setFilter] = useState<Filter>("todos");

  const visible = activities
    .filter((activity) => filter === "todos" || activity.status === filter)
    .sort(sortActivities);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.title}>Atividades e Prazos</Text>
            <Text style={styles.subtitle}>
              Acompanhe suas entregas e mantenha sua rotina em dia.
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
              style={styles.filtersScroll}
            >
              {filters.map((item) => {
                const active = item.value === filter;
                return (
                  <TouchableOpacity
                    key={item.value}
                    activeOpacity={0.8}
                    onPress={() => setFilter(item.value)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma atividade por aqui.</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            discipline={disciplines.find((d) => d.id === item.disciplineId)}
          />
        )}
        ListFooterComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/activities/new")}
            style={styles.addBox}
            accessibilityLabel="Nova atividade"
          >
            <View style={styles.addButton}>
              <Ionicons name="add" size={26} color={colors.white} />
            </View>
          </TouchableOpacity>
        }
      />
    </View>
  );
}
