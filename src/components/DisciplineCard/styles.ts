/** Estilos do DisciplineCard. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 16,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },

  name: {
    flex: 1,
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.dashboard.title,
  },

  professorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  professor: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
  },

  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.background.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
  },

  infoLabel: {
    color: colors.text.tertiary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.tiny,
  },

  infoValue: {
    color: colors.text.primary,
    fontFamily: fontFamily.medium,
    fontSize: textSize.small,
  },

  summaryLines: {
    gap: 6,
    marginTop: 12,
  },

  summaryLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  summaryText: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
  },
});
