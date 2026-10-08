/** Estilos do DisciplineForm. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },

  title: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.title - 4,
    marginBottom: 20,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    gap: 18,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },

  field: {
    gap: 6,
  },

  label: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.small,
  },

  input: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
  },

  // 3 ícones por linha
  icons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  iconOption: {
    width: "31%",
    flexGrow: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },

  iconOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.background.blue,
  },

  iconLabel: {
    color: colors.text.secondary,
    fontFamily: fontFamily.medium,
    fontSize: textSize.tiny,
  },

  iconLabelSelected: {
    color: colors.primary,
    fontFamily: fontFamily.semiBold,
  },

  saveButton: {
    marginTop: 6,
  },
});
