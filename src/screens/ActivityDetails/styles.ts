/** Estilos da tela Detalhes da Atividade. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.dashboard.title,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  badges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.label,
    lineHeight: 28,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    gap: 6,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },
  infoLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoLabel: {
    color: colors.text.tertiary,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  infoValue: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.body,
  },
  tip: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.info,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  tipTitle: {
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.body,
    marginBottom: 4,
  },
  tipText: {
    color: colors.white,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
    lineHeight: 17,
    opacity: 0.9,
  },
  descriptionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },
  descriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  descriptionTitle: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.dashboard.title,
  },
  description: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
    lineHeight: 21,
  },
  footer: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },

  backButton: {
    width: 200,
  },

  tipContent: {
    flex: 1,
  },
});
