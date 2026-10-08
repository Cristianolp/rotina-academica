/**
 * Loading — indicador de carregamento (círculo girando) na cor do app.
 */
import { ActivityIndicator } from "react-native";
import { colors } from "../../styles/colors";

export function Loading() {
  return <ActivityIndicator size={75} color={colors.primary} />;
}
