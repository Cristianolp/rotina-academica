import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    flex: 1,
  },

  content: {
    paddingTop: Platform.OS === "android" ? 54 : 64,
    paddingStart: 24,
  },

  titleContent: {
    paddingTop: 28,
  },

  label: {
    fontSize: textSize.Label,
    fontFamily: fontFamily.semibold,
    color: colors.primary,
  },

  title: {
    fontSize: textSize.title,
    fontFamily: fontFamily.semibold,
    color: colors.text.primary,
  },

  subtitle: {
    fontSize: textSize.subtitle,
    fontFamily: fontFamily.regular,
    color: colors.text.secondary,
  },
});
