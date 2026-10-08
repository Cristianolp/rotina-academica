/** Estilos do ActivityCard. */
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
  upcoming: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  date: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.dashboard.title,
    marginBottom: 4,
  },
  description: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
    lineHeight: 17,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
  discipline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  disciplineText: {
    flexShrink: 1,
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
  },
  link: {
    color: colors.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.small,
  },
});
