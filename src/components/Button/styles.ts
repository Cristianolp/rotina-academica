/** Estilos do Button. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  text: {
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.subtitle,
  },

  uppercase: {
    fontSize: textSize.small,
    letterSpacing: 0.6,
  },
});
