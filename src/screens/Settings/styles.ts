/** Estilos da tela Configurações. */
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/fontFamily";
import { textSize } from "@/styles/textSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.title - 4,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    gap: 18,
  },
  field: {
    gap: 6,
  },
  label: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.small,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text.primary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
  },
});
