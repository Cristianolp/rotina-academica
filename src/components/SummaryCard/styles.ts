/** Estilos do SummaryCard. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 24,
    paddingStart: 24,
    paddingEnd: 16,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },

  decoration: {
    position: "absolute",
    top: -40,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  textRow: {
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.label,
    marginTop: Platform.OS === "android" ? -3 : -1,
  },

  content: {
    paddingTop: 12,
  },

  titleContent: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.dashboard.title,
  },

  subtitleContent: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.dashboard.subtitle,
  },
});
