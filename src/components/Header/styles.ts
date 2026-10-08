/** Estilos do Header. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.background.primary,
  },
  title: {
    flex: 1,
    color: colors.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
  },
  titleCentered: {
    textAlign: "center",
  },
});
