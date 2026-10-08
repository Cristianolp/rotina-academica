/**
 * Pilha de telas da aba Atividades: lista (index) e Nova Atividade (new).
 * Fica dentro das abas para a barra de abas continuar visível.
 */
import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function ActivitiesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="new" />
    </Stack>
  );
}
