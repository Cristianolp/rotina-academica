/** Estilos da StatusScreen. */
import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
    backgroundColor: colors.background.primary,
  },

  // Sem fontFamily: as fontes podem ainda não ter carregado
  message: {
    textAlign: "center",
    color: colors.text.secondary,
  },

  button: {
    width: 220,
  },
});
