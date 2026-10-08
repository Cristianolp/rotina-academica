import { ActivityIndicator } from "react-native";
import { colors } from "../../styles/colors";

export function Loading() {
  return <ActivityIndicator size={75} color={colors.primary} />;
}
