/**
 * Avatar — foto redonda do estudante.
 * Mostra a foto de perfil vinda da API; sem foto, mostra um ícone de pessoa.
 * Usado no Header e no Perfil.
 */
import { fileUrl } from "@/services/api";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";
import { styles } from "./styles";

type AvatarProps = {
  /** Diâmetro em pixels */
  size?: number;
  /** Caminho da foto na API (profile.photo) */
  photo?: string | null;
};

export function Avatar({ size = 32, photo }: AvatarProps) {
  const shape = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View style={[styles.container, shape]}>
      {photo ? (
        <Image
          source={{ uri: fileUrl(photo) }}
          style={shape}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <Ionicons name="person" size={size * 0.62} color={colors.primary} />
      )}
    </View>
  );
}
