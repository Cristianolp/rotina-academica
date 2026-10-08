/** Estilos da tela Detalhes da Disciplina. */
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

  backButton: {
    width: 200,
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

  // Mesmo tamanho do botão voltar, para o título ficar centralizado
  headerSpacer: {
    width: 22,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },

  titleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.background.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.label,
    lineHeight: 28,
  },

  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 20,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },

  infoDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },

  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
  },

  infoLabel: {
    color: colors.text.tertiary,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },

  infoValue: {
    color: colors.text.primary,
    fontFamily: fontFamily.medium,
    fontSize: textSize.body,
  },

  stats: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },

  statValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.label,
  },

  statLabel: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
  },

  sectionTitle: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.dashboard.title,
    marginTop: 28,
    marginBottom: 12,
  },

  list: {
    gap: 14,
  },

  empty: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
    textAlign: "center",
    paddingVertical: 16,
  },
});
