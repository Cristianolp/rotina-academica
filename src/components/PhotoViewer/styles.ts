/** Estilos do PhotoViewer. */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  // A foto de perfil é quadrada: ocupa a largura toda, até 600px
  photoBox: {
    width: "100%",
    maxWidth: 600,
    aspectRatio: 1,
  },

  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  closeButton: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
});
