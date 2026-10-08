/**
 * PhotoViewer — mostra uma foto em tela cheia, com fundo escuro.
 * Fecha pelo botão X, tocando em qualquer lugar da tela ou com o botão voltar do Android.
 * Usado para ver a foto de perfil.
 */
import { fileUrl } from "@/services/api";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type PhotoViewerProps = {
  /** Caminho da foto na API (profile.photo); sem foto o visualizador não abre */
  photo?: string | null;
  visible: boolean;
  onClose: () => void;
};

export function PhotoViewer({ photo, visible, onClose }: PhotoViewerProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible && !!photo}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        {photo && (
          <View style={styles.photoBox}>
            <Image
              source={{ uri: fileUrl(photo) }}
              style={styles.photo}
              contentFit="contain"
              transition={200}
            />
          </View>
        )}
      </Pressable>

      <TouchableOpacity
        onPress={onClose}
        hitSlop={12}
        accessibilityLabel="Fechar foto"
        style={[styles.closeButton, { top: insets.top + 12 }]}
      >
        <Ionicons name="close" size={26} color={colors.white} />
      </TouchableOpacity>
    </Modal>
  );
}
