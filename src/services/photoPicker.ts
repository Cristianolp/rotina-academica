/**
 * Seleção de foto — abre a câmera ou a galeria (expo-image-picker),
 * já recortando em quadrado e comprimindo, e devolve a imagem em base64
 * pronta para enviar à API.
 */
import type { PhotoInput } from "@/services/api";
import * as ImagePicker from "expo-image-picker";

export type PhotoSource = "camera" | "library";

const OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.5,
  base64: true,
};

/**
 * Pede a permissão e abre a câmera ou a galeria.
 * Retorna null se o usuário cancelar; lança erro se negar a permissão.
 */
export async function pickPhoto(
  source: PhotoSource,
): Promise<PhotoInput | null> {
  const permission =
    source === "camera"
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error(
      source === "camera"
        ? "Permita o acesso à câmera nas configurações do celular."
        : "Permita o acesso às fotos nas configurações do celular.",
    );
  }

  const result =
    source === "camera"
      ? await ImagePicker.launchCameraAsync(OPTIONS)
      : await ImagePicker.launchImageLibraryAsync(OPTIONS);

  const asset = result.canceled ? null : result.assets[0];
  if (!asset?.base64) return null;

  return { base64: asset.base64, mimeType: asset.mimeType ?? "image/jpeg" };
}
