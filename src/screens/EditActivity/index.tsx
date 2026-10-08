/**
 * Tela "Editar Atividade" — mesmo formulário da Nova Atividade, já preenchido.
 * Rota: /edit/[id] (aberta pelo botão "Editar atividade" nos Detalhes).
 */
import { ActivityForm } from "@/components/ActivityForm";
import { Header } from "@/components/Header";
import { useAppStore } from "@/store/AppStore";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function EditActivity() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activities } = useAppStore();
  const activity = activities.find((item) => item.id === id);

  return (
    <View style={styles.container}>
      <Header showBack />
      {activity ? (
        <ActivityForm activity={activity} />
      ) : (
        <Text style={styles.notFound}>Atividade não encontrada.</Text>
      )}
    </View>
  );
}
