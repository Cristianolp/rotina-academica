/** Estilos do ActivityForm. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  inputInner: {
    flex: 1,
    height: 44,
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
  },

  inputText: {
    flex: 1,
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
  },

  placeholder: {
    color: colors.text.tertiary,
  },

  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },

  priorities: {
    flexDirection: "row",
    gap: 8,
  },

  priority: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  prioritySelected: {
    borderColor: colors.orange,
    backgroundColor: colors.background.orange,
  },

  priorityText: {
    color: colors.text.secondary,
    fontFamily: fontFamily.medium,
    fontSize: textSize.small,
  },

  priorityTextSelected: {
    color: colors.orange,
    fontFamily: fontFamily.semiBold,
  },

  saveButton: {
    marginTop: 6,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 24,
  },

  sheet: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 8,
  },

  sheetTitle: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.dashboard.title,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },

  optionText: {
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
  },

  keyboard: {
    flex: 1,
  },
});
