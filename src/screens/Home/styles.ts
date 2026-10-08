/** Estilos da tela Início. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    flex: 1,
  },

  content: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  titleContent: {
    marginBottom: 24,
  },

  title: {
    color: colors.text.primary,
    fontSize: textSize.title,
    fontFamily: fontFamily.semiBold,
  },

  subtitle: {
    color: colors.text.secondary,
    fontSize: textSize.body,
    fontFamily: fontFamily.regular,
  },

  cardContent: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 12,
  },

  card: {
    flex: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 12,
  },

  sectionTitle: {
    color: colors.text.primary,
    fontSize: textSize.dashboard.title,
    fontFamily: fontFamily.semiBold,
  },

  sectionLink: {
    color: colors.primary,
    fontSize: textSize.small,
    fontFamily: fontFamily.semiBold,
  },

  list: {
    gap: 12,
  },

  empty: {
    color: colors.text.secondary,
    fontSize: textSize.body,
    fontFamily: fontFamily.regular,
    textAlign: "center",
    paddingVertical: 16,
  },

  iconBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
