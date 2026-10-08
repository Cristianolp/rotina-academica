/**
 * Tela "Nova Disciplina" — formulário para cadastrar uma disciplina.
 * Rota: /disciplines/new (aberta pelo botão + em Minhas Disciplinas).
 */
import { DisciplineForm } from "@/components/DisciplineForm";
import { Header } from "@/components/Header";
import { View } from "react-native";
import { styles } from "./styles";

export default function NewDiscipline() {
  return (
    <View style={styles.container}>
      <Header showBack />
      <DisciplineForm />
    </View>
  );
}
