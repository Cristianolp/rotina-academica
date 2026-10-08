/**
 * Tela "Perfil do Estudante" — dados do estudante, foto de perfil
 * (tocar na foto para ver, tirar, escolher ou remover) e estatísticas
 * (disciplinas ativas, atividades concluídas e pendências).
 */
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { PhotoViewer } from "@/components/PhotoViewer";
import { pickPhoto, type PhotoSource } from "@/services/photoPicker";
import { errorMessage, isPending, useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

export default function Profile() {
  const {
    profile,
    disciplines,
    activities,
    updateProfilePhoto,
    removeProfilePhoto,
  } = useAppStore();
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [viewingPhoto, setViewingPhoto] = useState(false);

  const activeCount = disciplines.filter((discipline) => discipline.active).length;
  const doneCount = activities.filter((activity) => !isPending(activity)).length;
  const pendingCount = activities.length - doneCount;

  /** Abre a câmera/galeria e envia a foto escolhida para a API */
  async function changePhoto(source: PhotoSource) {
    try {
      const photo = await pickPhoto(source);
      if (!photo) return;
      setSavingPhoto(true);
      await updateProfilePhoto(photo);
    } catch (error) {
      Alert.alert("Foto de perfil", errorMessage(error));
    } finally {
      setSavingPhoto(false);
    }
  }

  /** Remove a foto de perfil na API */
  async function removePhoto() {
    try {
      setSavingPhoto(true);
      await removeProfilePhoto();
    } catch (error) {
      Alert.alert("Foto de perfil", errorMessage(error));
    } finally {
      setSavingPhoto(false);
    }
  }

  /** Menu ao tocar na foto: ver, tirar, escolher ou remover */
  function openPhotoMenu() {
    Alert.alert("Foto de perfil", undefined, [
      ...(profile.photo
        ? [{ text: "Ver foto", onPress: () => setViewingPhoto(true) }]
        : []),
      { text: "Tirar foto", onPress: () => changePhoto("camera") },
      { text: "Escolher da galeria", onPress: () => changePhoto("library") },
      ...(profile.photo
        ? [{ text: "Remover foto", style: "destructive" as const, onPress: removePhoto }]
        : []),
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openPhotoMenu}
            disabled={savingPhoto}
            accessibilityLabel="Alterar foto de perfil"
          >
            <View style={styles.avatarRing}>
              <Avatar size={104} photo={profile.photo} />
              {savingPhoto && (
                <View style={styles.avatarLoading}>
                  <ActivityIndicator color={colors.white} />
                </View>
              )}
            </View>
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color={colors.white} />
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.course}>{profile.course}</Text>
          <View style={styles.semester}>
            <MaterialCommunityIcons name="school-outline" size={14} color={colors.primary} />
            <Text style={styles.semesterText}>{profile.semester}</Text>
          </View>

          <Button
            text="Configurações"
            color={colors.primary}
            onPress={() => router.push("/settings")}
            icon={<Ionicons name="settings-sharp" size={16} color={colors.white} />}
            style={styles.settingsButton}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/discipline")}
          style={[styles.card, styles.disciplinesCard]}
        >
          <View style={styles.disciplinesIcon}>
            <MaterialCommunityIcons name="book-open-variant" size={20} color={colors.white} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardLabel}>DISCIPLINAS ATIVAS</Text>
            <Text style={styles.cardValue}>{activeCount}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
        </TouchableOpacity>

        <View style={styles.stats}>
          <View style={styles.card}>
            <View style={[styles.statIcon, { backgroundColor: colors.background.green }]}>
              <Ionicons name="checkmark-circle-outline" size={18} color={colors.green} />
            </View>
            <Text style={styles.statValue}>{doneCount}</Text>
            <Text style={styles.statLabel}>Atividades{"\n"}Concluídas</Text>
          </View>
          <View style={styles.card}>
            <View style={[styles.statIcon, { backgroundColor: colors.background.red }]}>
              <Ionicons name="alert-circle" size={18} color={colors.red} />
            </View>
            <Text style={[styles.statValue, { color: colors.red }]}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pendências{"\n"}Atuais</Text>
          </View>
        </View>
      </ScrollView>

      <PhotoViewer
        photo={profile.photo}
        visible={viewingPhoto}
        onClose={() => setViewingPhoto(false)}
      />
    </View>
  );
}
