/** Estilos da tela Atividades. */
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
  },
  subtitle: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
    marginTop: 6,
  },
  filtersScroll: {
    marginTop: 20,
    marginHorizontal: -20,
  },
  filters: {
    gap: 8,
    paddingHorizontal: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text.secondary,
    fontFamily: fontFamily.medium,
    fontSize: textSize.small,
  },
  chipTextActive: {
    color: colors.white,
  },
  empty: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
    textAlign: "center",
    marginTop: 24,
  },
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

  separator: {
    height: 14,
  },
});
