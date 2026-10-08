/**
 * Header — cabeçalho "Minha Rotina" do topo das telas.
 * Mostra o avatar à esquerda, ou a seta de voltar quando showBack = true.
 */
import { Avatar } from "@/components/Avatar";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

type HeaderProps = {
  showBack?: boolean;
};

export function Header({ showBack = false }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { profile } = useAppStore();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {showBack ? (
        <TouchableOpacity
          hitSlop={12}
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      ) : (
        <Avatar size={30} photo={profile.photo} />
      )}

      <Text style={[styles.title, showBack && styles.titleCentered]}>
        Minha Rotina
      </Text>

      <TouchableOpacity
        hitSlop={12}
        onPress={() => Alert.alert("Notificações", "Nenhuma notificação nova.")}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color={showBack ? colors.primary : colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
}
