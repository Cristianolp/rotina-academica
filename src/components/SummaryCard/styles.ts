import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  textRow: {
    color: colors.orange,
    fontFamily: fontFamily.semibold,
    fontSize: textSize.Label,
    marginTop: Platform.OS === "android" ? -3 : -1,
  },

  content: {
    paddingTop: 12,
  },

  titleContent: {
    color: colors.text.primary,
    fontFamily: fontFamily.semibold,
    fontSize: textSize.dashboard.title,
  },

  subtitle: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.dashboard.subtitle,
  },
});
