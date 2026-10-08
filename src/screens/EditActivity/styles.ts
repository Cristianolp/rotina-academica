/** Estilos da tela Editar Atividade. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  notFound: {
    marginTop: 32,
    textAlign: "center",
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
  },
});
