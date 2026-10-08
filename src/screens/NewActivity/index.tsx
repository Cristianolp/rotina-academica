/**
 * Tela "Nova Atividade" — formulário para cadastrar uma atividade.
 * Rota: /activities/new (dentro da aba Atividades, com a barra de abas visível).
 */
import { ActivityForm } from "@/components/ActivityForm";
import { Header } from "@/components/Header";
import { View } from "react-native";
import { styles } from "./styles";

export default function NewActivity() {
  return (
    <View style={styles.container}>
      <Header showBack />
      <ActivityForm />
    </View>
  );
}
