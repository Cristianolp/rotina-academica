/** Estilos da tela Perfil. */
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
    paddingBottom: 32,
  },
  profile: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 24,
  },
  avatarRing: {
    padding: 4,
    borderRadius: 60,
    backgroundColor: colors.white,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
  },
  // Camada escura sobre a foto enquanto ela é enviada
  avatarLoading: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraBadge: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.label,
    marginTop: 16,
  },
  course: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.body,
    marginTop: 2,
  },
  semester: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.background.blue,
  },
  semesterText: {
    color: colors.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.small,
  },
  settingsButton: {
    width: "auto",
    paddingHorizontal: 32,
    height: 42,
    marginTop: 20,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
  },
  disciplinesCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  disciplinesIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    color: colors.text.tertiary,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  cardValue: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.label,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  statIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  statValue: {
    color: colors.text.primary,
    fontFamily: fontFamily.semiBold,
    fontSize: textSize.label,
  },
  statLabel: {
    color: colors.text.secondary,
    fontFamily: fontFamily.regular,
    fontSize: textSize.small,
    marginTop: 2,
  },

  cardInfo: {
    flex: 1,
  },
});
