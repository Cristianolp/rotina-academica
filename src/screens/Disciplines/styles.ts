/** Estilos da tela Disciplinas. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  listHeader: {
    paddingTop: 8,
    marginBottom: 20,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.title - 4,
    marginBottom: 16,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
  },
  empty: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
    textAlign: "center",
    marginTop: 24,
  },

  separator: {
    height: 14,
  },

  // Caixa tracejada com o botão + (igual à tela de Atividades)
  addBox: {
    marginTop: 20,
    height: 96,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
