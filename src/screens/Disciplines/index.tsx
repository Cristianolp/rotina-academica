/**
 * Tela "Minhas Disciplinas" — lista as disciplinas ativas com busca
 * por nome, professor ou sala e mostra quantas pendências cada uma tem.
 * O botão + no fim da lista abre a Nova Disciplina.
 */
import { DisciplineCard } from "@/components/DisciplineCard";
import { Header } from "@/components/Header";
import { pendingCountFor, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

/** Deixa o texto minúsculo e sem acentos, para a busca */
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function Disciplines() {
  const { disciplines, activities } = useAppStore();
  const [search, setSearch] = useState("");

  const query = normalize(search.trim());
  const filtered = disciplines.filter(
    (discipline) =>
      discipline.active &&
      [discipline.name, discipline.professor, discipline.room].some((field) =>
        normalize(field).includes(query),
      ),
  );

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.title}>Minhas Disciplinas</Text>
            <View style={styles.search}>
              <Ionicons name="search" size={18} color={colors.text.secondary} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar disciplina, professor ou sala..."
                placeholderTextColor={colors.text.tertiary}
                style={styles.searchInput}
              />
              {search.length > 0 && (
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={colors.text.tertiary}
                  onPress={() => setSearch("")}
                />
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma disciplina encontrada.</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <DisciplineCard
            discipline={item}
            pendingCount={pendingCountFor(activities, item.id)}
          />
        )}
        ListFooterComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/disciplines/new")}
            style={styles.addBox}
            accessibilityLabel="Nova disciplina"
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
